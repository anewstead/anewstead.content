//----------------------------------------------------------------------
//variables

var startTime;
var bannerWidth = 300;
var bannerHeight = 600;
var currentPage = '#banner';
var ineractionTimeout = 10;

//hotspot circle radius
var hsRad = {
    r1: 8,
    r2: 12,
    r3: 19,
    r4: 30
};

var autoRippleTL = null;
var userHasMousedOverHS = false;

//----------------------------------------------------------------------
/*
getElementById wrapper to save bytes (& typing)
*/
function _id(idString) {
    var id = idString;
    if (idString.charAt(0) == '#') {
        id = idString.substring(1); //remove #
    }
    return document.getElementById(id);
}

//init called when everything is loaded and ready to go
function customBannerInit() {
    addHotspots();
    addListeners();
    initAnimation();
}

//start called when banner visible (after init)
function customBannerStart() {
    _id('loading_state').style.display = 'none';
    _id('main_content').style.visibility = 'visible';
    //small delay just so the eye has time to settle before starting animation
    setTimeout(startAnimation, 250);
}




//----------------------------------------------------------------------
//event listeners
function addListeners() {
    _id('default_exit').addEventListener('click', default_click, false);
    _id('cta_exit').addEventListener('click', cta_click, false);
    _id('back_btn').addEventListener('click', back_click, false);

    _id('hs1_btn').addEventListener('click', hs1_click, false);
    _id('hs2_btn').addEventListener('click', hs2_click, false);
    _id('hs3_btn').addEventListener('click', hs3_click, false);

    _id('hs1_btn').addEventListener('mouseover', hs_over, false);
    _id('hs2_btn').addEventListener('mouseover', hs_over, false);
    _id('hs3_btn').addEventListener('mouseover', hs_over, false);

    _id('hs1_btn').addEventListener('mouseout', hs_out, false);
    _id('hs2_btn').addEventListener('mouseout', hs_out, false);
    _id('hs3_btn').addEventListener('mouseout', hs_out, false);
}




//----------------------------------------------------------------------
//event handlers
function default_click(event) {
    switch (currentPage) {
        case "#f2":
            Enabler.exit('default_exit-page1');
            break;
        case "#f3":
            Enabler.exit('default_exit-page2');
            break;
        case "#f4":
            Enabler.exit('default_exit-page3');
            break;
        default:
            Enabler.exit('default_exit');
            break;
    }
}

function cta_click(event) {
    Enabler.exit('cta_exit');
}

function back_click(event) {
    backToBanner();
}



function hs1_click(event) {
    showPage('#f2');
}

function hs2_click(event) {
    showPage('#f3');
}

function hs3_click(event) {
    showPage('#f4');
}


function hs_over(event) {
    userHasMousedOverHS = true;
    var hs = null;
    switch (event.target.getAttribute('id')) {
        case "hs1_btn":
            hs = "#hs1";
            break;
        case "hs2_btn":
            hs = "#hs2";
            break;
        case "hs3_btn":
            hs = "#hs3";
            break;
    }
    if (hs) {
        if (autoRippleTL) {
            autoRippleTL.kill();
            TweenMax.killDelayedCallsTo(rippleHotspot);
            TweenMax.killChildTweensOf(['#hs1','#hs2','#hs3'], true);
        }
        TweenMax.to(hs, 0.3, {
            scale: 1.2,
            ease: Back.easeOut.config(2)
        });
    }
}

function hs_out(event) {
    var hs = null;
    switch (event.target.getAttribute('id')) {
        case "hs1_btn":
            hs = "#hs1";
            break;
        case "hs2_btn":
            hs = "#hs2";
            break;
        case "hs3_btn":
            hs = "#hs3";
            break;
    }
    if (hs) {
        TweenMax.to(hs, 0.2, {
            scale: 1,
            ease: Back.easeOut.config(2)
        });
    }
}



//----------------------------------------------------------------------
//hotspots

function addHotspots() {
    var svg = '<svg height="100" width="100">';
    //hotspotSVG += '<rect width="100" height="100" stroke="#00FF00" stroke-width="1" fill="none" />';
    svg += '<circle class="line1" cx="50%" cy="50%" r="0.1" stroke="#FFFFFF" fill="none" />';
    svg += '<circle class="line2" cx="50%" cy="50%" r="0.1" stroke="#FFFFFF" fill="none" />';
    svg += '<circle class="disc1" cx="50%" cy="50%" r="0.1" fill="#FFFFFF" />';
    svg += '<circle class="disc2" cx="50%" cy="50%" r="0.1" fill="#FFFFFF" />';
    svg += '</svg>';

    var hs = document.querySelectorAll('.hotspot');
    for (var i = 0; i < hs.length; ++i) {
        hs[i].innerHTML = svg;
    }
}

function showHotspot(hotspotDivID) {
    var div = document.querySelector(hotspotDivID);
    var svg = div.querySelector('svg');
    var disc1 = svg.querySelector('.disc1');
    var disc2 = svg.querySelector('.disc2');
    var line1 = svg.querySelector('.line1');
    var line2 = svg.querySelector('.line2');

    TweenMax.set(div, {
        autoAlpha: 1
    })

    var tl = new TimelineMax({});
    tl.timeScale(1);

    //disc1
    tl.add(TweenMax.to(disc1, 0.001, {
        alpha: 1
    }), 0);
    tl.add(TweenMax.to(disc1, 0.6, {
        attr: {
            r: hsRad.r1
        },
        ease: Back.easeOut.config(2)
    }), 0);

    //disc2
    tl.add(TweenMax.to(disc2, 0.001, {
        alpha: 0.6
    }), 0);
    tl.add(TweenMax.to(disc2, 0.6, {
        attr: {
            r: hsRad.r2
        },
        ease: Back.easeOut.config(2)
    }), 0);

    //line1
    tl.add(TweenMax.to(line1, 0.001, {
        attr: {
            'stroke-width': 1.5
        },
        alpha: 0.4
    }), 0);
    tl.add(TweenMax.to(line1, 0.7, {
        attr: {
            r: hsRad.r3
        },
        alpha: 0.8,
        ease: Back.easeOut.config(2)
    }), 0.1);

    //line2
    tl.add(TweenMax.to(line2, 0.001, {
        attr: {
            r: hsRad.r3,
            'stroke-width': 1.5
        },
        alpha: 0.4
    }), '-=0.41');
    tl.add(TweenMax.to(line2, 0.6, {
        attr: {
            r: hsRad.r4,
            'stroke-width': 8
        },
        alpha: 0,
        ease: Power0.easeOut,
    }), '-=0.4');
}

function rippleHotspot(hotspotDivID) {
    var div = document.querySelector(hotspotDivID);
    var svg = div.querySelector('svg');
    var disc1 = svg.querySelector('.disc1');
    var disc2 = svg.querySelector('.disc2');
    var line1 = svg.querySelector('.line1');
    var line2 = svg.querySelector('.line2');

    var tl = new TimelineMax({});
    tl.timeScale(1);

    tl.add(TweenMax.to(line1, 0.3, {
        attr: {
            r: hsRad.r2
        },
        ease: Power0.easeIn,
    }));
    tl.add(TweenMax.to(line1, 0.7, {
        attr: {
            r: hsRad.r3
        },
        alpha: 0.8,
        ease: Back.easeOut.config(2)
    }));

    //same as in showHotspot()
    tl.add(TweenMax.to(line2, 0.001, {
        attr: {
            r: hsRad.r3,
            'stroke-width': 1.5
        },
        alpha: 0.4
    }), '-=0.41');
    tl.add(TweenMax.to(line2, 0.6, {
        attr: {
            r: hsRad.r4,
            'stroke-width': 8
        },
        alpha: 0,
        ease: Power0.easeOut,
    }), '-=0.4');
}



//----------------------------------------------------------------------
//interaction - swap pages

function showPage(pageID) {
    TweenMax.killAll();
    disableButtons();
    TweenMax.to([pageID, '#banner'], 0.5, {
        x: ('-=' + bannerWidth),
        onComplete: enablePageButtons
    });
    currentPage = pageID;
}

function backToBanner() {
    ensureBannerOnLastFrame();
    disableButtons();
    TweenMax.to([currentPage, '#banner'], 0.5, {
        x: ('+=' + bannerWidth),
        onComplete: enableBannerButtons
    });
    currentPage = '#banner';
}

function disableButtons() {
    TweenMax.set(['#hs1_btn', '#hs2_btn', '#hs3_btn', '#cta_exit', '#back_btn'], {
        autoAlpha: 0
    });
}

function enablePageButtons() {
    TweenMax.set(['#hs1_btn', '#hs2_btn', '#hs3_btn', '#cta_exit'], {
        autoAlpha: 0
    });
    TweenMax.set(['#back_btn'], {
        autoAlpha: 1
    });
    //because we killed all tweens, make sure hotspots get back to end state
    rippleHotspot('#hs1');
    rippleHotspot('#hs2');
    rippleHotspot('#hs3');
}

function enableBannerButtons() {
    TweenMax.set(['#hs1_btn', '#hs2_btn', '#hs3_btn', '#cta_exit'], {
        autoAlpha: 1
    });
    TweenMax.set(['#back_btn'], {
        autoAlpha: 0
    });
}

function enableHotspotButtons() {
    TweenMax.set(['#hs1_btn', '#hs2_btn', '#hs3_btn'], {
        autoAlpha: 1
    });
}

function ensureBannerOnLastFrame() {
    TweenMax.set(['#intro_text1', '#f1_text2'], {
        autoAlpha: 0
    });
    TweenMax.set(['#f1_text1', '#f1_text3', '#cta'], {
        autoAlpha: 1
    });
}







//----------------------------------------------------------------------
//Animation start positions
function initAnimation() {

    disableButtons();

    TweenMax.defaultEase = Power1.easeInOut;

    var hideAtStart = [
        '#siemens_logo',
        '#intro_image1',
        '#intro_text1',
        '#f1_text1',
        '#f1_text2',
        '#f1_text3',
        '#cta',
        '#hs1',
        '#hs2',
        '#hs3'
    ];

    TweenMax.set(hideAtStart, {
        autoAlpha: 0
    });

    TweenMax.set(['#f2', '#f3', '#f4'], {
        x: bannerWidth
    });

    /*if css.retina remember that class scales 0.5 to begin with*/
    TweenMax.set(['#intro_image1'], {
        scale: 0.4,
    });

}






//----------------------------------------------------------------------
function startAnimation() {
    startTime = new Date();
    banner_p1();
}

//call this at the end of animation sequence
function endAnimation() {
    var endTime = new Date()
    console.log('Animation duration: ' + ((endTime - startTime) / 1000) + ' seconds');
}

function banner_p1() {
    var tl = new TimelineMax({});
    tl.add(TweenMax.to('#intro_image1', 0.5, {
        scale: 0.5,
        autoAlpha: 1
    }));
    tl.add(TweenMax.to('#siemens_logo', 0.5, {
        autoAlpha: 1
    }), 0);
    tl.add(TweenMax.to('#intro_text1', 0.5, {
        autoAlpha: 1
    }));
    tl.add(TweenMax.delayedCall(0, showHotspot, ['#hs1']));
    tl.add(TweenMax.delayedCall(0.4, showHotspot, ['#hs2']));
    tl.add(TweenMax.delayedCall(0.4, showHotspot, ['#hs3']));
    tl.add(TweenMax.delayedCall(0, enableHotspotButtons));
    tl.add(TweenMax.delayedCall(0.8, banner_p1_complete)); //allow time for last hotspot reveal
}

function banner_p1_complete() {
    TweenMax.delayedCall(2, banner_p2);
}

function banner_p2() {
    var tl = new TimelineMax({
        onComplete: banner_p2_complete
    });
    tl.add(TweenMax.to('#intro_text1', 0.5, {
        autoAlpha: 0
    }));
    tl.add(TweenMax.to('#f1_text1', 0.5, {
        autoAlpha: 1
    }));
    tl.add(TweenMax.to('#f1_text2', 0.5, {
        autoAlpha: 1
    }), '-=0.1');
    tl.add(TweenMax.to('#f1_text3', 0.5, {
        autoAlpha: 1
    }), '-=0.1');
}

function banner_p2_complete() {
    if (!userHasMousedOverHS) {
        //loop hotspot ripples
        autoRippleTL = new TimelineMax({
            repeat: 3,
            repeatDelay: 3,
            onComplete: endAnimation /*logs duration*/
        });
        autoRippleTL.add(TweenMax.delayedCall(0, rippleHotspot, ['#hs1']));
        autoRippleTL.add(TweenMax.delayedCall(0.4, rippleHotspot, ['#hs2']));
        autoRippleTL.add(TweenMax.delayedCall(0.4, rippleHotspot, ['#hs3']));
    }
    TweenMax.delayedCall(ineractionTimeout, banner_p3);
}

function banner_p3() {
    var tl = new TimelineMax({
        onComplete: banner_p3_complete
    });
    tl.add(TweenMax.to('#f1_text2', 0.5, {
        autoAlpha: 0
    }));
    tl.add(TweenMax.to('#cta', 0.5, {
        autoAlpha: 1
    }));
    tl.add(TweenMax.to('#cta_exit', 0.1, {
        autoAlpha: 1
    }));
}

function banner_p3_complete() {
    endAnimation(); /*logs duration*/
}
