//----------------------------------------------------
//LOADING FUNCTIONS
//----------------------------------------------------
//loads images after pageload complete and calls callback
//only call after page has loaded
//html: instead of <img src="url"> use <img polite-src="url">
//usage: loadPoliteImages(mycallbackFunc);
function loadPoliteImages(callback) {
    var politeImages = document.querySelectorAll("img[polite-src]");
    var l = politeImages.length;
    if (l < 1) {
        if (callback) callback();
        return;
    }
    var loaded = 0;
    var checkProgress = function (event) {
        if (event.type == "error") {
            console.log("File not found: " + event.target.getAttribute('src'));
        }
        if (++loaded === l && callback) {
            callback();
        }
    }
    for (var i = 0; i < l; i++) {
        var img = politeImages[i];
        img.addEventListener("load", function (event) {
            checkProgress(event);
        }, false);
        img.addEventListener("error", function (event) {
            checkProgress(event);
        }, false);
        img.setAttribute("src", img.getAttribute("polite-src"));
        img.removeAttribute("polite-src");
    }
}
//----------------------------------------------------
//END LOADING FUNCTIONS
//----------------------------------------------------


//----------------------------------------------------
//DOUBLECLICK INIT
//----------------------------------------------------
//check Enabler initialized
function checkEnablerInit() {
    if (Enabler.isInitialized()) {
        checkPageLoaded();
    } else {
        Enabler.addEventListener(studio.events.StudioEvent.INIT, checkPageLoaded);
    }
}
//check html page loaded
function checkPageLoaded() {
    if (Enabler.isPageLoaded()) {
        checkPoliteImages();
    } else {
        Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, checkPoliteImages);
    }
}
//check if HTML has polite images to load
function checkPoliteImages() {
    loadPoliteImages(checkBannerVisible);
}
//init banner and show when visible
function checkBannerVisible() {
    customBannerInit();
    if (Enabler.isVisible()) {
        customBannerStart();
    } else {
        Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, customBannerStart);
    }
}
//DEAULT PAGE ONLOAD HANDLER
window.addEventListener('load', checkEnablerInit);
//----------------------------------------------------
//END DOUBLECICK INIT
//----------------------------------------------------
