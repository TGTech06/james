import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.f0478dce.js","_app/immutable/chunks/scheduler.193b0897.js","_app/immutable/chunks/index.18598242.js","_app/immutable/chunks/supabase.a749d6da.js","_app/immutable/chunks/public.9150bb34.js","_app/immutable/chunks/singletons.05c1289d.js","_app/immutable/chunks/index.cfa5c76d.js"];
export const stylesheets = ["_app/immutable/assets/0.dcc83a9a.css"];
export const fonts = [];
