

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.a9342941.js","_app/immutable/chunks/scheduler.98e03797.js","_app/immutable/chunks/index.e99f61eb.js","_app/immutable/chunks/singletons.3a562e06.js","_app/immutable/chunks/index.0907e69b.js"];
export const stylesheets = [];
export const fonts = [];
