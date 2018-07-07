let activationButton = document.getElementById('activate');
let yesButton = document.getElementById('yesButton');
let noButton = document.getElementById('noButton');
let confirmSegment = document.getElementById('confirm');

let activated = true;

chrome.storage.sync.get('activated', function (data) {
    if (data.activated != null && data.activated != "undefined") activated = data.activated;
    updateButton()
});

yesButton.onclick = function (element) {
    closeAllButOneTab()
    activationButton.style.display = "block"
    confirmSegment.style.display = "none"
}

noButton.onclick = function (element) {
    activationButton.style.display = "block"
    confirmSegment.style.display = "none"
}

activationButton.onclick = function (element) {
    if (!activated) {

        let windowCount = 0;
        let tabCount = 0;

        chrome.windows.getAll(function (windows) {
            windowCount = windows.length
            chrome.tabs.query({
                currentWindow: true
            }, function (tabs) {
                tabCount = tabs.length;
                if (windowCount > 1 || tabCount > 1) {
                    activationButton.style.display = "none"
                    confirmSegment.style.display = "block"
                } else {
                    closeAllButOneTab()
                }
            })
        });
    } else {
        toggleActivation()
    }
};

function closeAllButOneTab() {
    let firstTab = null

    chrome.windows.getAll({
        populate: true
    }, function (windows) {
        windows.forEach(function (window) {
            window.tabs.forEach(function (tab) {
                if (!firstTab) firstTab = tab
                else {
                    chrome.tabs.remove(tab.id, function () {})
                }
                //collect all of the urls here, I will just log them instead
            });
            toggleActivation()
        });
    });
}

function toggleActivation() {
    activated = !activated
    chrome.storage.sync.set({
        activated: activated
    }, function () {
        chrome.runtime.sendMessage({
            "activated": activated
        });
    })
    updateButton()
}

function updateButton() {
    if (activated) {
        activationButton.innerHTML = "Deactivate"
        activationButton.classList.remove("active")
    } else {
        activationButton.innerHTML = "Activate"
        activationButton.classList.add("active")
    }


}