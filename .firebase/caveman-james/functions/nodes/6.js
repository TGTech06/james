import * as server from '../entries/pages/register/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/register/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/register/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.e65d4177.js","_app/immutable/chunks/scheduler.2364b0ad.js","_app/immutable/chunks/index.be5c2245.js","_app/immutable/chunks/public.f82b2f0c.js","_app/immutable/chunks/navigation.99daaddd.js","_app/immutable/chunks/singletons.560ecbea.js","_app/immutable/chunks/index.db1f7a41.js"];
export const stylesheets = ["_app/immutable/assets/6.3a350ee3.css"];
export const fonts = [];
