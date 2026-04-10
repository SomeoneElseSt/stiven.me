// Initialize theme based on saved preference or time of day (runs synchronously in <head>)
(function() {
    var saved = localStorage.getItem('theme');
    var hour = new Date().getHours();
    var SUNRISE = 6, SUNSET = 20;
    var daytime = hour >= SUNRISE && hour < SUNSET;
    if (saved === 'light' || (saved === null && daytime))
        document.documentElement.classList.add('light-mode');
}());

export function initTheme(): void {
    // Sync body to match whatever the head script already determined
    const isLight = document.documentElement.classList.contains('light-mode');
    document.body.classList.toggle('light-mode', isLight);
}
