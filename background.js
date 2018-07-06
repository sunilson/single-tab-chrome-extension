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

    chrome.tabs.onCreated.addListener(function (tab) {
        chrome.storage.sync.get("activated", function (data) {
            if (data.activated) {
                chrome.tabs.remove(tab.id, function () {
                    alert("closed")
                })
            }
        })
    })
})