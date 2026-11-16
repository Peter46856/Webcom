const notes: Record<string, { decisions: [string, string][]; validation: string[] }> = {
  ecoroute: {
    decisions: [
      [
        'A graph is only as useful as its weights',
        'Route selection should make the optimization objective explicit. Distance, current traffic, and topographical cost are separate inputs, and missing observations need a defined fallback.',
      ],
      [
        'A map is a decision interface',
        'Alternative routes need enough context for users to understand the choice. The visual layer should not imply an accuracy or environmental benefit that the input data cannot substantiate.',
      ],
      [
        'Observations need provenance',
        'Crowdsourced traffic needs validation and freshness rules before it influences routing. Persistent graph data and changing observations have different update patterns.',
      ],
    ],
    validation: [
      'Check disconnected origins and destinations, invalid coordinates, and no-route outcomes.',
      'Test routing with missing or stale traffic observations.',
      'Define a baseline and evaluation workload before claiming travel or environmental improvements.',
    ],
  },
  'fleet-command': {
    decisions: [
      [
        'Durable history and live delivery serve different needs',
        'A location stream helps the interface update promptly; persistent records support route history and investigation. Reconnect behavior must bridge the gap between a snapshot and new events.',
      ],
      [
        'Arrival time is not observation time',
        'A device can report late. The system should preserve useful historical events without moving a live marker backward because an older event arrived last.',
      ],
      [
        'Dispatch is a state machine',
        'Assignment, acceptance, cancellation, and completion should have explicit permissions and transition rules. Operator overrides need to preserve the context of a change.',
      ],
    ],
    validation: [
      'Exercise duplicate, delayed, and out-of-order position events.',
      'Test reconnection and stale-data presentation.',
      'Review dispatch permissions and simultaneous assignment changes.',
    ],
  },
  'isp-billing': {
    decisions: [
      [
        'Payment confirmation and network activation are different facts',
        'An accepted payment can coexist with a failed router connection. A recoverable provisioning workflow preserves the payment while making the access state clear.',
      ],
      [
        'Retries must converge on the intended entitlement',
        'Duplicate callbacks and repeated jobs should not create extra access. Stable transaction identifiers and recorded provisioning intent make reconciliation possible.',
      ],
      [
        'Management access is a separate trust boundary',
        'Router control, subscriber administration, and public billing initiation need different access levels. Credentials belong behind a controlled server interface.',
      ],
    ],
    validation: [
      'Verify duplicate callbacks cannot duplicate subscriber entitlement.',
      'Test provider rejection, delayed confirmation, and unavailable network gateways.',
      'Reconcile intended and actual access after a timeout before repeating changes.',
    ],
  },
};
export function CaseDepth({ slug }: { slug: string }) {
  const detail = notes[slug];
  if (!detail) return null;
  return (
    <>
      <section className="section-bottom">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Architecture considerations</span>
            <h2>The decisions that deserve attention.</h2>
          </div>
        </div>
        <p className="content-note">
          The following explains design considerations for this system. It is not a claim that each
          control has been independently verified in production.
        </p>
        <div className="case-decision-list">
          {detail.decisions.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="detail-columns section-bottom">
        <div>
          <h2>What to validate</h2>
          <ul className="check-list">
            {detail.validation.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        </div>
        <aside className="detail-panel">
          <h3>Evidence and project context</h3>
          <p>
            This architecture story is based on the supplied project description. Client
            attribution, delivery dates, team composition, production screenshots, and measured
            outcomes have not been supplied for publication.
          </p>
          <p>
            We can discuss the relevant architecture and scope a similar challenge without
            presenting unverified performance figures.
          </p>
        </aside>
      </section>
    </>
  );
}
