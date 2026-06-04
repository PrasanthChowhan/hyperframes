// NLE Layout
export { NLELayout } from "./components/nle/NLELayout";
export { NLEPreview } from "./components/nle/NLEPreview";
export { CompositionBreadcrumb } from "./components/nle/CompositionBreadcrumb";
export type { CompositionLevel } from "./components/nle/CompositionBreadcrumb";

// Player (preview, timeline, playback controls)
export {
  Player,
  PlayerControls,
  Timeline,
  VideoThumbnail,
  CompositionThumbnail,
  useTimelinePlayer,
  resolveIframe,
  usePlayerStore,
  liveTime,
  formatTime,
} from "./player";
export type { TimelineElement } from "./player";

// Editor
export { SourceEditor } from "./components/editor/SourceEditor";
export { PropertyPanel } from "./components/editor/PropertyPanel";
export { FileTree } from "./components/editor/FileTree";

// App
export { StudioApp } from "./App";

// Hooks
export { useElementPicker } from "./hooks/useElementPicker";
export type { PickedElement } from "./hooks/useElementPicker";
export { useBlockCatalog } from "./hooks/useBlockCatalog";
export type { CatalogItem } from "./hooks/useBlockCatalog";
export { PromptPreviewModal, buildAgentPrompt } from "./components/sidebar/BlocksTab";
export type { CompositionContext } from "./components/sidebar/BlocksTab";

// Utilities
export { resolveSourceFile, applyPatch } from "./utils/sourcePatcher";
export type { PatchOperation } from "./utils/sourcePatcher";
export { parseStyleString, mergeStyleIntoTag, findElementBlock } from "./utils/htmlEditor";
export { BLOCK_CATEGORIES, getCategoryColors } from "./utils/blockCategories";
export type { BlockCategory } from "./utils/blockCategories";
