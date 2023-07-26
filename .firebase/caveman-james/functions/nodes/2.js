

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.4c0da090.js","_app/immutable/chunks/scheduler.98e03797.js","_app/immutable/chunks/index.e99f61eb.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/files.d4ee2840.js","_app/immutable/chunks/NavBar.adcb78d3.js","_app/immutable/chunks/public.8bae8052.js","_app/immutable/chunks/_commonjs-dynamic-modules.089d3295.js","_app/immutable/chunks/question.7d3532c1.js","_app/immutable/chunks/brain.c0d8c4fe.js","_app/immutable/chunks/index.0907e69b.js"];
export const stylesheets = ["_app/immutable/assets/2.bc14965d.css","_app/immutable/assets/NavBar.ffbd0f32.css"];
export const fonts = [];
