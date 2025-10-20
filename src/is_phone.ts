export function isMobile(): boolean {
    const isMobileSize = window.matchMedia("(max-width: 768px)").matches as boolean;
    const isTouchDevice = ('ontouchstart' in window || navigator.maxTouchPoints > 0) as boolean;
    return isMobileSize && isTouchDevice;
}