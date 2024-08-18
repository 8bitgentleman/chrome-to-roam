import { initializeGraph, batchActions } from '@roam-research/roam-api-sdk';

// Promisify chrome.tabs.query
function queryTabs(queryInfo) {
  return new Promise((resolve, reject) => {
    chrome.tabs.query(queryInfo, (result) => {
      if (chrome.runtime.lastError) {
        return reject(new Error(chrome.runtime.lastError));
      }
      resolve(result);
    });
  });
}

// Promisify chrome.storage.sync.get
function getStorageSync(keys) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(keys, (result) => {
      if (chrome.runtime.lastError) {
        return reject(new Error(chrome.runtime.lastError));
      }
      resolve(result);
    });
  });
}

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    "id": "sendToRoam",
    "title": "Send to Roam Research",
    "contexts": ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async function (info, tab) {
  if (info.menuItemId === "sendToRoam") {
    const data = {
      text: info.selectionText,
      url: info.pageUrl
    };
    await sendToAPI(data);
  }
});

chrome.commands.onCommand.addListener(async function (command) {
  if (command === "send-page-url") {
    try {
      const [tab] = await queryTabs({ active: true, currentWindow: true });
      const data = {
        text: tab.title,
        url: tab.url
      };
      await sendToAPI(data);
    } catch (error) {
      console.error('Error querying tabs:', error);
    }
  }
});

async function sendToAPI(data) {
  try {
    const today = new Date();
    const formattedDate = `${("0" + (today.getMonth() + 1)).slice(-2)}-${("0" + today.getDate()).slice(-2)}-${today.getFullYear()}`;
    let payload;

    if (data.url) {
      payload = {
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
              "string": `[${data.text}](${data.url})`,
              "order": "last"
            }
          },
        ]
      };
    } else {
      payload = {
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
    }


    const result = await getStorageSync(['graphName', 'graphEditToken']);
    if (!result.graphName || !result.graphEditToken) {
      alert('Both Graph Name and Graph Edit Token must be set in the extension settings.');
      throw new Error('Both Graph Name and Graph Edit Token must be set in the extension settings.');
    }

    const graph = initializeGraph({
      token: result.graphEditToken,
      graph: result.graphName,
    });
    await batchActions(graph, payload);
    console.log("Data sent to Roam successfully");
  } catch (error) {
    console.error('Error sending data to API:', error);
  }
}