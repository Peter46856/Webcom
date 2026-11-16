'use client';
import { useState } from 'react';
import { Code2, Network, Route, Database, Radio, ArrowUpRight } from 'lucide-react';
const layers = [
  {
    name: 'Software',
    icon: Code2,
    title: 'Application layer',
    description: 'Purpose-built interfaces. Thoughtfully connected APIs.',
    tech: 'React / Java / APIs',
    node: 'Application services',
  },
  {
    name: 'Logistics',
    icon: Route,
    title: 'Operations layer',
    description: 'Live fleet positions. Clear dispatch decisions.',
    tech: 'GPS / WebSockets / Routes',
    node: 'Fleet event pipeline',
  },
  {
    name: 'Networks',
    icon: Network,
    title: 'Infrastructure layer',
    description: 'Reliable access. Automated subscriber operations.',
    tech: 'MikroTik / Fiber / PPPoE',
    node: 'Network orchestration',
  },
];
export function SystemMap() {
  const [active, setActive] = useState(0);
  const layer = layers[active];
  return (
    <div className="system-visual">
      <div className="map-topline">
        <span>
          <span className="tiny-square" />
          WebCom / Systems view
        </span>
        <span className="map-legend">
          <i />
          Architecture explorer
        </span>
      </div>
      <div className="map-canvas">
        <div className="map-grid" />
        <svg className="connection-lines" viewBox="0 0 520 330" fill="none" aria-hidden="true">
          <path
            d="M80 80H175L260 160M440 80H345L260 160M80 255H175L260 160M440 255H345L260 160"
            stroke="#234357"
          />
          <path
            className="flow-line"
            d="M80 80H175L260 160H345L440 255"
            stroke="#00f2fe"
            strokeOpacity=".8"
            strokeDasharray="3 7"
          />
          <circle cx="260" cy="160" r="92" stroke="#1a2a3a" strokeDasharray="4 8" />
          <circle cx="260" cy="160" r="120" stroke="#152334" />
        </svg>
        <div className="map-node node-app">
          <Code2 size={18} />
          <span>Interfaces</span>
          <i />
        </div>
        <div className="map-node node-network">
          <Network size={18} />
          <span>Networks</span>
          <i />
        </div>
        <div className="map-core">
          <div className="core-symbol">
            <span />
            <span />
            <span />
          </div>
          <strong>{layer.node}</strong>
          <small>Connected by design</small>
        </div>
        <div className="map-node node-data">
          <Database size={18} />
          <span>Data</span>
          <i />
        </div>
        <div className="map-node node-live">
          <Radio size={18} />
          <span>Live events</span>
          <i />
        </div>
        <span className="map-coordinate">Architecture, from end to end</span>
      </div>
      <div className="map-bottom">
        <div>
          <span className="map-layer-title">{layer.title}</span>
          <p>{layer.description}</p>
          <code>{layer.tech}</code>
        </div>
        <ArrowUpRight size={20} />
      </div>
      <div className="map-tabs" role="group" aria-label="Explore engineering disciplines">
        {layers.map((item, index) => (
          <button key={item.name} aria-pressed={index === active} onClick={() => setActive(index)}>
            <item.icon size={15} />
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}
