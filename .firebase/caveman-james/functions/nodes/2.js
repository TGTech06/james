

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.633064ff.js","_app/immutable/chunks/2.ffa7b4ea.js","_app/immutable/chunks/scheduler.744affc9.js","_app/immutable/chunks/index.f15cdbf8.js","_app/immutable/chunks/preload-helper.cf010ec4.js","_app/immutable/chunks/index.43531919.js"];
export const stylesheets = [];
export const fonts = [];
