export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["apple-touch-icon.png","favicon.png","favicon.svg","robots.txt","tokens.css"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml",".txt":"text/plain",".css":"text/css"},
	_: {
		client: {start:"_app/immutable/entry/start.BpN9vNfV.js",app:"_app/immutable/entry/app.psXUUfDg.js",imports:["_app/immutable/entry/start.BpN9vNfV.js","_app/immutable/chunks/BhCvGAEV.js","_app/immutable/chunks/CLJRjzbj.js","_app/immutable/chunks/BwFKXdka.js","_app/immutable/entry/app.psXUUfDg.js","_app/immutable/chunks/BwFKXdka.js","_app/immutable/chunks/CLJRjzbj.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/sitemap.xml",
				pattern: /^\/sitemap\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/sitemap.xml/_server.ts.js'))
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
