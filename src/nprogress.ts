import { findLinks } from './utils';

declare const NProgress: {
    configure(options: {
        showSpinner?: boolean;
        minimum?: number;
        speed?: number;
        trickleSpeed?: number;
    }): void;
    start(): void;
    set(progress: number): void;
    done(): void;
    remove(): void;
};

export function addNpProgressListeners(): void {
    const links = findLinks('a', true) as NodeListOf<HTMLAnchorElement> | null;
    if (!links) {
        console.warn("Error: No links found in addNpProgressListeners");
        return;
    }
    links.forEach((link: HTMLAnchorElement) => {
        link.addEventListener('click', function(event) {
            const isExternal = link.hostname && link.hostname !== window.location.hostname;
            if (isExternal || link.target === '_blank' || event.ctrlKey || event.metaKey) {
                return;
            }
            NProgress.configure({ showSpinner: false, minimum: 0.1, speed: 200, trickleSpeed: 50 });
            NProgress.start();
            NProgress.set(0.4);
        });
    });
}