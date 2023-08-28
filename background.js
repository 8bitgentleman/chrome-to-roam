chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
      "id": "sendToRoam",
      "title": "Send to Roam Research",
      "contexts": ["selection"]
    });
  });
  
chrome.contextMenus.onClicked.addListener(function(info, tab) {
if (info.menuItemId === "sendToRoam") {
    const data = {
    text: info.selectionText,
    url: info.pageUrl
    };
    sendToAPI(data);
}
});

function sendToAPI(data) {
    // Replace with your actual graph name and token
    const graphName = "";
    const token = "";

    const apiEndpoint = `https://api.roamresearch.com/api/graph/${graphName}/write`;

    // Get today's date and format it
    const today = new Date();
    const formattedDate = `${("0" + (today.getMonth() + 1)).slice(-2)}-${("0" + today.getDate()).slice(-2)}-${today.getFullYear()}`;
  

    // {
    //     "action": "create-block",
    //     "location": {
    //       "parent-uid": -2,
    //       "order": "last"
    //     },
    //     "block": {
    //       "string": `Source::${data.url}`,
    //       "uid": -2
    //     }
    // }

    const payload = {
        "action": "batch-actions",
        "actions": [
          {
            "action": "create-block",
            "location": {
              "parent-uid": formattedDate,
              "order": "last"
            },
            "block": {
              "string": "#inbox",
              "uid": -1
            }
          },
          {
            "action": "create-block",
            "location": {
              "parent-uid": -1,
              "order": "last"
            },
            "block": {
              "string": data.text,
              "uid": -2
            }
          },
          {
            "action": "create-block",
            "location": {
              "parent-uid": -2,
              "order": "last"
            },
            "block": {
                "string": `Source::${data.url}`,
            }
          }
        ]
      };

    fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Check if the response body is empty
        return response.text().then(text => text ? JSON.parse(text) : {})
      })
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }