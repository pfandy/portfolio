/* -----------------------------------------------------------
 * ページ種類識別
----------------------------------------------------------- */
const body = document.body;
let pageType,
	bodyStyle = body.classList;

if(bodyStyle.contains('home')){
	pageType = 1;
} else if(bodyStyle.contains('page')){
	pageType = 2;
} else if(bodyStyle.contains('single')){
	pageType = 3;
} else {
	pageType = 0;
}


/* -----------------------------------------------------------
 * iphoneのみCSSを適用（iphoneだけbackground-imageが効かない為） 
----------------------------------------------------------- */

if(navigator.userAgent.indexOf('iPhone') > 0) {
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('iPhone');
}

/* -----------------------------------------------------------
 * リサイズタイマー(リサイズ時の処理) 
----------------------------------------------------------- */

let resizeTimer;

window.addEventListener('resize', () => {
	//resizeTimerがセットされていればタイマーを解除して、改めてタイマーをセットしなおす。
	if(resizeTimer != null){
		clearTimeout(resizeTimer);
	}
	//1000ミリ秒後に関数を実行するタイマーをセット。
	resizeTimer = setTimeout(() => {
		scrollbarAdjust(); // スクロールバーサイズ取得
		footerAdjust(); // フッターの位置調整
		currentPositionUnit(); // 作品のスライダーの初期状態を読み込み
	}, 1000);
});

/* -----------------------------------------------------------
 * 読み込まれた時、リロード時の処理
----------------------------------------------------------- */

window.addEventListener('DOMContentLoaded', () => { // DOMアクセスできるタイミングで実行
	scrollbarAdjust(); // スクロールバーサイズ取得
	footerAdjust(); // フッターの位置調整
	currentPositionUnit(); // 作品のスライダーの初期状態を読み込み
});

/* -----------------------------------------------------------
 * スクロールバーのサイズ取得
----------------------------------------------------------- */

function scrollbarAdjust(){
	const root = document.documentElement;
	let scrollbarWidth = getScrollbarWidth();
	function getScrollbarWidth() {
		return window.innerWidth - root.clientWidth;
	}
	root.style.setProperty('--scrollbar', `${scrollbarWidth}px` ); //scrollbarの幅を変数に設定
}

/* -----------------------------------------------------------
 * フッターの高さ取得してBodyのpadding-bottomに入れる
----------------------------------------------------------- */

function footerAdjust(){
	const footer = document.querySelector('.myfoot'),
		  body = document.querySelector('body');
	let footerHeight = getComputedStyle(footer).height;
	body.style.paddingBottom = footerHeight;
}

/* -----------------------------------------------------------
 * スクロールの検知
----------------------------------------------------------- */

let scrollTimer;

window.addEventListener('scroll', () => {
	//scrollTimerがセットされていればタイマーを解除して、改めてタイマーをセットしなおす。
	if(scrollTimer != null){
		clearTimeout(scrollTimer);
	}
	//100ミリ秒後に関数を実行するタイマーをセット。
	scrollTimer = setTimeout(() => {
		headerChange(); //ヘッダーを入れ替える
		toTopButtonSwitch();
	}, 100);
});

/* -----------------------------------------------------------
 * スクロールを検知したらヘッダーを入れ替える
----------------------------------------------------------- */

function headerChange(){
	if(window.scrollY !== 0){
		const headerHamburger = document.querySelector('#headerHamburger'),
			  headerWhole = document.querySelector('#headerWhole');
		headerHamburger.classList.add('scrolled');
		headerWhole.classList.add('scrolled');
	}else{
		headerHamburger.classList.remove('scrolled');
		headerWhole.classList.remove('scrolled');
	}
}

/* -----------------------------------------------------------
 * ハンバーガーメニュー
----------------------------------------------------------- */

const menuTrigger = document.querySelector('.menu-trigger'),
	  hamburgerNav = document.querySelector('.hamburgerNav');

menuTrigger.addEventListener('click', (event) => {
	event.preventDefault();
	let menuTriggerClass = menuTrigger.classList,
		hamNavClass = hamburgerNav.classList;
	
	if(menuTriggerClass.contains('active')){
		menuTriggerClass.remove('active');
		hamNavClass.remove('active');
		scrollPermitted(); 
	}else{
		menuTriggerClass.add('active');
		hamNavClass.add('active');
		scrollBanned();
	}
});

/* -----------------------------------------------------------
 * スクロールの禁止・許可
----------------------------------------------------------- */

function scrollBanned(){
	document.addEventListener('wheel', scrollProhibited, {passive: false});
	document.addEventListener('touchmove', scrollProhibited, {passive: false});
}
function scrollPermitted(){
	document.removeEventListener('wheel', scrollProhibited, {passive: false});
	document.removeEventListener('touchmove', scrollProhibited, {passive: false});
}
function scrollProhibited(event){
	event.preventDefault();
}

/* -----------------------------------------------------------
 * オーバーレイギャラリー
----------------------------------------------------------- */

const galleryOverlay = document.querySelector('#photo-overlay'),
	  galleryFrame = document.querySelector('#fullscreen-photo-frame'),
	  galleryImage = document.querySelector('#fullscreen-photo'),
	  galleryCandidates = document.getElementsByClassName('experience-photo'),
	  galleryCandidatesSrc = [],
	  cancelButton = document.querySelector('.cancel-button');

for(let i = 0; i < galleryCandidates.length; i++){
	galleryCandidates[i].addEventListener('click', () => {
		galleryOverlay.classList.add('gallery-open');
		scrollBanned();
		let gallerySrc = galleryCandidates[i].src;
		galleryImage.src = gallerySrc;
		
		galleryOverlay.addEventListener('click', (event) => {
			event.target.classList.remove('gallery-open');
			scrollPermitted();
		});
		
		cancelButton.addEventListener('click', (event) => {
			event.preventDefault();
			galleryOverlay.classList.remove('gallery-open');
			scrollPermitted();
		});
	});
}

/* -----------------------------------------------------------
 * ヘッダーの高さに合わせて<main>の位置を調整
----------------------------------------------------------- */

const headerHamburger = document.querySelector('#headerHamburger'),
	  headerWhole = document.querySelector('#headerWhole'),
	  elementMain = document.querySelector('main');

let headerHamHeight = headerHamburger.offsetHeight,
	headerWhoHeight = headerWhole.offsetHeight;

if(headerHamHeight < headerWhoHeight){
	elementMain.style.paddingTop = `calc(${headerWhoHeight}px + 2.5em)`;
}else{
	elementMain.style.paddingTop = `calc(${headerHamHeight}px + 2.5em)`;
}

/* -----------------------------------------------------------
 * Smooth scroll to the top
----------------------------------------------------------- */

const toTopButton = document.querySelector('#to-page-top');

toTopButton.addEventListener('click', moveToTop);
toTopButton.addEventListener('touchstart', moveToTop);

function moveToTop(event){
	event.preventDefault();
	
	let currentVerticalScroll = window.scrollY,
		decelerationRateY = 0.1;
	
	progressYTimer = setInterval(updateProgressY, 1000 / 60); // 1/60秒で処理
	
	function updateProgressY(){
		currentVerticalScroll -= currentVerticalScroll * decelerationRateY;
		window.scrollTo(0, currentVerticalScroll);
		
		if(currentVerticalScroll < 3){
			clearInterval(progressYTimer);
			window.scrollTo(0, 0);
			return;
		}
	}
}

/*------------- to-page-top button on/off ---------------------- */

function toTopButtonSwitch(){
	let currentVerticalScroll = window.scrollY;

	if(currentVerticalScroll < 500){
		toTopButton.style.opacity = '0';
		toTopButton.style.visibility = 'hidden';
	} else {
		toTopButton.style.opacity = '1';
		toTopButton.style.visibility = 'visible';
	}
}

/* -----------------------------------------------------------
 * Smooth scroll for inner links
----------------------------------------------------------- */

const anchor = document.querySelectorAll('a.link-setting[href^="#"]');

for(let i = 0; i < anchor.length; i++){
	anchor[i].addEventListener('click', toInnerLinks);
	anchor[i].addEventListener('touchstart', toInnerLinks);
}

function toInnerLinks(event){
	event.preventDefault();

	let target = this.getAttribute('href'),
		targetElem = document.querySelector(target),
		targetElemRect = targetElem.getBoundingClientRect(),
		targetElemPosition = targetElemRect.top,
		windowPosition = window.pageYOffset,
		adjustment = -140,
		elemPosition = windowPosition + targetElemPosition + adjustment,
		decelerationRateY = 0.1;
	
	progressYTimer = setInterval(updateProgressY, 1000 / 60); // 1/60秒で処理
	
	function updateProgressY(){
		let currentWindowPosition = window.scrollY,
			distance = elemPosition - currentWindowPosition;
		
		if(Math.abs(distance) < 10){
			distance = Math.sign(distance) * 10;
		}
		
		currentWindowPosition += distance * decelerationRateY;
		window.scrollTo(0, currentWindowPosition);
		
		if(Math.abs(elemPosition - currentWindowPosition) < 1){
			clearInterval(progressYTimer);
			window.scrollTo(0, elemPosition);
			return;
		}
	}
}

/* -----------------------------------------------------------
 * スライダー
----------------------------------------------------------- */

window.addEventListener('DOMContentLoaded', () => { // DOMアクセスできるタイミングで実行
	if(pageType !== 1){ // top page以外は処理をやめる
		return;
	}
	
	// phpで用意されたスライダーにセットする画像のsrcをsetImagesに全部セットし、phpで用意したimgタグは一度削除。
	const smilePhoto = document.querySelector('#smile-photo'), // slider全体の<figure>
		  sliderViewCandidates = document.querySelectorAll('.slider-view-candidates'),
		  setImages = [];
	
	for(let i = 0; i < sliderViewCandidates.length; i++){
		let removedPhotoElement,
			removedPhotoSrc;

		removedPhotoElement = smilePhoto.removeChild(sliderViewCandidates[i]);
		removedPhotoSrc = removedPhotoElement.src;
		setImages.push(removedPhotoSrc);
	}
	
	function createSliderView(){
		let elemImg = document.createElement('img');
		
		elemImg.id = 'slider-view';
		elemImg.setAttribute('src', '');
		elemImg.setAttribute('alt', 'smile-photo');
		return elemImg;
	}
	
	const sliderView = createSliderView(), // sliderの<img>
		  sliderPrev = document.getElementById('slider-prev'), // 前の画像へ
		  sliderNext = document.getElementById('slider-next'), // 次の画像へ
		  sliderNavList = document.getElementById('slider-navList'); // スライダーナビゲーションの<ul>

	smilePhoto.insertBefore(sliderView, smilePhoto.firstchild);
	
	sliderView.src = setImages[0]; // スライダーに初期画像を設定する。
	
	let list,
		image,
		anchor,
		current = 0,
		clickBtn = true;

	function createSliderItems(){
		for(let i = 0; i < setImages.length; i++){
			/* スライダーナビゲーションのulタグの中身を作成 */
			list = document.createElement('li');
			anchor = document.createElement('a');
			anchor.innerHTML = '<span class="sliderNavDot"></span>';
			anchor.setAttribute('href', setImages[i]);
			list.appendChild(anchor);	
			sliderNavList.appendChild(list);
			
			if(i === 0){
				list.classList.add("selected");
			}
			/* クリックで、画像を切り替える */
			list.addEventListener('click', function(){
				event.preventDefault();
				if(clickBtn === true){
					clickBtn = false;
					sliderView.classList.add("appear");
					sliderNavList.children[current].classList.remove("selected");

					setTimeout(() => { // 0.3秒後に画像を切り替える（FadeOutの時間）
						sliderView.src = this.children[0].getAttribute('href');
						let currentImage = sliderView.src.slice(-6, -4);
						current = Number(currentImage) - 1;
					}, 300);
					
					this.classList.add("selected");
					
					setTimeout(() => { // 1秒後に画像切替えに使ったcssを削除＋次の処理を許可
						sliderView.classList.remove("appear");
						clickBtn = true;
					}, 1000);
					autoPlay();
				}else{
					return false;
				}
			});
		};
	}
	createSliderItems();

	/* 前に戻るボタン */
	sliderPrev.addEventListener('click', function(){
		if(clickBtn === true){
			clickBtn = false;
			sliderView.classList.add("appear");
			sliderNavList.children[current].classList.remove("selected");
			current--;
			if(current < 0){
				current = setImages.length - 1;
			}

			setTimeout(() => {
				sliderView.src = setImages[current];
			}, 300);
			
			sliderNavList.children[current].classList.add("selected");
			
			setTimeout(() => {
				sliderView.classList.remove("appear");
				clickBtn = true;
			}, 1000);
			autoPlay();
		}else{
			return false;
		}
	});
	
	/* 次に進むボタン */
	sliderNext.addEventListener('click', function(){
		if(clickBtn === true){
			clickBtn = false;
			sliderView.classList.add("appear");
			sliderNavList.children[current].classList.remove("selected");
			current++;
			if(current > setImages.length - 1){
				current = 0;
			}
			
			setTimeout(() => {
				sliderView.src = setImages[current];
			}, 300);
			
			sliderNavList.children[current].classList.add("selected");

			setTimeout(() => {
				sliderView.classList.remove("appear");
				clickBtn = true;
			}, 1000);
			autoPlay();
		}else{
			return false;
		}
	});
	
	let autoPlayTimer;
	
	function autoPlay(){
		if(autoPlayTimer != null){ // これまでのタイマーを解除
			clearTimeout(autoPlayTimer);
		}
		autoPlayTimer = setTimeout(function(){ // あたらしいタイマーをセット
			sliderNext.click();
		}, 5000);
	}
	window.onload = autoPlay();
});

/* sliderの上にマウスが乗った時にだけナビゲーションを表示させる */
function sliderMouseOver(){
	if(pageType !== 1){ // top page以外は処理をやめる
		return;
	}
	
	const sliderFrame = document.querySelector('#smile-photo'),
		  sliderNav = document.querySelector('#slider-nav');
		  
	/* マウスの処理 */
	sliderFrame.addEventListener('mouseenter', function(){
		sliderNav.classList.add('mouseover');
		
		sliderFrame.addEventListener('mouseleave', function(){
			sliderNav.classList.remove('mouseover');
		});
	});
	
	/* タッチパネルの処理 */
	sliderFrame.addEventListener('touchstart', () => {
		sliderNav.classList.add('mouseover');
		
		sliderFrame.addEventListener('touchend', () => {
			sliderNav.classList.remove('mouseover');
		});
	});
}
sliderMouseOver();

/* -----------------------------------------------------------
 * 作品ギャラリーの別の作品へのSmooth scrollボタン
----------------------------------------------------------- */

const worksGalleryFrame = document.querySelector('#works-gallery'), // <ul>
	  worksGalleryContents = document.querySelectorAll('.works-thumbnails'), // 全ての<li>
	  numberOfWorks = worksGalleryContents.length; // worksの数

let worksFrameRect, // <ul>の位置座標
	worksFrameLeft, // <ul>の左端の座標
	worksFrameRight, // <ul>の右端の座標
	worksContentsRects = [], // <li>の位置座標を取得
	worksContentsLefts = [], // <li>の左端の座標
	worksContentsRight, // 右端の<li>の右端の座標
	distanceFromLeftEnd = []; // 左端の<li>を基準にした各<li>の相対位置

// 各要素の位置を取得
function preset(){
	if(pageType !== 1){ // top page以外は処理をやめる
		return;
	}

	worksFrameRect = worksGalleryFrame.getBoundingClientRect(); // <ul>の位置座標を取得
	worksFrameLeft = worksFrameRect.left; // <ul>の左端の座標
	worksFrameRight = worksFrameRect.right; // <ul>の右端の座標
	
	// 配列を初期化
	worksContentsRects.length = 0;
	worksContentsLefts.length = 0;
	
	for(let i = 0; i < numberOfWorks; i++){
		let worksContentsRect = worksGalleryContents[i].getBoundingClientRect();
		worksContentsRects.push(worksContentsRect);
		worksContentsLefts.push(worksContentsRect.left);
		if(i === numberOfWorks - 1){
			worksContentsRight = worksContentsRect.right;
		}
	}
	
	eachDistanceFromLeftEnd(); // 左端の<li>を基準にした各<li>の相対位置を取得
}
preset();

function eachDistanceFromLeftEnd(){
	distanceFromLeftEnd.length = 0;	
	for(let i = 0; i < numberOfWorks; i++){
		distanceFromLeftEnd.push(worksContentsLefts[i] - worksContentsLefts[0]);
	}
}


let currentScroll; // 現在のスクロール量

function getCurrentScroll(){
	currentScroll = worksGalleryFrame.scrollLeft;
}


let currentLeftWork = 0; // 現在の左端の作品

function getCurrentLeftWork(){
	getCurrentScroll();
	//↓右端の時の条件がないとcurrentLeftWorkが増えないので注意
	for(let i = 0; i < numberOfWorks; i++){
		if(((currentScroll >= distanceFromLeftEnd[i]) && (currentScroll < distanceFromLeftEnd[i + 1])) || (currentScroll >= distanceFromLeftEnd[numberOfWorks - 1])){
			currentLeftWork = i;
		}
	}
}

// 現在の位置に関する情報をアウトプットする為のセット
function currentPositionUnit(){
	if(pageType !== 1){ // top page以外は処理をやめる
		return;
	}
	
	preset();
	getCurrentLeftWork();
	leftEndJudge(); // 左端を判断
	rightEndJudge(); // 右端を判断
}

// 作品にスクロールが生じた時、currentPositionUnit()を実行し、現在位置取得と左右端判定を行う
let worksScrollTimer;

function worksScrollPositionCheck(){
	if(pageType !== 1){ // top page以外は処理をやめる
		return;
	}

	worksGalleryFrame.addEventListener('scroll', function(){

		//worksScrollTimerがセットされていればタイマーを解除して、改めてタイマーをセットしなおす。
		if(worksScrollTimer != null){
			clearTimeout(worksScrollTimer);
		} else {
			currentPositionUnit();
		}
		//200ミリ秒後に関数を実行するタイマーをセット。
		worksScrollTimer = setTimeout(function(){
			currentPositionUnit();		
			worksScrollTimer = null;
		}, 200);
	});
}
worksScrollPositionCheck();


//左右端判定処理
const tolerance = 1; // 【許容誤差】：調整用

let leftEnd,
	rightEnd,
	frameWidth, // frameの表示領域の横幅
	maxScroll; // 最大可能スクロール量

function leftEndJudge(){
	if(currentScroll === 0){
		leftEnd = true;
		worksPrev.classList.add('buttonHide');
	} else {
		leftEnd = false;
		worksPrev.classList.remove('buttonHide');
	}
}

function rightEndJudge(){
	frameWidth = worksGalleryFrame.clientWidth; // frameの表示領域の横幅
	maxScroll = worksContentsRight - worksContentsLefts[0] - frameWidth; // 最大可能スクロール量を算出
	
	if(currentScroll >= maxScroll - tolerance){
		rightEnd = true;
		worksNext.classList.add('buttonHide');
	} else {
		rightEnd = false;
		worksNext.classList.remove('buttonHide');
	}
}

// 作品のボタンによる左右移動
const worksPrev = document.querySelector('#works-gallery-prev'),
	  worksNext = document.querySelector('#works-gallery-next'),
	  worksButton = document.querySelectorAll('.works-gallery-button');

let inMotion = false, // 移動中かどうかを判定
	scrollAdjusted; // ボタンを押した際の次の移動先

function scrollToNextWork(){
	if(pageType !== 1){ // top page以外は処理をやめる
		return;
	}
	
	worksNext.addEventListener('click', function(){
		event.preventDefault();
		
		// 移動中の処理禁止
		if(inMotion === true){
			return;
		} else {
			inMotion = true; // 移動中の処理禁止
		}
		
		currentPositionUnit(); // 現在の状況を取得
		currentLeftWork++; // frameに表示される左端の作品を次の作品に変更
		// 右端の作品になっても、easingMoveToNext()中に正しい現在の作品をcurrentLeftWorkに代入するのでここでは問題ない

		// ↓移動先座標の算出
		if((currentLeftWork === numberOfWorks) || (worksContentsLefts[currentLeftWork] - worksContentsLefts[0] >= maxScroll)){
			// 右端の作品まで来ている場合、移動位置を最大スクロール量に設定
			scrollAdjusted = maxScroll;
		} else {
			//通常の次の移動位置の設定
			scrollAdjusted = worksContentsLefts[currentLeftWork] - worksContentsLefts[0] + tolerance; // 許容誤差を含んだ移動量を算出
		}
		easingMoveToNext(); // イージング移動
	});
}
scrollToNextWork();

//currentScroll: 現在位置、scrollAdjusted：次の移動位置

const decelerationRate = 0.1; // 減速率

function easingMoveToNext(){
	progressTimer = setInterval(updateProgress, 1000 / 60); // 1/60秒で処理

	function updateProgress(){
		// 移動先と現在の距離の差に応じた値を現在位置に加えていくことで、距離が近くなると減速する
		currentScroll += (scrollAdjusted - currentScroll) * decelerationRate;
		
		worksGalleryFrame.scrollLeft = currentScroll; // 移動処理

		// ↓終了処理
		if(currentScroll >= maxScroll - tolerance){
			// 右端の時の処理
			clearInterval(progressTimer);
			worksGalleryFrame.scrollLeft = maxScroll; // 最後の移動処理
			inMotion = false; // 移動中の処理禁止を解除
			return;
		}
		if(currentScroll > scrollAdjusted - tolerance){
			// 途中の処理
			clearInterval(progressTimer);
			worksGalleryFrame.scrollLeft = scrollAdjusted; // 最後の移動処理
			inMotion = false; // 移動中の処理禁止を解除
		}
	}
}


function scrollToPrevWork(){
	if(pageType !== 1){ // top page以外は処理をやめる
		return;
	}
	
	worksPrev.addEventListener('click', function(event){
		event.preventDefault();
		
		// 移動中の処理禁止
		if(inMotion === true){
			return;
		} else {
			inMotion = true; // 移動中の処理禁止
		}
		
		currentPositionUnit(); // 現在の状況を取得
		
		if(!(currentScroll - (worksContentsLefts[currentLeftWork] - worksContentsLefts[0]) > 10 || currentLeftWork === 0)){
			// （現在位置が現在の作品の左端から10px以内、または現在位置が左端の作品の範囲の時）ではない場合
			currentLeftWork--; // 一つ前の作品に変更
		}
		scrollAdjusted = worksContentsLefts[currentLeftWork] - worksContentsLefts[0]; // 次の移動先を設定

		easingMoveToPrev();
	});
}
scrollToPrevWork();

function easingMoveToPrev(){
	progressTimer = setInterval(updateProgress, 1000 / 60); // 1/60秒で処理
	
	function updateProgress(){
		currentScroll -= (currentScroll - scrollAdjusted) * decelerationRate;
		worksGalleryFrame.scrollLeft = currentScroll; // 移動処理

		// ↓終了処理
		if(currentScroll <= tolerance){
			// 左端の時の処理
			clearInterval(progressTimer);
			worksGalleryFrame.scrollLeft = 0; // 移動処理
			inMotion = false; // 移動中の処理禁止を解除
			return;
		}
		if(currentScroll < scrollAdjusted + tolerance){
			// 途中の処理
			clearInterval(progressTimer);
			worksGalleryFrame.scrollLeft = scrollAdjusted; // 移動処理
			inMotion = false; // 移動中の処理禁止を解除
		}
	}
}



