import { isMobile } from './is_phone';

function isSafari(): boolean {
    return typeof (globalThis as any).safari !== 'undefined';
}

export function shouldDisableNProgress(): boolean {
    return isSafari() || isMobile();
}