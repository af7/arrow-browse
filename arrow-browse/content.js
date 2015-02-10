var targets = {};
function getSettings() {
	// Use default element = 'links' and turnedOff = true.
	var userSettings={};
	chrome.storage.sync.get({
		turnedOff: false,
		checkElements: 'links'
	}, function(items) {
		var userSettings ={};
		userSettings.turnedOff = items.turnedOff;
		userSettings.checkElements = items.checkElements;
		init(userSettings);
	});
}
function getElements(element){
	// convert 'links' string to 'a' element
	if (element == 'links'){element='a'}
	var elems = document.getElementsByTagName(element);
	var prevElems = [];
	var nextElems = [];
	//some jerks refer to previous as nextoldest
	var REGnext = new RegExp('next(?!oldest)'); //
	var REGprev = new RegExp('(prev|nextoldest)');
	//assign links to next or previous arrays
	for (i=0, k=elems.length; i<k; i++) {
		var r = elems[i].outerHTML.toLowerCase();
		if (REGnext.test(r)){
			nextElems.push(elems[i]);
		}
		else if (REGprev.test(r)){
			prevElems.push(elems[i]);
		}
	}
	relevantElems={prev:prevElems, next:nextElems};
	return relevantElems;
}
function arrowListen(){
	window.addEventListener("keydown", function (event) {
		switch (event.keyCode) {
			case 37:
				targets.prev[0].click();
				break;
			case 39:
				//right click
				targets.next[0].click();
				break;
			default:
				return; // Quit when this doesn't handle the key event.
		}
	}, true);
}
//recieve and respond to messages from arrow-status.js
function communicate(){
	//elems to be sent to eString
	var eString={}
	eString.next = targets.next.length >0 ? targets.next[0].toString() : "No item found";
	eString.prev = targets.prev.length >0 ? targets.prev[0].toString() : "No item found";
	
	chrome.runtime.onMessage.addListener(
	  function(request, sender, sendResponse) {
	    if (request.greeting == "helloPN")
	      sendResponse({farewellPN: eString });
	  	else if (request.greeting == "toggleSave") {
	  		location.reload();
	  	}
	  });
}
function init(options){
	targets=getElements(options.checkElements);
	communicate(targets);
	if (!!options.turnedOff) {return;}
	arrowListen();
}
getSettings();
