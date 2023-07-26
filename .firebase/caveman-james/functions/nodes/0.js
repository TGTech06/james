import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.b2b3eecc.js","_app/immutable/chunks/scheduler.98e03797.js","_app/immutable/chunks/index.e99f61eb.js","_app/immutable/chunks/supabase.274d4497.js","_app/immutable/chunks/public.8bae8052.js","_app/immutable/chunks/singletons.3a562e06.js","_app/immutable/chunks/index.0907e69b.js"];
export const stylesheets = ["_app/immutable/assets/0.0f6cf0e8.css"];
export const fonts = [];
