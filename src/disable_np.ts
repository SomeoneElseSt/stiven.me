import { isMobile, isIPad } from './utils.js';

function isSafari(): boolean {
    return typeof (globalThis as any).safari !== 'undefined';
}

export function shouldDisableNProgress(): boolean {
    return isSafari() || isMobile() || isIPad();
}