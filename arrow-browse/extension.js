//send messages and recieve responses from prev-next
var communicate = function(){
  var status = document.getElementById('arrowStatus');
  var statusItems = status.getElementsByTagName('dd');
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {  
	  chrome.tabs.sendMessage(tabs[0].id, {greeting: "helloPN"}, function(response) {
	  	//assign content scripts response values to status list
	  	if (typeof response != 'undefined'){
        status.innerHTML = "<dl><dt>Next</dt><dd>"+response.farewellPN.next+"</dd><dt>Previous</dt><dd>"+response.farewellPN.prev+"</dd></dl>";
	    } else {
	    	//handle error responses
	    	status.innerText = 'No results found. Refreshing may or may not help.';
	    }	
	  });
	});
}
//message content script to reload page for fresh settings
//TODO instead of reload, remove arrow key event listener and rerun init with current settings.
var saveToggle = function(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {  
	  chrome.tabs.sendMessage(tabs[0].id, {greeting: "toggleSave"}, function(response) {});
	});
}
// Saves options to chrome.storage
function save_options() {
  var turnedOff = document.getElementById('offSwitch').checked;
  var checkElements = document.getElementById('elements').value;
  chrome.storage.sync.set({
    turnedOff: turnedOff,
    checkElements: checkElements
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('saveStatus');
    status.textContent = 'Options saved.';
    saveToggle();
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value turnedOff = false and checkElements = links.
  chrome.storage.sync.get({
    turnedOff: false,
    checkElements: 'links'
  }, function(items) {
    document.getElementById('offSwitch').checked = items.turnedOff;
    document.getElementById('elements').value= items.checkElements;
  });
}
//Event control
document.addEventListener('DOMContentLoaded', function(){
	restore_options();
  //request conent scripts selected pages elements
	communicate();
});
document.getElementById('save').addEventListener('click', save_options);