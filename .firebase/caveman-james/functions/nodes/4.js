import * as server from '../entries/pages/register/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/register/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/register/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.38e8d0c6.js","_app/immutable/chunks/scheduler.d474dcd1.js","_app/immutable/chunks/index.93df3e69.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/public.816bc6b5.js"];
export const stylesheets = ["_app/immutable/assets/4.3a350ee3.css"];
export const fonts = [];
