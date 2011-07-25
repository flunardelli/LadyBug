function shake(bug,speed){		
	bug.animate({left: bug.x + speed, duration: 300, delay: 100}, function(){
		bug.animate({left: bug.x - speed, duration: 300},function(){
			bug.animate({left: bug.x, duration: 300});
		});
	});		
}
	
function move(bug,point){
	bug.animate({left: bug.x, top: bug.y, duration: 500}, function(){
		bug.animate({left: point.x, top: point.y, duration: 500},function(){
			point.bug = bug;	
		});
	});
}	
	
function swap(bugfrom,bugto){
	var tl = bugfrom.x;
	var tt = bugfrom.y;
	bugfrom.x = bugto.x;
	bugfrom.y = bugto.y;	
	bugfrom.animate({left: bugto.x, top: bugto.y, duration: 500}, function(){
		bugto.x = tl;
		bugto.y = tt;
		bugto.animate({left: tl, top: tt, duration: 500});
		shake(bugto,5);
	});	
	//shake(bugfrom,5);
}
	
function explode(bug,callback){
	var t = Ti.UI.create2DMatrix({opacity: 0, rotate: -30, scale: 10});
	bug.animate({opacity: 1,transform: t, duration: 400, autoreverse: false},callback);	
}