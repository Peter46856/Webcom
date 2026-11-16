'use client';
import { useState } from 'react';
import { ArrowRight, Layers3 } from 'lucide-react';
type Node = { readonly title: string; readonly tech: string; readonly detail: string };
export function Architecture({ nodes }: { nodes: readonly Node[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="architecture">
      <div className="architecture-flow" role="group" aria-label="Explore architecture components">
        {nodes.map((node, index) => (
          <div key={node.title}>
            <button aria-pressed={active === index} onClick={() => setActive(index)}>
              <Layers3 size={21} />
              <strong>{node.title}</strong>
              <span>{node.tech}</span>
            </button>
            {index < nodes.length - 1 && <ArrowRight className="architecture-arrow" size={20} />}
          </div>
        ))}
      </div>
      <div className="architecture-explanation" aria-live="polite">
        <span className="status-label">
          <span />
          {nodes[active].title}
        </span>
        <p>{nodes[active].detail}</p>
      </div>
    </div>
  );
}
