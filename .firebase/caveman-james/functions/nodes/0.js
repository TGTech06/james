import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.d1b1a794.js","_app/immutable/chunks/scheduler.2364b0ad.js","_app/immutable/chunks/index.be5c2245.js","_app/immutable/chunks/supabase.fcea5650.js","_app/immutable/chunks/public.f82b2f0c.js","_app/immutable/chunks/navigation.99daaddd.js","_app/immutable/chunks/singletons.560ecbea.js","_app/immutable/chunks/index.db1f7a41.js"];
export const stylesheets = ["_app/immutable/assets/0.b87c9120.css"];
export const fonts = [];
