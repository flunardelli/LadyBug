(function(){
		
	Ti.include('animation.js');
	Ti.include('score.js');
	
	var defaultEnv = {
		background: 'images/bg-leaf2.jpg',
		iconImage: 'images/lady-bug-64.png',
		iconSize: 64,
		posx: 20,
		posy: 70,
		nper: 4,
		total: 24		
	};
	
	if (Ti.Platform.osname == 'ipad') {
		defaultEnv = {
			background: 'images/bg-leaf2-96.jpg',
			iconImage: 'images/lady-bug-96.png',
			iconSize: 96,
			posx: 40,
			posy: 140,
			nper: 5,
			total: 30		
		};
	}
	
	var maxwidth = Titanium.Platform.displayCaps.platformWidth;
	var maxheight = Titanium.Platform.displayCaps.platformHeight;
	//Ti.include('options.js');
	
	var timer = 300;	
	var score = 0;
	var posx = 0;
	var posy = -50;
	var total = defaultEnv.total;
	var maxpos = defaultEnv.total;
	var step = 0;
	var speed = 1000;
	var stage = {num: total, children: []};
	var lastbug = 0;
	
	
	var main = Ti.UI.currentWindow;
	
	var level = main.level;
	
	var mainWindow = Ti.UI.createView();
	var bugview = Ti.UI.createView();
	
	mainWindow.add(bugview);
	
	main.stage = mainWindow;
	
	main.timer = timer;
	
	mainWindow.soundEnabled = Ti.App.Properties.getBool('soundEnabled',true);
	
	main.backgroundImage = defaultEnv.background;
	
	
	mainWindow.backgroundSound = Ti.Media.createSound({
		volume: 1,
		looping: true,
		url: 'sound/background.mp3',
	});
	
	if (mainWindow.soundEnabled){
		mainWindow.backgroundSound.play();
	}
		
	var hitSound = Ti.Media.createSound({
		url: 'sound/hit.mp3',
		volume: 1
	});

	// hitSound.addEventListener('complete', function hitSoundComplete(e){
		// //e.source.setVolume(1);
		// e.source.removeEventListener('complete',hitSoundComplete);
	// });
// 	
	hitSound.play();
	
	function hit(bug){
		var hitLabel = Ti.UI.createLabel({
			text: '+'+bug.hits,
			height:'auto',
			width:'auto',
			shadowColor:'#666666',
			shadowOffset:{x:1,y:1},
			color:'#FBB917',
			font:{fontSize:24, fontStyle:'Bold'},
			textAlign:'center',
			opacity: 0
		});
		bugview.add(hitLabel);
		hitLabel.opacity = 0;
		hitLabel.left = bug.x;
		hitLabel.top = bug.y;
		hitLabel.animate({opacity:1,top:bug.y+10,left:bug.x, duration:800}, function(){
			hitLabel.animate({opacity:0,top:bug.y,left:bug.x,duration:800},function(){
				bugview.remove(hitLabel);
			});
		});
	}
		
	for (var i=0;i<stage.num;i++){
		if (i % defaultEnv.nper == 0){		
			posx = defaultEnv.posx;
			posy += defaultEnv.posy;
		} else {
			posx += defaultEnv.posy;
		}
		stage.children[i] = { 
			bug: Ti.UI.createButton({
				backgroundImage: defaultEnv.iconImage,
				width: defaultEnv.iconSize,
				height: defaultEnv.iconSize,
				left: posx,
				top: posy,
				y: posy,
				x: posx,
				hits: 0,
				id: i,
				step: true
			}),
			x: posx,
			y: posy
		};	
		//shake(bugs[i],5);
		stage.children[i].bug.addEventListener('click',actionHit);
		bugview.add(stage.children[i].bug);		
	}
	//var bug = {};
	
	function actionHit(e){
		var bug = e.source;
		//alert(bugs.length + ' ' + e.source.id);
		if (mainWindow.soundEnabled){
			hitSound.play(); 	
		}
		
		if (bug.id == lastbug){
			bug.hits += 1;
			score += bug.hits;			
			hit(bug);		
		}
		
		lastbug = bug.id;
		
		scorevalue.text = score;
		
		if (bug.hits == 3) {		
			explode(bug,function(){
				bug.visible = false;
				//num -= 1;
				//bugs.splice(bug.id,1);
				stage.num -= 1;
				bug = null;
								
				 if (stage.num <= 0){
				 	mainWindow.remove(bugview);
					mainWindow.backgroundSound.stop();
					showScore(main.timer + 's');
					clearInterval(gameTimer);
				 }
			})
		} else {
			for(var l = 0; l < main.level; l++){				
				if (stage.num > 1){				
					var n = bug.id;
					while (bug.id == n) {
						n = Math.floor(Math.random() * total);
						Ti.API.info(n + ' ' +bug.id);
					}		
					var bugto = (stage.children[n].bug) ? stage.children[n].bug : stage.children[n];
					swap(bug,bugto);
				}
			}
			
			
		//change(bug);
		//shake(bug);			
		}
		
		
	}
	Ti.Gesture.addEventListener('shake',function(){
		if (stage.num > 1){				
			var bug = stage.children[lastbug].bug;
			var n = bug.id;
			while (bug.id == n) {
				n = Math.floor(Math.random() * total);
				Ti.API.info(n + ' ' +bug.id);
			}		
			var bugto = (stage.children[n].bug) ? stage.children[n].bug : stage.children[n];
			swap(bug,bugto);
		}
	});
	
	var accposy = 0;
	var accposx = 0;

	var accelerometerCallback = function(e) {
		ts.text = e.timestamp;
		x.text = 'x: ' + e.x;
		y.text = 'y:' + e.y;
		z.text = 'z:' + e.z;
		if (e.y > 0.3) {
			accposy = -5;
		} else if (e.y < -0.3) {
			accposy = 5;
		} else {
			accposy = 0;
		}
		if (e.x > 0.3) {
			accposx = 5;
		} else if (e.x < -0.3) {
			accposx = -5;
		} else {
			accposx = 0;
		}
		//Ti.API.info(accposx + " -> " + accposy);		
	}

	Ti.Accelerometer.addEventListener('update', accelerometerCallback);
	
	var gameTimer = setInterval(function(){
		
		main.timer -= 1;	
		timervalue.text = main.timer;

		 if (main.timer === 0){
		 	mainWindow.remove(bugview);
		 	mainWindow.backgroundSound.stop();
			showScore(main.timer + 's'); 			
			clearInterval(gameTimer);						
		 }
		 
		 if (stage.num == 12 || main.timer === 120){
		 	
		 	speed = 100;
		 	step = 3;
		 	shakeview(bugview);
		 } else if (stage.num == 1 || main.timer === 60) {
		 	speed = 10;
		 	step = 2;
		 }
		 
		 		
	},1000);
	
	bugview.left = 0;

	function shakeview(v) {
		var steprev = step * -1;
		v.animate({ duration: speed, left: step + accposx, top: accposy, autoreverse: false},function(){
			//bugview.left = step;
			v.animate({ duration: speed, left: steprev + accposx, top: accposy, autoreverse: false},function(){
				
				v.left = 0;
				shakeview(v);
			});
		});		
	}
	
	//shakeview(bugview);
	
	Ti.include('options.js');
	
	
	main.add(mainWindow);	
})();	
