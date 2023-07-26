

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.ad2c9035.js","_app/immutable/chunks/scheduler.744affc9.js","_app/immutable/chunks/index.42e20cb7.js","_app/immutable/chunks/singletons.a786aa19.js","_app/immutable/chunks/index.43531919.js"];
export const stylesheets = [];
export const fonts = [];
