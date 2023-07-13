

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.18e45e0e.js","_app/immutable/chunks/scheduler.cc9b4bb6.js","_app/immutable/chunks/index.1aee684b.js","_app/immutable/chunks/singletons.94c43eaf.js"];
export const stylesheets = [];
export const fonts = [];
