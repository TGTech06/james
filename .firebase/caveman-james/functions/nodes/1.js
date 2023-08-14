

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.c0a94c74.js","_app/immutable/chunks/scheduler.2364b0ad.js","_app/immutable/chunks/index.be5c2245.js","_app/immutable/chunks/singletons.d53d9455.js","_app/immutable/chunks/index.db1f7a41.js"];
export const stylesheets = [];
export const fonts = [];
