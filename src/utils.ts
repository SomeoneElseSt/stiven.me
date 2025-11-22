export function isMobile(): boolean {
    const isMobileSize = window.matchMedia("(max-width: 768px)").matches;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    return isMobileSize && isTouchDevice;
}

export function isIPad(): boolean {
    if (navigator.platform === 'iPad') {
        return true;
    }
    
    const ua = navigator.userAgent;
    const isMacintosh = /Macintosh/i.test(ua);
    const isSafariUA = /Safari/i.test(ua) && !/Chrome|CriOS|FxiOS|EdgiOS/i.test(ua);
    const hasTouchSupport = navigator.maxTouchPoints > 1;
    
    if (isMacintosh && isSafariUA && hasTouchSupport && !/iPhone/i.test(ua)) {
        return true;
    }
    
    return /iPad/i.test(ua);
}

export function findLinks(linkQuery: string, findAll: boolean = false): HTMLAnchorElement | NodeListOf<HTMLAnchorElement> | null {
    if (findAll) {
        const links = document.querySelectorAll(linkQuery);
        if (links.length === 0) {
            console.warn(`Error: No links found in findLinks: ${linkQuery} (findAll: true)`);
            return null;
        }
        return links as NodeListOf<HTMLAnchorElement>;
    }
    
    const link = document.querySelector(linkQuery);
    if (!link) {
        console.warn(`Error: Link not found in findLinks: ${linkQuery} (findAll: false)`);
        return null;
    }
    return link as HTMLAnchorElement;
}