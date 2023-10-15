

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/profile/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.a15c138e.js","_app/immutable/chunks/scheduler.2364b0ad.js","_app/immutable/chunks/index.be5c2245.js","_app/immutable/chunks/NavBar.ed15d8f2.js","_app/immutable/chunks/public.f82b2f0c.js","_app/immutable/chunks/hf.5ef78a69.js"];
export const stylesheets = ["_app/immutable/assets/5.94ed8fa7.css","_app/immutable/assets/NavBar.ffbd0f32.css"];
export const fonts = [];
