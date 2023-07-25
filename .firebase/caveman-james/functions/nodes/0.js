import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.c1985801.js","_app/immutable/chunks/scheduler.d474dcd1.js","_app/immutable/chunks/index.93df3e69.js","_app/immutable/chunks/supabase.a5b3cb4e.js","_app/immutable/chunks/public.816bc6b5.js","_app/immutable/chunks/singletons.2b3cec5e.js","_app/immutable/chunks/index.421580be.js"];
export const stylesheets = ["_app/immutable/assets/0.de8f0b26.css"];
export const fonts = [];
