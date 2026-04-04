export function initTheme(): void {
    const isLight = localStorage.getItem('theme') === 'light';
    document.documentElement.classList.toggle('light-mode', isLight);
}
