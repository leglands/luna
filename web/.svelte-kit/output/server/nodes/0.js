

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.LlEKrh0V.js","_app/immutable/chunks/DdQfu7QM.js","_app/immutable/chunks/DB9F2T7O.js"];
export const stylesheets = ["_app/immutable/assets/0.CeVhNc7C.css"];
export const fonts = [];
