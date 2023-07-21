

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.523b32c4.js","_app/immutable/chunks/scheduler.744affc9.js","_app/immutable/chunks/index.f15cdbf8.js","_app/immutable/chunks/singletons.99a73b17.js","_app/immutable/chunks/index.43531919.js"];
export const stylesheets = [];
export const fonts = [];
