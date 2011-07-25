var modal = Ti.UI.currentWindow;

var soundEnabled = Ti.App.Properties.getBool('soundEnabled',true);

var table = Ti.UI.createTableView({
	style:Ti.UI.iPhone.TableViewStyle.GROUPED,
	headerTitle: 'Preferences'	
});

var row = Ti.UI.createTableViewRow({
	height:50,
	title: 'Enable Sound'
	});
var sw = Ti.UI.createSwitch({
	right:10,
	value: soundEnabled, 
	});
row.add(sw);

sw.addEventListener('change', function(e){
	Ti.App.Properties.setBool('soundEnabled',e.value);
	//modal.getParent.switchSound(e.value);
	//var parent = modal.getParent();
	modal.main.fireEvent('switchSound', {value: e.value});
});

table.data = [row];
	
modal.add(table);

var done = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.DONE
});

done.addEventListener('click',function(){
	modal.close();
});

modal.setRightNavButton(done);
//modal.add(nav);

//modalWin.open({modal:true});