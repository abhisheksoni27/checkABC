self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('checkABC').then(function (cache) {
            return cache.addAll([
                '/',
                './index.html',
                './bundle.css',
                './bundle.js',
                'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs',
                'https://fonts.googleapis.com/css?family=Raleway:200,400,700',
                'https://codeprose.me/checkABC/model/model.json',
                'https://codeprose.me/checkABC/model/group1-shard1of1',
                'https://codeprose.me/checkABC/model/group2-shard1of1',
                'https://codeprose.me/checkABC/model/group3-shard1of2',
                'https://codeprose.me/checkABC/model/group3-shard2of2',
                'https://codeprose.me/checkABC/model/group4-shard1of1'
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    console.log(event.request.url);

    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});