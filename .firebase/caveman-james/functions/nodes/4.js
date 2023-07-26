import * as server from '../entries/pages/login/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/login/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/login/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.66ad7edb.js","_app/immutable/chunks/scheduler.744affc9.js","_app/immutable/chunks/index.42e20cb7.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/public.8bae8052.js"];
export const stylesheets = ["_app/immutable/assets/4.e66eb7d1.css"];
export const fonts = [];
