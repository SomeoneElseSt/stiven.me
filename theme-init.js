(function() {
    var saved = localStorage.getItem('theme');
    var hour = new Date().getHours();
    var SUNRISE = 6, SUNSET = 20;
    var daytime = hour >= SUNRISE && hour < SUNSET;
    if (saved === 'light' || (saved === null && daytime))
        document.documentElement.classList.add('light-mode');
}());
