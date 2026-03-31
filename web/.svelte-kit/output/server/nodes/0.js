

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.Bty5Zd-b.js","_app/immutable/chunks/bVzZqNtC.js","_app/immutable/chunks/CFrb_REH.js"];
export const stylesheets = ["_app/immutable/assets/0.CeVhNc7C.css"];
export const fonts = [];
