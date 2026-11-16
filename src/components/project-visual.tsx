import { Radio, MapPin, Wifi, Activity, Check, ArrowUpRight } from 'lucide-react';
export function ProjectVisual({ type, large = false }: { type: string; large?: boolean }) {
  if (!['ecoroute', 'fleet-command', 'isp-billing'].includes(type))
    return (
      <div className={`project-visual ${large ? 'large' : ''}`}>
        <div className="generic-project-visual">
          <Activity size={48} />
          <strong>System architecture</strong>
          <span>Application � Services � Data</span>
        </div>
      </div>
    );
  return (
    <div
      className={`project-visual ${type} ${large ? 'large' : ''}`}
      aria-label={`${type === 'ecoroute' ? 'EcoRoute route planning' : type === 'fleet-command' ? 'Fleet dispatch' : 'ISP subscriber billing'} conceptual interface illustration`}
      role="img"
    >
      {type === 'ecoroute' ? (
        <>
          <div className="route-terrain" />
          <svg viewBox="0 0 500 230" className="route-svg" fill="none" aria-hidden="true">
            <path
              d="M0 150 90 100 160 170 250 90 330 120 420 40 500 70M0 50 100 160 210 40 320 200 410 100 500 170M50 0 100 230M210 0 260 230M390 0 350 230"
              stroke="#244137"
              strokeWidth="16"
            />
            <path
              d="M80 172 150 172 205 104 290 104 340 57 415 57"
              stroke="#61e2ad"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              d="M80 172 143 120 250 153 330 90 415 57"
              stroke="#527b70"
              strokeWidth="2"
              strokeDasharray="4 5"
            />
            <circle cx="80" cy="172" r="7" fill="#61e2ad" />
            <circle cx="415" cy="57" r="8" fill="#112c22" stroke="#61e2ad" strokeWidth="3" />
          </svg>
          <div className="mini-window route-window">
            <span>
              <MapPin size={13} />
              EcoRoute
            </span>
            <strong>A smarter way through.</strong>
            <small>
              <i />
              Terrain-aware routing
            </small>
          </div>
          <div className="visual-label">Geospatial routing / Concept view</div>
        </>
      ) : type === 'fleet-command' ? (
        <>
          <div className="fleet-grid" />
          <div className="mini-window fleet-window">
            <span>
              <Radio size={13} />
              Fleet Command <i />
            </span>
            <div className="mini-dashboard">
              <div>
                <small>Operations overview</small>
                <strong>Dispatch control</strong>
              </div>
              <svg viewBox="0 0 240 60" aria-hidden="true">
                <path
                  d="M0 50 20 35 42 42 62 15 85 28 110 12 135 31 158 17 182 26 210 7 240 18"
                  fill="none"
                  stroke="#4facfe"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="fleet-row">
              <span>
                <i />
                Vehicle location
              </span>
              <small>Receiving events</small>
            </div>
            <div className="fleet-row">
              <span>
                <i />
                Dispatch workflow
              </span>
              <small>Ready</small>
            </div>
          </div>
          <div className="map-pin pin-one">
            <MapPin size={18} />
          </div>
          <div className="map-pin pin-two">
            <MapPin size={18} />
          </div>
          <div className="visual-label">Fleet operations / Concept view</div>
        </>
      ) : (
        <>
          <div className="network-rings" />
          <div className="mini-window isp-window">
            <span>
              <Wifi size={14} />
              Subscriber gateway <Activity size={13} />
            </span>
            <div className="billing-event">
              <span className="event-icon">
                <Check size={16} />
              </span>
              <div>
                <strong>Payment confirmed</strong>
                <small>M-Pesa callback received</small>
              </div>
              <ArrowUpRight size={15} />
            </div>
            <div className="billing-connector" />
            <div className="billing-event">
              <span className="event-icon purple">
                <Wifi size={16} />
              </span>
              <div>
                <strong>Access provisioned</strong>
                <small>Bandwidth policy applied</small>
              </div>
              <Check size={15} />
            </div>
          </div>
          <div className="visual-label">Subscriber lifecycle / Concept view</div>
        </>
      )}
    </div>
  );
}
