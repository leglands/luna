

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.BRqteAOh.js","_app/immutable/chunks/D1v1btO3.js","_app/immutable/chunks/DQE1mmKB.js","_app/immutable/chunks/CYPEFcWe.js"];
export const stylesheets = [];
export const fonts = [];
