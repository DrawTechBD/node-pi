'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "75c9a3e5304b1c011089dec58a98e2ae",
"assets/assets/fonts/NothingYouCouldDo.ttf": "5518c1135d22553f552197a4050b65c4",
"assets/assets/fonts/Product_Sans_Bold.ttf": "dba0c688b8d5ee09a1e214aebd5d25e4",
"assets/assets/fonts/Product_Sans_Regular.ttf": "eae9c18cee82a8a1a52e654911f8fe83",
"assets/assets/icons/Logo_dark_theme.svg": "49ae8d7fbd3f8a591d9485fed2faa2be",
"assets/assets/icons/Logo_light_theme.svg": "843463fe7e11bcc2619037d21794c4a9",
"assets/assets/images/background.png": "62e8a29c20a86062ed4e2a59a621e898",
"assets/assets/images/firstImage.png": "5003ef44455677d4964cf2bab3aa7626",
"assets/assets/images/Logo_dark.png": "5888d9fca63142928c8f535ca1a00baa",
"assets/assets/images/Logo_light.png": "548e5e7812a26d086637486b3c7873ff",
"assets/assets/images/secondImage.png": "396b627605ac9f7e024059d8c603a08a",
"assets/assets/images/splash/chatting.gif": "cd27e4bdf7bc7a2b1c0c6af1d833c9fc",
"assets/assets/images/splash/happy.gif": "aa69976cfc5b3ad5532be659ecd8bc73",
"assets/assets/images/splash/lose-stuff.gif": "1a575424f4735e3d1ea457b1318324a6",
"assets/assets/images/splash/lost.gif": "19fdf34eb6e99008c2b0161477d3bf74",
"assets/assets/images/splash/parcel.gif": "a3bd00d7fe5257e36cd5de6501a3423f",
"assets/assets/images/splash/printing.gif": "e942feaa058c1412637a35cca5f58e59",
"assets/assets/images/splash/qr-generate.gif": "57c742aa79af0656d0d11db4f3986a99",
"assets/assets/images/splash/qr-generate2.gif": "d3e6200d063f47841e93b2dec4bac911",
"assets/assets/images/splash/scan-qr.gif": "e4af9f0025a8ce68bee2cf5a1360a501",
"assets/assets/images/splash/search-everywhere.gif": "a30843cb8e7caa5ae293c47e4a4bc4f3",
"assets/assets/images/splash/typing.gif": "dac55fd0c0dd5cbe7a836d6274e681e8",
"assets/assets/images/user.png": "6df52dbed927bd0aaf69acff9bceca2e",
"assets/assets/images/user_2.png": "0e9d994cb978f42e0a0650a5250ceb2b",
"assets/assets/images/user_3.png": "8dda4296c0899dd96bc2d82575153a48",
"assets/assets/images/user_4.png": "c304cb8b5c1cb900d12fa6f82044190d",
"assets/assets/images/user_5.png": "651eb688203f08d0808d979a170b72c4",
"assets/assets/images/Video%2520Place%2520Here.png": "2bae4756fc9354578eb137136679941e",
"assets/assets/images/welcome_image.png": "a25c0a6256da990a8694c383800fc1bb",
"assets/FontManifest.json": "e2aa40d43b337ee1263b0043db1af5a1",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/NOTICES": "677c8624feb2a3994881a05845d3e727",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/eva_icons_flutter/lib/fonts/evaicons.ttf": "b600c99b39c9837f405131463e91f61a",
"assets/packages/fluttertoast/assets/toastify.css": "a85675050054f179444bc5ad70ffc635",
"assets/packages/fluttertoast/assets/toastify.js": "e7006a0a033d834ef9414d48db3be6fc",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "00bb2b684be61e89d1bc7d75dee30b58",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "4b6a9b7c20913279a3ad3dd9c96e155b",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "dffd9504fcb1894620fa41c700172994",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "f17abb84e2765dc24cf6fe045ad8e8b0",
"/": "f17abb84e2765dc24cf6fe045ad8e8b0",
"main.dart.js": "b03aeba9432324e666840994776dd301",
"manifest.json": "4ea118ce32849d0df500d5bc90c2f884",
"version.json": "98be9f415f081edeacc2955855a22214"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
