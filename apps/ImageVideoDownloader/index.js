function keypressed(e) {
    // Proxy URL to by pass cors issue.
    // Use the following or you can clone https://github.com/Rob--W/cors-anywhere and run it locally.
    const PROXY= 'https://safe-sands-53504.herokuapp.com/';
    // const PROXY= 'http://localhost:8080/';

    // Selector for Image/Video.
    const IMAGE_ELEMENT_SELECTOR = 'img.fullscreen-view__media';
    const VIDEO_ELEMENT_SELECTOR = 'video.vertical-view__media, video.fullscreen-view__media';

    // Selector for left & right navigation.
    const LEFT_BTN_SELECTOR = '.prev-btn';
    const RIGHT_BTN_SELECTOR = '.next-btn';

    // Image navigation
    const prev = document.querySelector(LEFT_BTN_SELECTOR);
    const next = document.querySelector(RIGHT_BTN_SELECTOR);

    // Image download function
    const downloadAssets = () => {
        const images = document.querySelectorAll(IMAGE_ELEMENT_SELECTOR);
        const videos = document.querySelectorAll(VIDEO_ELEMENT_SELECTOR);


        // When used with gallery/slider, we only want to download currently viewing image/video.
        function isElementVisible(el) {
            const rect = el.getBoundingClientRect();
            return rect.bottom > 0 &&
                rect.right > 0 &&
                rect.left < (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */ &&
                rect.top < (window.innerHeight || document.documentElement.clientHeight) /* or $(window).height() */;
        }

        // Pick only element that is visible.
        const image = Array.from(images).find(elm => isElementVisible(elm));
        const video = Array.from(videos).find(elm => isElementVisible(elm));


        if (image||video) {
            console.log('Assets source Element found.');
            const assetUrl = image ? image.src : video.currentSrc;
            const assetFileName = assetUrl.split('/').pop();

            let assetPlaceholder = document.querySelector('.asset-placeholder-x');
            if (!assetPlaceholder) {
                // Generate placeholder
                assetPlaceholder = document.createElement('a');
                assetPlaceholder.classList.add('asset-placeholder-x');
                document.body.appendChild(assetPlaceholder);
            }

            console.log('Starting to fetch assets.');
            // Manually set url to a blob as download attribute on cors is disabled.
            fetch(`${PROXY}${assetUrl}`, {headers: new Headers({'Origin': location.origin}), mode: 'cors'})
                .then(response => response.blob())
                .then(blob => {
                    assetPlaceholder.href = window.URL.createObjectURL(blob);
                    assetPlaceholder.download = assetFileName;
                    assetPlaceholder.click();
                })
                .catch(e => console.error(e));
        } else {
            console.log('Missing asset format.');
        }
    };

    //Key action logic
    if (e.keyCode == '39') {
        next.click(); //Right
    } else if (e.keyCode == '37') {
        prev.click(); //Left
    } else if (e.keyCode == '40') {
        downloadAssets(); //Arrow down
    }
}
window.onkeydown = keypressed;