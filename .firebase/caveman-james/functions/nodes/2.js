

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.da38749f.js","_app/immutable/chunks/scheduler.2364b0ad.js","_app/immutable/chunks/index.be5c2245.js","_app/immutable/chunks/NavBar.ed15d8f2.js","_app/immutable/chunks/public.f82b2f0c.js","_app/immutable/chunks/index.db1f7a41.js"];
export const stylesheets = ["_app/immutable/assets/NavBar.ffbd0f32.css"];
export const fonts = [];
