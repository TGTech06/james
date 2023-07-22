

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.abbf1aef.js","_app/immutable/chunks/scheduler.193b0897.js","_app/immutable/chunks/index.18598242.js","_app/immutable/chunks/singletons.05c1289d.js","_app/immutable/chunks/index.cfa5c76d.js"];
export const stylesheets = [];
export const fonts = [];
