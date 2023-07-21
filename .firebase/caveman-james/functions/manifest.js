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
		client: {"start":"_app/immutable/entry/start.159d5896.js","app":"_app/immutable/entry/app.62adff32.js","imports":["_app/immutable/entry/start.159d5896.js","_app/immutable/chunks/scheduler.744affc9.js","_app/immutable/chunks/singletons.99a73b17.js","_app/immutable/chunks/index.43531919.js","_app/immutable/entry/app.62adff32.js","_app/immutable/chunks/preload-helper.cf010ec4.js","_app/immutable/chunks/scheduler.744affc9.js","_app/immutable/chunks/index.f15cdbf8.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
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
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
