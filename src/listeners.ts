const CLICK_FEEDBACK_DURATION_MS = 500;
const CLICKED_CLASS = 'clicked';

export function handleLinkClick(event: MouseEvent) {
    const link = event.currentTarget as HTMLAnchorElement;
    if (!link) {
        console.warn("Error: Link not found in handleLinkClick");
        return;
    }
    link.classList.add(CLICKED_CLASS);
    setTimeout(() => {
        link.classList.remove(CLICKED_CLASS);
    }, CLICK_FEEDBACK_DURATION_MS);
}

function findAllSocialLinks(): NodeListOf<HTMLAnchorElement> {
    return document.querySelectorAll('.social-links a');
}

export function addSocialLinkClickListeners() {
    const socialLinks = findAllSocialLinks();
    socialLinks.forEach((link) => {
        link.addEventListener('click', handleLinkClick);
    });
}