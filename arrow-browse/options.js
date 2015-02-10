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
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and turnedOff = true.
  chrome.storage.sync.get({
    turnedOff: false,
    checkElements: 'links'
  }, function(items) {
    document.getElementById('offSwitch').checked = items.turnedOff;
    document.getElementById('elements').value= items.checkElements;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);