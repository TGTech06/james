

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.390843b9.js","_app/immutable/chunks/2.dcee5b7c.js","_app/immutable/chunks/scheduler.d474dcd1.js","_app/immutable/chunks/index.93df3e69.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/public.5e044cb4.js","_app/immutable/chunks/index.421580be.js"];
export const stylesheets = [];
export const fonts = [];
