

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.BwPx8c9R.js","_app/immutable/chunks/DQxO7yX5.js","_app/immutable/chunks/D9cnnNzJ.js"];
export const stylesheets = ["_app/immutable/assets/0.BlENiZTk.css"];
export const fonts = [];
