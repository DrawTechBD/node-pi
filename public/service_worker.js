if ('serviceWorker' in navigator) {
    window.addEventListener('flutter-first-frame', function () {
        navigator.serviceWorker.register('flutter_service_worker.js?v=2282992013');
    });
}
