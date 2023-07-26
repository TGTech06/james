

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/ask/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.59908a14.js","_app/immutable/chunks/scheduler.98e03797.js","_app/immutable/chunks/index.e99f61eb.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/question.7d3532c1.js","_app/immutable/chunks/_commonjs-dynamic-modules.089d3295.js","_app/immutable/chunks/public.8bae8052.js","_app/immutable/chunks/NavBar.adcb78d3.js","_app/immutable/chunks/index.0907e69b.js"];
export const stylesheets = ["_app/immutable/assets/3.0a120ffe.css","_app/immutable/assets/NavBar.ffbd0f32.css"];
export const fonts = [];
