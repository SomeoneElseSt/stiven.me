export function initTheme(): void {
    const saved = localStorage.getItem('theme');
    const h = new Date().getHours();
    const isLight = saved === 'light' || (saved === null && h >= 6 && h < 20);
    document.documentElement.classList.toggle('light-mode', isLight);
}
