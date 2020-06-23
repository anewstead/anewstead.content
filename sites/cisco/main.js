/*
==============================================================
global.js
==============================================================
*/

//----------------------------------------------------------------------
//LIBRARY FUNCTIONS

/*
jquery style accessor function
*/
window.$ = function (e, t, l) {
  var n = {
      "#": "getElementById",
      ".": "getElementsByClassName",
      "@": "getElementsByName",
      "=": "getElementsByTagName",
      "*": "querySelectorAll",
    }[e[0]],
    m = (t === l ? document : t)[n](e.slice(1));
  return m.length < 2 ? m[0] : m;
};
window.Element.prototype.find = function (selector) {
  return $(selector, this);
};

/*
loads an array of image objects into existing div/container adding class attribute
objArray = [{url:'img.jpg',toID:'#existingDivInHTML',classes:'css classes'},{...}];
callback function on complete
*/
function loadImageObjectArray(objArray, callback) {
  var loaded = 0;
  var items = objArray;
  var l = items.length;

  if (l < 1) {
    console.log("loadImageObjectArray: no images to load");
    if (callback) callback();
    return;
  }

  var checkProgress = function () {
    if (++loaded === l && callback) {
      callback();
    }
  };

  var img_onload = function () {
    //set container dimentions to image dimentions (getBoundingClientRect works if img scale css transformed)
    this.parentElement.style.width = this.getBoundingClientRect().width + "px";
    this.parentElement.style.height =
      this.getBoundingClientRect().height + "px";
    checkProgress();
  };
  var img_onerror = function () {
    console.log("loadImageObjectArray: File not found: " + this.src);
    checkProgress();
  };

  for (var i = 0; i < l; i++) {
    var url = items[i].url;
    var id = items[i].toID;
    if (id.charAt(0) == "#") {
      id = items[i].toID.substring(1);
    }
    var cls = items[i].classes;

    var img = new Image();
    img.onload = img_onload;
    img.onerror = img_onerror;

    if (cls && cls !== "") {
      img.setAttribute("class", cls);
    }
    if (id && id !== "") {
      if (document.getElementById(id)) {
        document.getElementById(id).appendChild(img);
      } else {
        console.log(
          "loadImageObjectArray: container element not found: #" + id
        );
      }
    }
    img.setAttribute("src", url);
  }
}

//----------------------------------------------------------------------
//variables

var startTime;

//----------------------------------------------------------------------
//preload image sequences
//see banner main.js for arrays
function init() {
  loadImageObjectArray(imageObjectsToLoad, setup);
}

//only call when everything is loaded
function setup() {
  addListeners();

  initAnimation(); //see banner main.js

  $("#loading_state").style.display = "none";
  $("#main_content").style.visibility = "visible";

  //small delay just so the eye has time to settle before starting animation
  setTimeout(startAnimation, 333);
}

//----------------------------------------------------------------------
//event listeners
function addListeners() {
  $("#default_exit").addEventListener("click", default_click, false);
  $("#default_exit").addEventListener("mouseover", default_over, false);
  $("#default_exit").addEventListener("mouseout", default_out, false);
}

//----------------------------------------------------------------------
//event handlers
function default_click(event) {
  console.log("clickTag: " + clickTag);
  window.open(clickTag, "_blank");
}
function default_over(event) {
  $("#cta_blue").style.visibility = "hidden";
  $("#cta_white").style.visibility = "visible";
  TweenMax.to("#cta", 0.2, {
    scale: 1.1,
  });
}
function default_out(event) {
  $("#cta_blue").style.visibility = "visible";
  $("#cta_white").style.visibility = "hidden";
  TweenMax.to("#cta", 0.2, {
    scale: 1,
  });
}

//----------------------------------------------------------------------

//----------------------------------------------------------------------
function startAnimation() {
  startTime = new Date();
  showf1(); //see banner main.js
}

//remember to call this at the end of animation sequence
function endAnimation() {
  var endTime = new Date();
  console.log(
    "Animation duration: " + (endTime - startTime) / 1000 + " seconds"
  );
}

/*
==============================================================
end global.js
==============================================================
*/

/*
==============================================================
banner.js
==============================================================
*/

//----------------------------------------------------------------------
//variables

/*
static images loaded via JS into a specific container div.
optionally add css classes
*/

var background = {
  url: "background.jpg",
  toID: "#background",
  classes: "retina",
};
var helicopter = {
  url: "helicopter.png",
  toID: "#helicopter",
  classes: "retina",
};

var cta_blue = {
  url: "cta_blue.png",
  toID: "#cta_blue",
  classes: "retina",
};
var cta_white = {
  url: "cta_white.png",
  toID: "#cta_white",
  classes: "retina",
};

var f1Text1 = {
  url: "copy_1_a.png",
  toID: "#copy_1_a",
  classes: "retina copy",
};
var f1Text2 = {
  url: "copy_1_b.png",
  toID: "#copy_1_b",
  classes: "retina copy",
};
var f1Text3 = {
  url: "copy_1_c.png",
  toID: "#copy_1_c",
  classes: "retina copy",
};
var f1Text4 = {
  url: "copy_1_d.png",
  toID: "#copy_1_d",
  classes: "retina copy",
};
var f1Text5 = {
  url: "copy_1_e.png",
  toID: "#copy_1_e",
  classes: "retina copy",
};

var f2Text1 = {
  url: "copy_2_a.png",
  toID: "#copy_2_a",
  classes: "retina copy",
};
var f2Text2 = {
  url: "copy_2_b.png",
  toID: "#copy_2_b",
  classes: "retina copy",
};
var f2Text3 = {
  url: "copy_2_c.png",
  toID: "#copy_2_c",
  classes: "retina copy",
};
var f2Text4 = {
  url: "copy_2_d.png",
  toID: "#copy_2_d",
  classes: "retina copy",
};
var f2Text5 = {
  url: "copy_2_e.png",
  toID: "#copy_2_e",
  classes: "retina copy",
};

var f3Text1 = {
  url: "copy_tagline_a.png",
  toID: "#copy_tagline_a",
  classes: "retina copy",
};
var f3Text2 = {
  url: "copy_tagline_b.png",
  toID: "#copy_tagline_b",
  classes: "retina copy",
};
var f3Text3 = {
  url: "copy_tagline_c.png",
  toID: "#copy_tagline_c",
  classes: "retina copy",
};
var f3Text4 = {
  url: "copy_tagline_d.png",
  toID: "#copy_tagline_d",
  classes: "retina copy",
};
var f3Text5 = {
  url: "copy_end.png",
  toID: "#copy_end",
  classes: "retina",
};

var imageObjectsToLoad = [
  background,
  helicopter,
  cta_blue,
  cta_white,
  f1Text1,
  f1Text2,
  f1Text3,
  f1Text4,
  f1Text5,
  f2Text1,
  f2Text2,
  f2Text3,
  f2Text4,
  f2Text5,
  f3Text1,
  f3Text2,
  f3Text3,
  f3Text4,
  f3Text5,
];

/*
tweenmax param to try to smooth juddering animation (not for SVG in safari)
z: 0.1,
rotationZ: 0.01,
force3D:true // true=always GPU false=always CPU, default=CPU when static GPU only during tween

TweenMax.set('#roundelLeft', {left:'-120px', top:'67px', transformOrigin:'50% 50%' });
TweenMax.set([img1,img2], {x:5, y:5, alpha:0.7});
*/

//----------------------------------------------------------------------
//called from common.js
//set start state, i.e. before animation begins
function initAnimation() {
  //set cta rollover
  default_out(null);

  TweenMax.set(["#cta", "#copy_end"], {
    opacity: 0,
  });

  TweenMax.set(".copy", {
    opacity: 0,
    y: 30,
  });

  TweenMax.set("#helicopter", {
    x: 310,
    y: 140,
  });

  TweenMax.set("#background", {
    y: -($("#background").getBoundingClientRect().height - 250),
  });
}

//----------------------------------------------------------------------
//START FRAME
//called from common.js

function showf1() {
  TweenMax.to("#background", 8, {
    y: 0,
    ease: Power1.easeInOut,
  });
  TweenMax.to("#helicopter", 3.5, {
    x: -40,
    y: 120,
    delay: 2,
    ease: Power1.easeIn,
    onComplete: fliphelicopter,
  });
  TweenMax.staggerTo(
    $("#frame_1").find(".copy"),
    1,
    {
      y: 0,
      opacity: 1,
      ease: Expo.easeOut,
      delay: 3,
      onComplete: showf1complete,
    },
    0.2
  );
}

function showf1complete() {
  TweenMax.delayedCall(2, hidef1);
}

function fliphelicopter() {
  TweenMax.set("#helicopter", {
    rotationY: 180,
  });
}

function hidef1() {
  TweenMax.staggerTo(
    $("#frame_1").find(".copy"),
    0.5,
    {
      y: -50,
      opacity: 0,
      ease: Expo.easeOut,
      onComplete: hidef1complete,
    },
    0.2
  );
  TweenMax.to("#helicopter", 9, {
    x: 310,
    y: 80,
    scale: 0.45,
    ease: Power1.easeOut,
  });
}

function hidef1complete() {
  showf2();
}

//------------------------------
//FRAME2

function showf2() {
  TweenMax.staggerTo(
    $("#frame_2").find(".copy"),
    1,
    {
      y: 0,
      opacity: 1,
      ease: Expo.easeOut,
      onComplete: showf2complete,
    },
    0.2
  );
}

function showf2complete() {
  TweenMax.delayedCall(2, hidef2);
}

function hidef2() {
  TweenMax.staggerTo(
    $("#frame_2").find(".copy"),
    0.5,
    {
      y: -50,
      opacity: 0,
      ease: Expo.easeOut,
      onComplete: hidef2complete,
    },
    0.2
  );
}

function hidef2complete() {
  showEnd();
}

//------------------------------
//END FRAME

function showEnd() {
  var tl = new TimelineMax({});
  tl.add(
    TweenMax.staggerTo(
      $("#frame_end").find(".copy"),
      1,
      {
        y: 0,
        opacity: 1,
        ease: Expo.easeOut,
      },
      0.2
    )
  );
  tl.add(
    TweenMax.to(["#copy_end", "#cta"], 0.5, {
      autoAlpha: 1,
      onComplete: showEndcomplete,
    }),
    "-=0.5"
  );
}

function showEndcomplete() {
  //log banner duration
  endAnimation();
}

/*
==============================================================
end banner.js
==============================================================
*/
