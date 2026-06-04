import { useState, useEffect } from "react";
import { usePlayerStore } from "../player";
import { buildAgentPrompt, PromptPreviewModal } from "./sidebar/BlocksTab";
import type { CompositionDimensions } from "./renders/RenderQueue";

export function GlobalCatalogActionsManager({
  handleAddBlock,
  activeCompPath,
  compositionDimensions,
}: {
  handleAddBlock: (blockName: string) => void;
  activeCompPath: string | null;
  compositionDimensions: CompositionDimensions | null;
}) {
  const [promptState, setPromptState] = useState<{ title: string; prompt: string } | null>(null);

  useEffect(() => {
    const handleGlobalAskAgent = (e: CustomEvent<{ block: any }>) => {
      const b = e.detail.block;
      const state = usePlayerStore.getState();
      const ctx = {
        currentTime: state.currentTime,
        activeCompPath,
        elements: state.elements,
        compositionDimensions: compositionDimensions || undefined,
      };
      setPromptState({
        title: b.title,
        prompt: buildAgentPrompt(b.title, b.name, b.description, b.category, b.type, ctx),
      });
    };

    const handleGlobalAddBlock = (e: CustomEvent<{ blockName: string }>) => {
      handleAddBlock(e.detail.blockName);
    };

    window.addEventListener("hf:add-block", handleGlobalAddBlock as EventListener);
    window.addEventListener("hf:ask-agent", handleGlobalAskAgent as EventListener);
    return () => {
      window.removeEventListener("hf:add-block", handleGlobalAddBlock as EventListener);
      window.removeEventListener("hf:ask-agent", handleGlobalAskAgent as EventListener);
    };
  }, [handleAddBlock, activeCompPath, compositionDimensions]);

  if (!promptState) return null;

  return (
    <PromptPreviewModal
      title={promptState.title}
      prompt={promptState.prompt}
      onClose={() => setPromptState(null)}
    />
  );
}
