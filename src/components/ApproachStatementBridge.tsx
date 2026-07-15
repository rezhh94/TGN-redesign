export function ApproachStatementBridge() {
  return (
    <section
      className="approach-bridge"
      aria-labelledby="approach-bridge-title"
      data-intro-story
      data-theme-section="dark"
      data-bg-section="dark"
    >
      <div className="approach-intro" data-intro-identity>
        <p className="approach-intro__label">01 / Tilnærming</p>
        {/* Fire autor-linjer, server-rendret og lesbare uten JS. Maskene lages
            klientside av Osmo Masked Text Reveal (SplitText, mask: "lines"). */}
        <h2 className="approach-intro__statement" id="approach-bridge-title">
          <span className="approach-intro__line approach-intro__line--quiet" data-intro-line>
            Hver for seg
          </span>
          <span className="approach-intro__line approach-intro__line--quiet" data-intro-line>
            blir det lansert.
          </span>
          <span className="approach-intro__line" data-intro-line>
            Bygd sammen
          </span>
          <span className="approach-intro__line" data-intro-line>
            blir det valgt.
          </span>
        </h2>
        <div className="approach-intro__support">
          <p>
            Design uten synlighet blir ikke funnet. Synlighet uten substans blir
            ikke valgt. Derfor utvikler Tigon design, teknologi og synlighet som
            én løsning — fra første beslutning.
          </p>
          <span>TGN / integrated practice</span>
        </div>
        {/* Replikk til neste seksjon: 02 svarer med «Dette bygger vi.» */}
        <p className="approach-intro__handoff" data-intro-handoff>
          01 → 02 / Én helhet. Fem fag.
        </p>
      </div>
    </section>
  );
}
