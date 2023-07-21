

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.2038f2a9.js","_app/immutable/chunks/2.ba8461b9.js","_app/immutable/chunks/scheduler.744affc9.js","_app/immutable/chunks/index.f15cdbf8.js","_app/immutable/chunks/preload-helper.cf010ec4.js","_app/immutable/chunks/index.43531919.js"];
export const stylesheets = [];
export const fonts = [];
