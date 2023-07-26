

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/profile/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.01fa39ba.js","_app/immutable/chunks/scheduler.744affc9.js","_app/immutable/chunks/index.42e20cb7.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/public.8bae8052.js","_app/immutable/chunks/AuthCheck.c630ed59.js","_app/immutable/chunks/brain.c0d8c4fe.js"];
export const stylesheets = ["_app/immutable/assets/5.c19f0714.css","_app/immutable/assets/AuthCheck.ffbd0f32.css"];
export const fonts = [];
