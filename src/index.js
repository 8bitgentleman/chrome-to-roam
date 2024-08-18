import { initializeGraph, batchActions, pull, q } from '@roam-research/roam-api-sdk';

chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "id": "sendToRoam",
    "title": "Send to Roam Research",
    "contexts": ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async function(info, tab) {
  if (info.menuItemId === "sendToRoam") {
    const data = {
      text: info.selectionText,
      url: info.pageUrl
    };
    await sendToAPI(data);
  }
});

chrome.commands.onCommand.addListener(async function(command) {
  if (command === "send-page-url") {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const data = {
      text: tab.title,
      url: tab.url
    };
    await sendToAPI(data);
  }
});

async function sendToAPI(data) {
  let graph;

  const today = new Date();
  const formattedDate = `${("0" + (today.getMonth() + 1)).slice(-2)}-${("0" + today.getDate()).slice(-2)}-${today.getFullYear()}`;

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

  chrome.storage.sync.get(['graphName', 'graphEditToken'], function(result) {
    if (!result.graphName || !result.graphEditToken) {
      alert('Both Graph Name and Graph Edit Token must be set in the extension settings.');
      throw new Error('Both Graph Name and Graph Edit Token must be set in the extension settings.');
    }
    console.log('Values currently are ' + result.graphName + ' and ' + result.graphEditToken);
    graph = initializeGraph({
      token: result.graphEditToken,
      graph: result.graphName,
    });
    console.log("graph", graph);
    batchActions(graph, payload);
  });
}