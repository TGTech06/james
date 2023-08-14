

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/profile/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.c6741acd.js","_app/immutable/chunks/scheduler.2364b0ad.js","_app/immutable/chunks/index.be5c2245.js","_app/immutable/chunks/NavBar.9cc01a6e.js","_app/immutable/chunks/public.41f5b175.js","_app/immutable/chunks/hf.d76b572f.js"];
export const stylesheets = ["_app/immutable/assets/5.94ed8fa7.css","_app/immutable/assets/NavBar.ffbd0f32.css"];
export const fonts = [];
