

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/ask/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.6f31b91d.js","_app/immutable/chunks/3.83091f45.js","_app/immutable/chunks/scheduler.2364b0ad.js","_app/immutable/chunks/index.be5c2245.js","_app/immutable/chunks/NavBar.ed15d8f2.js","_app/immutable/chunks/public.f82b2f0c.js","_app/immutable/chunks/_commonjs-dynamic-modules.6fed1697.js","_app/immutable/chunks/index.db1f7a41.js","_app/immutable/chunks/hf.5ef78a69.js"];
export const stylesheets = ["_app/immutable/assets/3.4cbd34b4.css","_app/immutable/assets/NavBar.ffbd0f32.css"];
export const fonts = [];
