import type { ReactNode } from "react";

export function EffectWorkBridge({ children }: { children: ReactNode }) {
  return (
    <div className="effect-work-journey" data-effect-work-journey>
      {children}
    </div>
  );
}
