

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.12c6e8ee.js","_app/immutable/chunks/scheduler.2364b0ad.js","_app/immutable/chunks/index.9f7452a2.js","_app/immutable/chunks/singletons.07139c22.js","_app/immutable/chunks/index.db1f7a41.js"];
export const stylesheets = [];
export const fonts = [];
