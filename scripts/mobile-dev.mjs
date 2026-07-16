import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import net from "node:net";
import os from "node:os";

const require = createRequire(import.meta.url);
const qrcode = require("qrcode-terminal");
const nextBin = require.resolve("next/dist/bin/next");

const START_PORT = 3000;
const MAX_PORT = 65_535;
const VIRTUAL_INTERFACE_PATTERN =
  /^(?:awdl|bridge|docker|gif|llw|lo|stf|tailscale|utun|vboxnet|vmnet|zt)/i;

function isPrivateIPv4(address) {
  const [first, second] = address.split(".").map(Number);

  return (
    first === 10 ||
    (first === 172 && second >= 16 && second <= 31) ||
    (first === 192 && second === 168)
  );
}

function getLocalIPv4() {
  const candidates = [];

  for (const [name, addresses = []] of Object.entries(
    os.networkInterfaces(),
  )) {
    for (const address of addresses) {
      const isIPv4 = address.family === "IPv4" || address.family === 4;

      if (
        !isIPv4 ||
        address.internal ||
        address.address.startsWith("169.254.")
      ) {
        continue;
      }

      let score = 0;

      if (isPrivateIPv4(address.address)) score += 100;
      if (/^en\d+$/i.test(name)) score += 50;
      if (name.toLowerCase() === "en0") score += 10;
      if (VIRTUAL_INTERFACE_PATTERN.test(name)) score -= 1_000;

      candidates.push({ address: address.address, name, score });
    }
  }

  candidates.sort(
    (a, b) => b.score - a.score || a.name.localeCompare(b.name),
  );

  const selected = candidates[0];

  if (!selected || selected.score < 0) {
    throw new Error(
      "Fant ingen aktiv lokal IPv4-adresse. Koble Mac-en til Wi-Fi eller LAN og prøv igjen.",
    );
  }

  return selected;
}

function checkPort(port) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.unref();
    server.once("error", (error) => {
      if (error.code === "EADDRINUSE" || error.code === "EACCES") {
        resolve(false);
        return;
      }

      reject(error);
    });
    server.listen({ host: "0.0.0.0", port, exclusive: true }, () => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(true);
      });
    });
  });
}

async function findAvailablePort(startPort) {
  for (let port = startPort; port <= MAX_PORT; port += 1) {
    if (await checkPort(port)) return port;
  }

  throw new Error(`Fant ingen ledig port fra ${startPort} til ${MAX_PORT}.`);
}

function createQrCode(value) {
  return new Promise((resolve) => {
    qrcode.generate(value, { small: true }, resolve);
  });
}

function killProcessTree(child, signal) {
  if (!child.pid) return;

  try {
    if (process.platform === "win32") {
      child.kill(signal);
    } else {
      process.kill(-child.pid, signal);
    }
  } catch (error) {
    if (error.code !== "ESRCH") throw error;
  }
}

async function main() {
  const network = getLocalIPv4();
  const port = await findAvailablePort(START_PORT);
  const desktopUrl = `http://localhost:${port}`;
  const networkUrl = `http://${network.address}:${port}`;
  const qrCode = await createQrCode(networkUrl);

  console.log("\nMobile preview");
  console.log(`Desktop URL:       ${desktopUrl}`);
  console.log(`Mobile/network URL: ${networkUrl} (${network.name})`);
  console.log("\nScan with your phone:\n");
  console.log(qrCode);

  const child = spawn(
    process.execPath,
    [nextBin, "dev", "--hostname", "0.0.0.0", "--port", String(port)],
    {
      detached: process.platform !== "win32",
      env: {
        ...process.env,
        TIGON_MOBILE_DEV_ORIGIN: network.address,
      },
      stdio: "inherit",
    },
  );

  let shuttingDown = false;
  let requestedSignal;
  let forceKillTimer;

  const signalExitCodes = {
    SIGHUP: 129,
    SIGINT: 130,
    SIGTERM: 143,
  };

  const signalHandlers = new Map(
    ["SIGHUP", "SIGINT", "SIGTERM"].map((signal) => [
      signal,
      () => {
        if (shuttingDown) {
          killProcessTree(child, "SIGKILL");
          return;
        }

        shuttingDown = true;
        requestedSignal = signal;
        console.log("\nAvslutter Next.js...");
        killProcessTree(child, signal);

        forceKillTimer = setTimeout(() => {
          killProcessTree(child, "SIGKILL");
        }, 5_000);
        forceKillTimer.unref();
      },
    ]),
  );

  for (const [signal, handler] of signalHandlers) {
    process.on(signal, handler);
  }

  child.once("error", (error) => {
    console.error(`Kunne ikke starte Next.js: ${error.message}`);
    process.exitCode = 1;
  });

  child.once("exit", (code, signal) => {
    clearTimeout(forceKillTimer);

    for (const [registeredSignal, handler] of signalHandlers) {
      process.off(registeredSignal, handler);
    }

    if (requestedSignal) {
      process.exitCode = signalExitCodes[requestedSignal] ?? 1;
      return;
    }

    if (signal) {
      console.error(`Next.js ble avsluttet av ${signal}.`);
      process.exitCode = 1;
      return;
    }

    process.exitCode = code ?? 1;
  });
}

main().catch((error) => {
  console.error(`Mobile preview feilet: ${error.message}`);
  process.exitCode = 1;
});
