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

function findAllLinks(): NodeListOf<HTMLAnchorElement> {
    const links = document.querySelectorAll('a');
    if (links.length === 0) {
        console.warn("Error: No links found in findAllLinks");
        return [] as unknown as NodeListOf<HTMLAnchorElement>;
    }
    return links;
}

export function addNpProgressListeners() {
    const links = findAllLinks();
    links.forEach((link) => {
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