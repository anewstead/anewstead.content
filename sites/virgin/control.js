//common virgin assets
var container, content, logo, bgExit, legalbut, legals, legaltxt, legaloffset;

//text images
var headlineFrame1, headlineFrame2, headline1Frame3, headline2Frame3, headline3Frame3, headlineEndframe, sublineEndframe, cta;

var delay;

//Function to run with any animations starting on load, or bringing in images etc
var init = function(){
	//Assign All the elements to the element on the page

	logo = document.getElementById('logo');
	container = document.getElementById('container_dc');
	content = document.getElementById('content_dc');
	bgExit = document.getElementById('background_exit_dc');
	legalbut = document.getElementById('legalbut');
	legals = document.getElementById('legals');
	legaltxt = document.getElementById('legaltxt');
	//container.style.display = "none";
	//Bring in listeners i.e. if a user clicks or rollovers
	addListeners();

	//Call Dynamic
	getDynamic();
	//displayContent();
    container.style.display = "block";
}

//Add Event Listeners
var addListeners = function() {
	bgExit.addEventListener('click', bgExitHandler, false);
	legalbut.addEventListener("click", showLegals);
	legals.addEventListener("click", hideLegals);
}

var bgExitHandler = function(e) {
	Enabler.exit('HTML5_Background_Clickthrough');
}

//legal overlay hide/show functions
var showLegals = function(){
	if(legals.classList.contains("visible")){
		var legaloffset = legals.clientHeight+2;
		legals.style.bottom = "-" + legaloffset + "px";
		legals.classList.remove("visible");
	}
	else{
		legals.style.bottom = "0px";
		legals.classList.add("visible");
	}

}
var hideLegals = function(){
	var legaloffset = legals.clientHeight+2;
	legals.style.bottom = "-" + legaloffset + "px";
	legals.classList.remove("visible");
}

var displayContent = function(){
	startAnimation();
	container.style.opacity = "1";
}

var getDynamic = function(){

	Enabler.setProfileId(1065810);
    var devDynamicContent = {};

    devDynamicContent.dec_acq_jan_sony_m4_and_free_tablet_data= [{}];
    devDynamicContent.dec_acq_jan_sony_m4_and_free_tablet_data[0]._id = 0;
    devDynamicContent.dec_acq_jan_sony_m4_and_free_tablet_data[0].LegalText = "Price based on a 24 month consumer credit agreement (CCA). Offer available while stocks lasts. You must pay off your loan in full in order to upgrade your handset. 0% APR representative.  Based on a 24 month CCA with Virgin Media Mobile Finance Limited (VMMFL) for the phone and a 30-day rolling Pay Monthly Airtime Contract with Virgin Mobile Telecoms Limited. Credit subject to status, credit check and payment by Direct Debit. 18+. Terms and conditions apply. VMMFL is authorised and regulated by the Financial Conduct Authority under register no. 626215. Registered office: Media House, Bartley Wood Business Park, Hook, Hampshire, RG27 9UP. Registered in England and Wales no. 09058868.";
    Enabler.setDevDynamicContent(devDynamicContent);


	// Enabler.setProfileId(1065431);
 //    var devDynamicContent = {};

 //    devDynamicContent.NOV_ACQ_Mobile_retargeting_Award_057742_data= [{}];
 //    devDynamicContent.NOV_ACQ_Mobile_retargeting_Award_057742_data[0]._id = 0;
 //    devDynamicContent.NOV_ACQ_Mobile_retargeting_Award_057742_data[0].LegalText = "Price based on a 24 month consumer credit agreement (CCA). You must pay off your loan in full in order to upgrade your handset. 0% APR representative.  Based on a 24 month CCA with Virgin Media Mobile Finance Limited (VMMFL) for the phone and a 30-day rolling Pay Monthly Airtime Contract with Virgin Mobile Telecoms Limited. Credit subject to status, credit check and payment by Direct Debit. 18+. Terms and conditions apply. VMMFL is authorised and regulated by the Financial Conduct Authority under register no. 626215. Registered office: Media House, Bartley Wood Business Park, Hook, Hampshire, RG27 9UP. Registered in England and Wales no. 09058868. Free Android tablet offer: Offer available while stocks lasts. Free Android tablet available when purchasing a Sony Xperia M4 Aqua on a Freestyle Pay Monthly tariff.  If the handset and tariff order is cancelled or exchanged the tablet must be returned in an unused condition along with its original packaging and all accessories. If the tablet is damaged on return or you fail to return all the parts and accessories, we reserve the right to charge you for repair or replacement costs.";
 //    Enabler.setDevDynamicContent(devDynamicContent);

	setDynamic(dynamicContent.dec_acq_jan_sony_m4_and_free_tablet_data[0]);
}

// update the dynamic elements with the 'now loaded' data //
var setDynamic = function(dObj){
	legaltxt.innerHTML = dObj.LegalText;
	displayContent();
}

var startAnimation = function(){
	//TweenMax.set("#headlineFrame1", {/**/x:113, y:85, transformOrigin:"0 0" });
	TweenMax.set("#textMask", {/**/width:0, height:'100%' });
	TweenMax.set("#roundelLeft", {/**/left:'-120px', top:'67px', transformOrigin:"50% 50%" });

	TweenMax.set("#phone", {/**/x:300, y:67, alpha: 1, transformOrigin:"0 0" });

	TweenMax.set("#roundelRight", {/**/left:'300px', top:'84px', transformOrigin:"50% 50%" });

	TweenMax.set("#tablet", {/**/x:146, y:36, transformOrigin:"0 0" });
	TweenMax.set("#plusSign", {/**/x:148, y:110, transformOrigin:"0 0" });

	delay = 0.5;
	TweenMax.to("#phone", 0.5, {x : 0, delay:delay});

	//delay = 0.45;
	TweenMax.set("#headlineFrame1", {alpha:1, delay:delay});
	TweenMax.to("#textMask", 1, {width:300, delay:delay});

	delay += 1.5;
	TweenMax.to("#cta", 0.5, {alpha : 1, delay:delay});

	//delay += 0.5;
	//TweenMax.delayedCall(delay, sparkAnim);

	delay += 2;
	TweenMax.to("#headlineFrame1", 0.5, {alpha:0, delay:delay, overwrite:false});

	delay += 0.5;
	TweenMax.to("#phone", 0.5, {x : 67, y:70, scale:0.866, delay:delay, overwrite:false});

	delay += 0.05;
	TweenMax.set("#roundelLeftBlank", {/**/alpha:1, delay:delay });
	TweenMax.to("#roundelLeft", 0.25, {/**/left:'8px', delay:delay, overwrite:false });

	delay += 0.5;
	TweenMax.delayedCall(delay, flipRoundelH, ["roundelLeft", "roundelLeftBlank", "roundelLeftText"]);

	delay += 1.5;
	TweenMax.to("#plusSign", 0.5, {alpha : 1, delay:delay});

	delay += 0.75;
	TweenMax.to("#tablet", 0.5, {alpha : 1, delay:delay});

	delay += 0.5;
	TweenMax.set("#roundelRightBlank", {/**/alpha:1, delay:delay });
	TweenMax.to("#roundelRight", 0.25, {/**/left:'226px', delay:delay, overwrite:false });

	delay += 0.5;
	TweenMax.delayedCall(delay, flipRoundelH, ["roundelRight", "roundelRightBlank", "roundelRightText"]);
    
    delay += 0.5;
	TweenMax.delayedCall(delay, sparkAnim);
}
//Math.random = RNG.prototype.uniform.bind(new RNG('4d6 + 12'));
Math.randMinMax=function(t,n,a){var r=t+Math.random()*(n-t)
return a&&(r=Math.round(r)),r}

var flipRoundelH = function(roundel, back, front){
	var height = document.getElementById(back).height;

	console.log(document.getElementById(back) + 'height: ' + height);

	TweenMax.to('#' + roundel, 0.35, {transform: 'translateY('+ (height*.5)+'px) scaleY(0.05)', overwrite:false});
	TweenMax.set('#' + front, {delay:0.35, alpha:1});
	TweenMax.set('#' + back, {delay:0.35, alpha:0});
	TweenMax.to('#' + roundel, 0.35, {delay:0.35, transform: 'translateY(0px) scaleY(1)', ovwerwrite:false});
}

var sparkAnim = function(){
	TweenMax.set( "#ctaSpark",{x:0, xPercent:-50 , yPercent:-50, left: '112px', top: '202px', force3D:false});
	TweenMax.to( "#ctaSpark", 0.25, {  rotation:-300, autoAlpha:1});
	TweenMax.to( "#ctaSpark", 1, { x:90, rotation:300, rotation:0, delay:0.25} );
}

//Create a self regulating timer
// that does not need to be to rigorous
// - it's just for kicking off animations

init();