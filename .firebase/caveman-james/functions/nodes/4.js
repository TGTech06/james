import * as server from '../entries/pages/register/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/register/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/register/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.d0e66644.js","_app/immutable/chunks/scheduler.193b0897.js","_app/immutable/chunks/index.18598242.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/public.9150bb34.js"];
export const stylesheets = [];
export const fonts = [];