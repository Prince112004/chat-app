import React from "react";

function BorderAnimatedContainer({ children }) {
  return (
    <div
      className="w-full h-full rounded-2xl border border-transparent animate-border flex overflow-hidden"
      style={{
        background: `linear-gradient(45deg, #172033, #1e293b 50%, #172033) padding-box,
                     conic-gradient(from var(--border-angle), #475569 80%, #06b6d4 86%, #22d3ee 90%, #06b6d4 94%, #475569) border-box`,
      }}
    >
      {children}
    </div>
  );
}

export default BorderAnimatedContainer;
