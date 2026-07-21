const tensionBeats = [
  "Lansert er bare starten.",
  "Synlighet må bli til forståelse.",
  "Forståelse må bli til handling.",
] as const;

export function OutcomeTensionBridge() {
  return (
    <section
      className="outcome-tension"
      aria-label="Overgang fra tjenester til effekt"
      data-outcome-tension
      data-theme-section="dark"
      data-bg-section="dark"
    >
      <div className="outcome-tension__stage" data-outcome-tension-stage>
        <p className="outcome-tension__index">02 → 03 / Fra leveranse til effekt</p>
        <ol className="outcome-tension__titles">
          {tensionBeats.map((beat) => (
            <li data-outcome-tension-title key={beat}>
              <p>{beat}</p>
            </li>
          ))}
        </ol>
        <p className="outcome-tension__next">Neste / Effekt som kan måles</p>
      </div>
    </section>
  );
}
