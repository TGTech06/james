import * as server from '../entries/pages/register/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/register/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/register/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.8d15e38d.js","_app/immutable/chunks/scheduler.d474dcd1.js","_app/immutable/chunks/index.93df3e69.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/public.5e044cb4.js"];
export const stylesheets = [];
export const fonts = [];
