

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.9f603d26.js","_app/immutable/chunks/2.daecf790.js","_app/immutable/chunks/scheduler.193b0897.js","_app/immutable/chunks/index.18598242.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/public.9150bb34.js","_app/immutable/chunks/index.cfa5c76d.js"];
export const stylesheets = [];
export const fonts = [];
