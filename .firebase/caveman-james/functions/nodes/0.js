import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.73801ec0.js","_app/immutable/chunks/scheduler.744affc9.js","_app/immutable/chunks/index.42e20cb7.js","_app/immutable/chunks/supabase.274d4497.js","_app/immutable/chunks/public.8bae8052.js","_app/immutable/chunks/singletons.a786aa19.js","_app/immutable/chunks/index.43531919.js"];
export const stylesheets = ["_app/immutable/assets/0.da5e6297.css"];
export const fonts = [];
