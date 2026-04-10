export function initTheme(): void {
    // dist/theme.js runs synchronously in <head> and sets the light-mode class.
    // Sync body to match so toggle listeners have a consistent starting point.
    const isLight = document.documentElement.classList.contains('light-mode');
    document.body.classList.toggle('light-mode', isLight);
}
