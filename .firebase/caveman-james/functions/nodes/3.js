

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/ask/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.533fae4f.js","_app/immutable/chunks/scheduler.2364b0ad.js","_app/immutable/chunks/index.e0615928.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/question.e6fa980e.js","_app/immutable/chunks/_commonjs-dynamic-modules.5fcb8f34.js","_app/immutable/chunks/public.79d73255.js","_app/immutable/chunks/NavBar.74969093.js","_app/immutable/chunks/index.db1f7a41.js"];
export const stylesheets = ["_app/immutable/assets/3.4d65fe28.css","_app/immutable/assets/NavBar.ffbd0f32.css"];
export const fonts = [];
