

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.CFz9s5o9.js","_app/immutable/chunks/BwFKXdka.js","_app/immutable/chunks/BqrTOiUk.js"];
export const stylesheets = ["_app/immutable/assets/0.D8V5qwN8.css"];
export const fonts = [];
