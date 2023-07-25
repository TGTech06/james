export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["chatui/favicon.png","chatui/favicon.svg","chatui/touch-icon-ipad-retina.png","chatui/touch-icon-ipad.png","chatui/touch-icon-iphone-retina.png","favicon.png","huggingchat/favicon.png","huggingchat/favicon.svg","huggingchat/thumbnail.png","huggingchat/touch-icon-ipad-retina.png","huggingchat/touch-icon-ipad.png","huggingchat/touch-icon-iphone-retina.png"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml"},
	_: {
		client: {"start":"_app/immutable/entry/start.e5049d57.js","app":"_app/immutable/entry/app.3ac1a708.js","imports":["_app/immutable/entry/start.e5049d57.js","_app/immutable/chunks/scheduler.d474dcd1.js","_app/immutable/chunks/singletons.2b3cec5e.js","_app/immutable/chunks/index.421580be.js","_app/immutable/entry/app.3ac1a708.js","_app/immutable/chunks/public.816bc6b5.js","_app/immutable/chunks/supabase.a5b3cb4e.js","_app/immutable/chunks/scheduler.d474dcd1.js","_app/immutable/chunks/index.93df3e69.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api",
				pattern: /^\/api\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/_server.ts.js'))
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/logout",
				pattern: /^\/logout\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/logout/_server.ts.js'))
			},
			{
				id: "/register",
				pattern: /^\/register\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
