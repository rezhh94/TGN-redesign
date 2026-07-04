const lines = [
  { id: "out", muted: true, words: ["Ferdig", "bygget"] },
  { id: "in", muted: false, words: ["er", "ikke", "ferdig."] },
];

/* 02→03 / Overlevering — MWG 015 architecture: every word exists twice
   inside a clipped mask; as the statement crosses the viewport the visible
   copy rolls down and out while the duplicate rolls in from above, against
   the scroll direction. No pin — the bridge is a flowing moment between the
   pinned 02 stack and 03. The duplicates are baked into the SSR markup
   (aria-hidden); without JS only the visible copies show, statically. */
export function EffectBridge() {
  return (
    <section className="effect-bridge" aria-labelledby="effect-bridge-title">
      <div className="effect-bridge__inner">
        <p className="effect-bridge__label">02 → 03 / Overlevering</p>

        <h2 className="effect-bridge__statement" id="effect-bridge-title">
          {lines.map((line) => (
            <span
              key={line.id}
              className={
                "effect-bridge__line" + (line.muted ? " effect-bridge__line--muted" : "")
              }
            >
              {line.words.map((word) => (
                <span className="effect-bridge__word" data-bridge-word key={word}>
                  <span
                    className="effect-bridge__copy effect-bridge__copy--hidden"
                    aria-hidden="true"
                  >
                    {word}
                  </span>
                  <span className="effect-bridge__copy">{word}</span>
                </span>
              ))}
            </span>
          ))}
        </h2>

        <p className="effect-bridge__support">Etter lansering begynner målingen.</p>
      </div>
    </section>
  );
}
