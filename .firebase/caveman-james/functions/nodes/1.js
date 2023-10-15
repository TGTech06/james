

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.9d3bcfd8.js","_app/immutable/chunks/scheduler.2364b0ad.js","_app/immutable/chunks/index.be5c2245.js","_app/immutable/chunks/singletons.560ecbea.js","_app/immutable/chunks/index.db1f7a41.js"];
export const stylesheets = [];
export const fonts = [];
