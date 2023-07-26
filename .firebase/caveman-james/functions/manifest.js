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
		client: {"start":"_app/immutable/entry/start.b2376eae.js","app":"_app/immutable/entry/app.bdfe43fa.js","imports":["_app/immutable/entry/start.b2376eae.js","_app/immutable/chunks/scheduler.98e03797.js","_app/immutable/chunks/singletons.3a562e06.js","_app/immutable/chunks/index.0907e69b.js","_app/immutable/entry/app.bdfe43fa.js","_app/immutable/chunks/public.8bae8052.js","_app/immutable/chunks/supabase.274d4497.js","_app/immutable/chunks/scheduler.98e03797.js","_app/immutable/chunks/index.e99f61eb.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js'))
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
				id: "/ask",
				pattern: /^\/ask\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
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
				id: "/profile",
				pattern: /^\/profile\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/register",
				pattern: /^\/register\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/upload",
				pattern: /^\/upload\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
