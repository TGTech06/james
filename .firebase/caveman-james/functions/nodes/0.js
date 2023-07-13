

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.24973e3d.js","_app/immutable/chunks/scheduler.cc9b4bb6.js","_app/immutable/chunks/index.1aee684b.js"];
export const stylesheets = [];
export const fonts = [];
