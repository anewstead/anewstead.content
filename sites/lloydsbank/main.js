function _id(a){var b=a;return"#"==a.charAt(0)&&(b=a.substring(1)),document.getElementById(b)}function loadImageObjectArray(a,b){var c=a,d=c.length;if(d<1)return console.log("loadImageObjectArray: no images to load"),void(b&&b());for(var e=0,f=0;f<d;f++){var g=c[f].url,h=c[f].toID;"#"==h.charAt(0)&&(h=c[f].toID.substring(1));var i=c[f].classes,j=function(){++e===d&&b&&b()},k=new Image;k.onload=function(){this.parentElement.style.width=this.getBoundingClientRect().width+"px",this.parentElement.style.height=this.getBoundingClientRect().height+"px",j()},k.onerror=function(){console.log("loadImageObjectArray: File not found: "+this.src),j()},i&&""!=i&&k.setAttribute("class",i),h&&""!=h&&(document.getElementById(h)?document.getElementById(h).appendChild(k):console.log("loadImageObjectArray: container element not found: #"+h)),k.setAttribute("src",g)}}function init(){loadImageObjectArray(imageObjectsToLoad,init2)}function init2(){addListeners(),initAnimation(),_id("#loading_state").style.display="none",_id("#main_content").style.visibility="visible",setTimeout(startAnimation,333)}function addListeners(){_id("#default_exit").addEventListener("click",default_click,!1)}function default_click(a){console.log("clickTag: "+clickTag),window.open(clickTag,"_blank")}function startAnimation(){startTime=new Date,showf1()}function endAnimation(){var a=new Date;console.log("Animation duration: "+(a-startTime)/1e3+" seconds")}function initAnimation(){_id("f1_text1").innerHTML="Kids will",_id("f1_text2").innerHTML="be kids",_id("f2_text1").innerHTML="Choose your level<br/>of accidental<br/>damage cover",_id("f2_text2").innerHTML="Terms, conditions and exclusions apply",_id("f3_text1").innerHTML="Look after what matters<br/>with Lloyds Bank<br/>home insurance",TweenMax.defaultEase=Power1.easeInOut;var a=["#main_content","#cta","#f1_text1","#f1_text2","#f2_text1","#f2_text2","#f3_text1"],b=["#f1_text1","#f1_text2","#f2_text1","#f2_text2","#f3_text1"];TweenMax.set(a,{autoAlpha:0}),TweenMax.set(b,{z:.1,rotationZ:.01,force3D:!0}),TweenMax.set("#f1_text1",{x:30,y:10}),TweenMax.set("#f1_text2",{x:124,y:47}),TweenMax.set("#f2_text1",{x:25,y:20}),TweenMax.set("#f2_text2",{x:25,y:198}),TweenMax.set("#f3_text1",{x:25,y:20}),TweenMax.set("#cta",{x:25,y:110})}function showf1(){var a=new TimelineMax({onComplete:showf1complete});a.add(TweenMax.to("#main_content",1,{autoAlpha:1})),a.add(TweenMax.to("#f1_text1",1,{autoAlpha:1}),1),a.add(TweenMax.to("#f1_text1",3,{x:"+=20"}),1),a.add(TweenMax.to("#f1_text2",1,{autoAlpha:1}),2),a.add(TweenMax.to("#f1_text2",3,{x:"-=20"}),2)}function showf1complete(){TweenMax.delayedCall(3,hidef1)}function hidef1(){var a=new TimelineMax({onComplete:hidef1complete});a.add(TweenMax.to(["#f1_text1","#f1_text2"],1,{autoAlpha:0}))}function hidef1complete(){showf2()}function showf2(){var a=new TimelineMax({onComplete:showf2complete});a.add(TweenMax.to("#overlay",.8,{left:0})),a.add(TweenMax.to("#overlay img",.8,{left:0}),"-=0.8"),a.add(TweenMax.to("#f2_text1",1,{autoAlpha:1})),a.add(TweenMax.to("#f2_text2",1,{autoAlpha:1}),"-=0.5")}function showf2complete(){TweenMax.delayedCall(5,hidef2)}function hidef2(){var a=new TimelineMax({onComplete:hidef2complete});a.add(TweenMax.to(["#f2_text1","#f2_text2"],1,{autoAlpha:0}))}function hidef2complete(){showf3()}function showf3(){var a=new TimelineMax({onComplete:showf3complete});a.add(TweenMax.to("#f3_text1",1,{autoAlpha:1})),a.add(TweenMax.to("#cta",1,{autoAlpha:1}),"-=0.5")}function showf3complete(){endAnimation()}var startTime,bg={url:"bg.jpg",toID:"#bg",classes:"retina"},overlay={url:"overlay.jpg",toID:"#overlay",classes:"retina"},frame={url:"frame.png",toID:"#frame",classes:"retina"},logo={url:"logo.png",toID:"#logo",classes:"retina"},cta={url:"cta.png",toID:"#cta",classes:"retina"},imageObjectsToLoad=[bg,overlay,frame,logo,cta];