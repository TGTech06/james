import * as server from '../entries/pages/login/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/login/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/login/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.e32c2b01.js","_app/immutable/chunks/scheduler.d474dcd1.js","_app/immutable/chunks/index.93df3e69.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/public.5e044cb4.js"];
export const stylesheets = [];
export const fonts = [];
