

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/ask/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.d9099d06.js","_app/immutable/chunks/3.e3acd5ce.js","_app/immutable/chunks/scheduler.2364b0ad.js","_app/immutable/chunks/index.be5c2245.js","_app/immutable/chunks/NavBar.9cc01a6e.js","_app/immutable/chunks/public.41f5b175.js","_app/immutable/chunks/_commonjs-dynamic-modules.6fed1697.js","_app/immutable/chunks/index.db1f7a41.js","_app/immutable/chunks/hf.d76b572f.js"];
export const stylesheets = ["_app/immutable/assets/3.4cbd34b4.css","_app/immutable/assets/NavBar.ffbd0f32.css"];
export const fonts = [];
