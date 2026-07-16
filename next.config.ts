import type { NextConfig } from "next";

const mobileDevOrigin = process.env.TIGON_MOBILE_DEV_ORIGIN?.trim();

const nextConfig: NextConfig = {
  ...(mobileDevOrigin
    ? {
        allowedDevOrigins: [mobileDevOrigin],
      }
    : {}),
};

export default nextConfig;
