

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/profile/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.43575171.js","_app/immutable/chunks/scheduler.2364b0ad.js","_app/immutable/chunks/index.e0615928.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/public.42564a77.js","_app/immutable/chunks/NavBar.34dbe8c9.js","_app/immutable/chunks/hf.8332603d.js","_app/immutable/chunks/index.3c8223fb.js","_app/immutable/chunks/brain.c0d8c4fe.js"];
export const stylesheets = ["_app/immutable/assets/5.94ed8fa7.css","_app/immutable/assets/NavBar.ffbd0f32.css"];
export const fonts = [];
