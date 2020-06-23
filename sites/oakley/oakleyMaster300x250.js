//Declare elements from the HTML  >> better form
var container;
var content;
var bgExit;

var w = 298;
var h = 248;

//canvas 2d contexts
var comptxHero1, comptxHero2, comptxHero3, comptxText, compTextMask, comptxTextMask, comptxCTA;

//canvas assets for genreating assets
var blurCanvas, textMaskCanvas;

//bitmap data from canvas
var textMaskBM, ctaMaskBM;

//img vars
var img1, img2, img3, mask1, mask2, mask3, copy1, copy2, copy3, ctaText;

//grad vars
var grad1,grad2,grad3,textGrad;

//comp props for tweening
var comp1Props = {x: -60, y: -200, alpha: 1, gAlpha:1 , ScaleW:1.06, ScaleH:1.06};


var comp2Props = {x: -60, y: -200, alpha: 1, gAlpha:1, ScaleW:1.06, ScaleH:1.06};


var comp3Props = {x: -60, y: -200, alpha: 1, gAlpha:1, ScaleW:1.06, ScaleH:1.06};

var textGradProps = {x: -400, y: 0, alpha:0};

//cta vars
var cta;
var ctaProps = {x: 18, y: 206, width:86, height:25, textX:0, textY:0, maskX:0, textWidth:0};

//Function to run with any animations starting on load, or bringing in images etc
init = function(){
	//Assign All the elements to the element on the page
	container = document.getElementById('container_dc');
	content = document.getElementById('content_dc');
	bgExit = document.getElementById('background_exit_dc');
	cta = document.getElementById('cta');
	ctaRight = document.getElementById('cta');
	ctaRight = document.getElementById('ctaRight');
	endFrame = document.getElementById('endFrame');
	//Bring in listeners i.e. if a user clicks or rollovers
	addListeners();
	//Show Ad
	container.style.display = "block";
	initComp();
}

//set up canvas elements and contexts
initComp = function(){
	mask1 = document.getElementById('mask1');
	img1 = document.getElementById('maskee1');

	mask2 = document.getElementById('mask2');
	img2 = document.getElementById('maskee2');

	mask3 = document.getElementById('mask3');
	img3 = document.getElementById('maskee3');

	copy1 = document.getElementById('copy1');
	copy2 = document.getElementById('copy2');
	copy3 = document.getElementById('copy3');

	ctaText = document.getElementById('ctaText');
	ctaOutline = document.getElementById('ctaOutline');

	comptxHero1 = document.getElementById('comp1Canvas').getContext('2d');
	comptxHero2 = document.getElementById('comp2Canvas').getContext('2d');
	comptxHero3 = document.getElementById('comp3Canvas').getContext('2d');

	comptxText = document.getElementById('textCanvas').getContext('2d');
	compTextMask = document.getElementById('textMaskCanvas');
	comptxTextMask = compTextMask.getContext('2d');

	ctaMaskCanvas = document.getElementById('ctaMaskCanvas');
	comptxCTAMask = ctaMaskCanvas.getContext('2d');

	comptxCTA = document.getElementById('ctaCanvas').getContext('2d');

	blurCanvas = document.getElementById('blurCanvas');

	comptxHero1.canvas.width  = blurCanvas.width  = w;
	comptxHero1.canvas.height = blurCanvas.height = h;

	initBlur('maskee1');
	initCTA();
	initGrads();
	initTextGrad();
	startAnimation();
}
//set grads
initGrads = function (){
	grad1 = comptxHero1.createLinearGradient(0, 560, 560, 0);
	grad1.addColorStop(0,'rgba(255, 102,0,0.2)');
	grad1.addColorStop(.5,'rgba(255, 204,0,0.3)');
	grad1.addColorStop(.8,'rgba(255, 204,0,0.1)');

	grad2 = comptxHero2.createLinearGradient(0, 560, 560, 0);
    grad2.addColorStop(0,'rgba(255, 102,0,0.6)');
    grad2.addColorStop(.5,'rgba(255, 204,0,0.4)');
    grad2.addColorStop(.8,'rgba(255, 204,0,0.3)');

	grad3 = comptxHero3.createLinearGradient(0, 560, 560, 0);
	grad3.addColorStop(0,'rgba(127, 161,157,0.2)');
	grad3.addColorStop(.4,'rgba(109, 167,195,0.3)');
	grad3.addColorStop(.8,'rgba(157, 114,192,0.5)');
	grad3.addColorStop(1,'rgba(157, 114,192,0.2)');
}

initTextGrad = function (){
	textGrad = comptxTextMask.createRadialGradient(230, 230, 230, 230,230,0);
	textGrad.addColorStop(1,'rgba(255, 255,255,1)');
	textGrad.addColorStop(.2,'rgba(255, 255,255,1)');
	textGrad.addColorStop(0,'rgba(255, 255,255,0.0)');
	comptxTextMask.fillStyle = textGrad;
	comptxTextMask.fillRect(0,0,460,460);

	textMaskBM = comptxTextMask.getImageData(0,0,460,460);
}

//compositing functions
initBlur = function(blurSource){
	boxBlurImage( blurSource, 'blurCanvas', 3, false, 1);
}

initCTA = function(){
	ctaProps.textX = Math.floor((ctaProps.width-ctaText.width)*.5);
	ctaProps.textY = Math.floor((ctaProps.height-ctaText.height)*.5);
	ctaProps.maskX = (ctaProps.width+ctaProps.height)*-1;

	comptxCTAMask.fillStyle= 'red';
	comptxCTAMask.beginPath();
	comptxCTAMask.moveTo(0,0);
	comptxCTAMask.lineTo(ctaProps.width+ctaProps.height, 0);
	comptxCTAMask.lineTo(ctaProps.width, ctaProps.height);
	comptxCTAMask.lineTo(0,ctaProps.height);
	comptxCTAMask.closePath();
	comptxCTAMask.fill();

	ctaMaskBM = comptxCTAMask.getImageData(0,0,152,25);
}

doHeroComp = function(ctx, img, mask, blur, grad, gradProps, imgW, imgH){
	ctx.clearRect(0,0,w,h);
	ctx.globalAlpha=gradProps.gAlpha;


	//console.log(ctx.canvas.id + " width is " + ctx.canvas.width);
	//console.log(ctx.canvas.id + " height is " + ctx.canvas.height);


	if (ctx.canvas.id == "comp1Canvas") {

		ctx.setTransform(comp1Props.ScaleW, 0, 0, comp1Props.ScaleH, 0, 0);
		//console.log(ctx.canvas.id + " scaleW ratio is " + comp1Props.ScaleW);
		//console.log(ctx.canvas.id + " scaleH ratoio is " + comp1Props.ScaleH);
	}

	else if (ctx.canvas.id == "comp2Canvas") {

   		ctx.setTransform(comp2Props.ScaleW, 0, 0, comp2Props.ScaleH, 0, 0);
 		//console.log(ctx.canvas.id + " scaleW ratio is " + comp2Props.ScaleW);
		//console.log(ctx.canvas.id + " scaleH ratoio is " + comp2Props.ScaleH);
	}

	else if (ctx.canvas.id == "comp3Canvas") {

   		ctx.setTransform(comp3Props.ScaleW, 0, 0, comp3Props.ScaleH, 0, 0);
		//console.log(ctx.canvas.id + " scaleW ratio is " + comp3Props.ScaleW);
		//console.log(ctx.canvas.id + " scaleH ratoio is " + comp3Props.ScaleH);
	}

	else{
   		//console.log("not happnin fella");
	};

	ctx.drawImage(img,0,0);
	ctx.globalCompositeOperation = 'destination-in';
	ctx.drawImage(mask,0,0);
	ctx.globalCompositeOperation = 'destination-over';
	ctx.globalAlpha=gradProps.alpha;
	ctx.globalAlpha=gradProps.alpha;
	ctx.drawImage(blur,0,0);
	ctx.globalAlpha=gradProps.gAlpha;
	ctx.drawImage(img,0,0);
	ctx.globalCompositeOperation = 'lighter';
	ctx.globalAlpha=gradProps.alpha;
	ctx.fillStyle = grad;
	ctx.fillRect(gradProps.x,gradProps.y,560,560);
	ctx.globalAlpha=gradProps.gAlpha;





}

resetScale = function(){
	comp1Props.scaleW = 1;
	comp1Props.scaleH = 1;
	comp2Props.scaleW = 1;
	comp2Props.scaleH = 1;
	comp3Props.scaleW = 1;
	comp3Props.scaleH = 1;

}


doTextComp = function(copy){
	comptxText.clearRect(0,0,w,h);
	comptxText.globalAlpha=textGradProps.alpha;
	copy1.globalAlpha = textGradProps.alpha;

	comptxText.putImageData(textMaskBM,textGradProps.x,textGradProps.y);

	comptxText.globalCompositeOperation = 'source-in';
	comptxText.drawImage(copy,0,0);

	//console.log("current text is " + copy.id);
	//console.log("text mask alpha is " + textGradProps.alpha);
	//console.log("text mask x is " + textGradProps.x);
	//console.log("text mask y is " + textGradProps.y);


}

doCTAComp = function(){
	comptxCTA.clearRect(0,0,w,h);

	comptxCTA.putImageData(ctaMaskBM,ctaProps.maskX,ctaProps.y);

	comptxCTA.globalCompositeOperation = 'source-in';

	comptxCTA.drawImage(ctaOutline,ctaProps.x,ctaProps.y);

	comptxCTA.globalCompositeOperation = 'source-over';

	comptxCTA.drawImage(ctaText, ctaProps.textX+ctaProps.x,ctaProps.textY+ctaProps.y);

	comptxCTA.globalCompositeOperation = 'destination-in';

	comptxCTA.fillStyle = 'red';
	comptxCTA.fillRect(ctaProps.x, ctaProps.y, ctaProps.width, ctaProps.height);
}

startAnimation = function(){
	//frame1 in
	TweenLite.to(comp1Props, 1.6,{alpha:0, x:-120, y:-140, onUpdate:doHeroComp, onUpdateParams: [comptxHero1, img1, mask1, blurCanvas, grad1, comp1Props]});
	TweenLite.to(comp1Props, 3.5,{ ScaleW:1, ScaleH:1, overwrite: false, onUpdate:doHeroComp, onUpdateParams: [comptxHero1, img1, mask1, blurCanvas, grad1, comp1Props], onComplete:resetScale});
	TweenLite.to(textGradProps, 2,{alpha:1,x:-60, y:-100, delay: .8, onUpdate:doTextComp, onUpdateParams: [copy1]});

	//frame1 out
	TweenLite.delayedCall(2.5, initBlur, ['maskee2']);
	TweenLite.to(textGradProps, 2,{alpha:1,x:-300, y:200, delay: 3.8, overwrite: false, onUpdate:doTextComp, onUpdateParams: [copy1]});

	//frame2 in
	TweenLite.from(comp2Props, .7,{gAlpha:0, alpha:0, delay: 4.8, onUpdate:doHeroComp, overwrite: false, onUpdateParams: [comptxHero2, img2, mask2, blurCanvas, grad2, comp2Props]})
	TweenLite.to(comp2Props, 3.5,{ ScaleW:1, ScaleH:1, overwrite: false, delay: 4.8, onUpdate:doHeroComp, onUpdateParams: [comptxHero2, img2, mask2, blurCanvas, grad2, comp2Props], onComplete:resetScale});
	TweenLite.to(comp2Props, 1.6,{alpha:0, x:-120, y:-140, delay: 5.1, overwrite: false, onUpdate:doHeroComp, onUpdateParams: [comptxHero2, img2, mask2, blurCanvas, grad2, comp2Props]});
	TweenLite.to(textGradProps, 3.8,{alpha:1,x:-60, y:-100, delay: 5.3, overwrite: false, onUpdate:doTextComp, onUpdateParams: [copy2]});

	//frame2 out
	TweenLite.delayedCall(8.5, initBlur, ['maskee3']);
	TweenLite.to(textGradProps, .4,{alpha:1,x:-300, y:200, delay: 9.6, overwrite: false, onUpdate:doTextComp, onUpdateParams: [copy2]});

	//frame3 in
	TweenLite.from(comp3Props, .7,{gAlpha:0, alpha:0, delay: 9.8, onUpdate:doHeroComp, overwritew: false, onUpdateParams: [comptxHero3, img3, mask3, blurCanvas, grad3, comp3Props]})
	TweenLite.to(comp3Props, 3.5,{ ScaleW:1, ScaleH:1, overwrite: false, delay: 9.8, onUpdate:doHeroComp, onUpdateParams: [comptxHero3, img3, mask3, blurCanvas, grad3, comp3Props], onComplete:resetScale});
	TweenLite.to(comp3Props, 1.6,{alpha:0, x:-120, y:-140, delay: 10.2, overwrite: false, onUpdate:doHeroComp, onUpdateParams: [comptxHero3, img3, mask3, blurCanvas, grad3, comp3Props]});
	TweenLite.to(textGradProps, 3.8,{alpha:1, x:-60, y:-100, delay: 10.5, overwrite: false, onUpdate:doTextComp, onUpdateParams: [copy3]});

	//cta in
	TweenLite.to(ctaProps, .8,{maskX:ctaProps.x,delay: 11.2, onUpdate:doCTAComp});
	TweenLite.from(ctaProps, .6,{textX:0-ctaProps.width,delay: 11.4,overwrite:false});
}

//Add Event Listeners
addListeners = function() {
	bgExit.addEventListener('click', bgExitHandler, false);
}

bgExitHandler = function(e) {
	Enabler.exit('HTML5_Background_Clickthrough');
}

checkLoads();
