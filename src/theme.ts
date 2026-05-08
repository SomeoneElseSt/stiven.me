(function() {
    var saved = localStorage.getItem('theme');
    if (saved === 'light')
        document.documentElement.classList.add('light-mode');

    document.addEventListener('DOMContentLoaded', function() {
        var isLight = document.documentElement.classList.contains('light-mode');
        document.body.classList.toggle('light-mode', isLight);
    });
}());
