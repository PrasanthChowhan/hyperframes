import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { usePanelLayoutContext } from "../contexts/PanelLayoutContext";

export function RightPanelPortal({ children }: { children: React.ReactNode }) {
  const [target, setTarget] = useState<HTMLElement | null>(
    document.getElementById("animaker-inspector-root")
  );
  const { setRightCollapsed } = usePanelLayoutContext();
  const mountedRef = useRef(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const el = document.getElementById("animaker-inspector-root");
      if (el !== target) {
        setTarget(el);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    if (!mountedRef.current) {
      // First mount: StudioApp just decided it wants the panel OPEN.
      if (!target && ((window as any).__TAURI_INTERNALS__ || (window as any).__TAURI__)) {
        window.dispatchEvent(new CustomEvent("hf:open-inspector"));
      }
      mountedRef.current = true;
    } else {
      // Subsequent runs: If target goes missing, it means Animaker closed the Inspector UI.
      // We must sync this state back to StudioApp so it collapses internally!
      if (!target && ((window as any).__TAURI_INTERNALS__ || (window as any).__TAURI__)) {
        setRightCollapsed(true);
      }
    }

    return () => observer.disconnect();
  }, [target, setRightCollapsed]);

  if (target) {
    return createPortal(children, target);
  }

  // If we are running inside Tauri (Animaker v2) but target is missing, it means 
  // the inspector is toggled off. We return null so the panel is completely hidden 
  // and doesn't pollute the center preview area.
  if ((window as any).__TAURI_INTERNALS__ || (window as any).__TAURI__) {
    return null;
  }

  // Fallback for standalone studio runs without Animaker
  return <>{children}</>;
}
