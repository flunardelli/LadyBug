
function showScore(n){
	mainWindow = Ti.UI.currentWindow;
	
	var completeView = Ti.UI.createView({
		backgroundColor: '#ffffff',
		opacity: 0.8,
		width: '300',
		height: '200',
		borderRadius: 20
	})
	
	var completeLabelTitle = Titanium.UI.createLabel({
		text: 'Stage Clear',
		height:'auto',
		width:'auto',
		shadowColor:'#eeeeee',
		shadowOffset:{x:3,y:3},
		color:'#000000',
		font:{fontSize:24, fontStyle:'bold'},
		top: 20,
		textAlign:'center'
	});
	
	var completeLabel = Titanium.UI.createLabel({
		height:'auto',
		width:'auto',
		shadowColor:'#eeeeee',
		shadowOffset:{x:3,y:3},
		color:'#000000',
		font:{fontSize:48, fontStyle:'bold'},
		top:50,
		textAlign:'center',
		text: n
	});
	
	var completeButton = Ti.UI.createButton({
		title: 'Next level',
		top: 110,
		width: 200,
		height: 50
	});
	
	completeButton.addEventListener('click',function(){		

		if (mainWindow.children[0]){
			mainWindow.remove(mainWindow.children[0]);
		}
				
		mainWindow.close();
		mainWindow.open();
		if (mainWindow.level < 20) {
			mainWindow.level += 1;
		}
		//alert(mainWindow.children.length);
		
	});
	
	
	completeView.add(completeLabelTitle);
	completeView.add(completeLabel);
	completeView.add(completeButton);
	
	mainWindow.children[0].add(completeView);	
}
