

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/ask/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.abebbd52.js","_app/immutable/chunks/scheduler.744affc9.js","_app/immutable/chunks/index.42e20cb7.js","_app/immutable/chunks/question.dcf756cc.js","_app/immutable/chunks/_commonjs-dynamic-modules.089d3295.js","_app/immutable/chunks/public.8bae8052.js","_app/immutable/chunks/AuthCheck.c630ed59.js","_app/immutable/chunks/globals.7f7f1b26.js"];
export const stylesheets = ["_app/immutable/assets/3.7d83f03c.css","_app/immutable/assets/AuthCheck.ffbd0f32.css"];
export const fonts = [];
