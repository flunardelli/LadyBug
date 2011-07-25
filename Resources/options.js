var main = Ti.UI.currentWindow;
var mainWindow = main.stage;
 
var modal = Ti.UI.createWindow({
	main: mainWindow,
	backgroundColor: "#ffffff",
	url: 'optionsWindow.js'
});	

var infolight = Titanium.UI.createButton({
	width: 30,
	height: 30,
	right: 15,
	bottom: 10	
});	

if (Titanium.Platform.name != 'android'){
	infolight.style = Titanium.UI.iPhone.SystemButton.INFO_LIGHT;
}

infolight.addEventListener('click', function(){
	modal.open({
		modal:true,
	});
});	

var view = Ti.UI.createView({
	height: 40,
	opacity: 0.7,
	bottom: 0,
	backgroundColor: '#000000'
});	

var levellabel = Ti.UI.createLabel({
	shadowColor:'#aaaaaa',
	shadowOffset:{x:1,y:1},
	color:'#ffffff',
	font:{fontSize:16, fontStyle:'bold'},
	text: 'Level',
	left: 10,
	width: 'auto',
	bottom: 5
});

var levelvalue = Ti.UI.createLabel({
	shadowColor:'#aaaaaa',
	shadowOffset:{x:1,y:1},
	color:'#ffffff',
	font:{fontSize:28, fontStyle:'bold'},
	text: main.level,
	left: 55,
	width: 'auto',
	bottom: 5
});


var scorelabel = Ti.UI.createLabel({
	shadowColor:'#aaaaaa',
	shadowOffset:{x:1,y:1},
	color:'#ffffff',
	font:{fontSize:16, fontStyle:'bold'},
	text: 'Score ',
	left: 80,
	width: 'auto',
	bottom: 5
});	

var scorevalue = Ti.UI.createLabel({
	shadowColor:'#aaaaaa',
	shadowOffset:{x:1,y:1},
	color:'#ffffff',
	font:{fontSize:28, fontStyle:'bold'},
	text: 0,
	width: 'auto',
	left:130,
	bottom: 5
});

var timerlabel = Ti.UI.createLabel({
	shadowColor:'#aaaaaa',
	shadowOffset:{x:1,y:1},
	color:'#ffffff',
	font:{fontSize:16, fontStyle:'bold'},
	text: 'Time ',
	left: 180,
	width: 'auto',
	bottom: 5
});	

var timervalue = Ti.UI.createLabel({
	shadowColor:'#aaaaaa',
	shadowOffset:{x:1,y:1},
	color:'#ffffff',
	font:{fontSize:28, fontStyle:'bold'},
	text: main.timer,
	width: 'auto',
	left:220,
	bottom: 5
});

view.add(levellabel);
view.add(levelvalue);
view.add(scorelabel);
view.add(scorevalue);
view.add(timerlabel);
view.add(timervalue);

view.add(infolight);
	

	
mainWindow.add(view);

mainWindow.score = scorelabel;

mainWindow.addEventListener('switchSound', function(e) {
	mainWindow.switchSound(e.value);
});

mainWindow.switchSound = function (value){
	if (value == 1) {
		mainWindow.soundEnabled = true;
		mainWindow.backgroundSound.play();
	} else {
		mainWindow.soundEnabled = false;
		mainWindow.backgroundSound.stop();
	}
}	
