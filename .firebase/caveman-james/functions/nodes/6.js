import * as server from '../entries/pages/register/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/register/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/register/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.8a1bf27b.js","_app/immutable/chunks/scheduler.2364b0ad.js","_app/immutable/chunks/index.e0615928.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/public.42564a77.js"];
export const stylesheets = ["_app/immutable/assets/6.3a350ee3.css"];
export const fonts = [];
