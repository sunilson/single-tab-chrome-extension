chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({
        activated: true
    }, function () {});

    /*
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {
                    hostEquals: 'developer.chrome.com'
                },
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
    */

    chrome.windows.onCreated.addListener(function (window) {
        console.log(window)
        chrome.windows.getAll({
            windowTypes: [
                "normal",
                "popup",
                "panel",
                "app",
                "devtools"
            ]
        }, function (windows) {
            console.log(windows)
            chrome.storage.sync.get("activated", function (data) {
                if (data.activated) {
                    if (windows.length > 1) chrome.windows.remove(window.id, () => {
                        console.log("removed window", window)
                    })
                }
                setIcon(data.activated)
            })
        })
    }, {
        windowTypes: [
            "normal",
            "popup",
            "panel",
            "app",
            "devtools"
        ]
    })

    chrome.tabs.onCreated.addListener(function (tab) {
        chrome.storage.sync.get("activated", function (data) {
            if (data.activated) {
                chrome.tabs.remove(tab.id, function () {})
            }
            setIcon(data.activated)
        })
    })

    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.activated != null && request.activated != "undefined") {
                setIcon(request.activated)
            }
        });
})

function setIcon(activated) {
    if (activated) {
        chrome.browserAction.setIcon({
            path: {
                "16": "images/get_started16.png",
                "32": "images/get_started32.png",
                "48": "images/get_started48.png",
                "128": "images/get_started128.png"
            }
        });
    } else {
        chrome.browserAction.setIcon({
            path: {
                "16": "images/disabled16.png",
                "32": "images/disabled32.png",
                "48": "images/disabled48.png",
                "128": "images/disabled128.png"
            }
        });
    }
}