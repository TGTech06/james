

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.fc0f2268.js","_app/immutable/chunks/scheduler.2364b0ad.js","_app/immutable/chunks/index.9f7452a2.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/public.9062b0fe.js","_app/immutable/chunks/NavBar.28f036ee.js","_app/immutable/chunks/index.db1f7a41.js"];
export const stylesheets = ["_app/immutable/assets/NavBar.ffbd0f32.css"];
export const fonts = [];
