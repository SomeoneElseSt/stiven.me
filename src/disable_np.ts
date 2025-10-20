import { isMobile } from './utils.js';

// Disabled in Safari because it already shows a loading indicator that ends faster than NProgress. Looks better without it.

function isSafari(): boolean {
    return typeof (globalThis as any).safari !== 'undefined';
}

export function shouldDisableNProgress(): boolean {
    return isSafari() || isMobile();
}