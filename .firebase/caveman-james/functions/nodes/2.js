

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.8c6f41ad.js","_app/immutable/chunks/2.bc7961c5.js","_app/immutable/chunks/scheduler.d474dcd1.js","_app/immutable/chunks/index.93df3e69.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/public.816bc6b5.js","_app/immutable/chunks/index.421580be.js"];
export const stylesheets = ["_app/immutable/assets/2.4bdee9b4.css"];
export const fonts = [];
