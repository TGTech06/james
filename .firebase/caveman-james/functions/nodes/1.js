

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.7825427e.js","_app/immutable/chunks/scheduler.d474dcd1.js","_app/immutable/chunks/index.93df3e69.js","_app/immutable/chunks/singletons.2b3cec5e.js","_app/immutable/chunks/index.421580be.js"];
export const stylesheets = [];
export const fonts = [];
