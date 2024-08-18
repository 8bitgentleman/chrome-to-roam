document.addEventListener('DOMContentLoaded', function() {
    var saveButton = document.getElementById('saveButton');
    var graphNameInput = document.getElementById('graphName');
    var graphEditTokenInput = document.getElementById('graphEditToken');
  
    chrome.storage.sync.get(['graphName'], function(result) {
      graphNameInput.placeholder = result.graphName || 'Enter Graph Name';
    });
    chrome.storage.sync.get(['graphEditToken'], function(result) {
      graphEditTokenInput.placeholder = result.graphEditToken || 'xxxx';
    });
  
    function updateButtonState() {
      saveButton.disabled = !(graphNameInput.value && graphEditTokenInput.value);
    }
  
    graphNameInput.oninput = updateButtonState;
    graphEditTokenInput.oninput = updateButtonState;
  
    saveButton.onclick = function() {
      var graphName = graphNameInput.value;
      var graphEditToken = graphEditTokenInput.value;
      chrome.storage.sync.set({ 'graphName': graphName, 'graphEditToken': graphEditToken }, function() {
        console.log('Values are set to ' + graphName + ' and ' + graphEditToken);
        alert("Graph Token Saved");
      });
    };
  });