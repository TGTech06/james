

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.dcc31cd3.js","_app/immutable/chunks/scheduler.2364b0ad.js","_app/immutable/chunks/index.e0615928.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/files.cc3a7461.js","_app/immutable/chunks/NavBar.34dbe8c9.js","_app/immutable/chunks/public.42564a77.js","_app/immutable/chunks/_commonjs-dynamic-modules.6fed1697.js","_app/immutable/chunks/question.0a50e0b8.js","_app/immutable/chunks/brain.c0d8c4fe.js","_app/immutable/chunks/index.db1f7a41.js"];
export const stylesheets = ["_app/immutable/assets/NavBar.ffbd0f32.css","_app/immutable/assets/question.2c96da42.css"];
export const fonts = [];
