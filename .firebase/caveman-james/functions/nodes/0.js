import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.dbe3c063.js","_app/immutable/chunks/scheduler.2364b0ad.js","_app/immutable/chunks/index.9f7452a2.js","_app/immutable/chunks/supabase.280865c8.js","_app/immutable/chunks/public.9062b0fe.js","_app/immutable/chunks/singletons.07139c22.js","_app/immutable/chunks/index.db1f7a41.js"];
export const stylesheets = ["_app/immutable/assets/0.b87c9120.css"];
export const fonts = [];
