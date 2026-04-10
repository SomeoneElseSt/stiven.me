export function initTheme(): void {
    const saved = localStorage.getItem('theme');
    const hour = new Date().getHours();
    const SUNRISE = 6, SUNSET = 20;
    const daytime = hour >= SUNRISE && hour < SUNSET;
    const isLight = saved === 'light' || (saved === null && daytime);
    document.documentElement.classList.toggle('light-mode', isLight);
}
