let activationButton = document.getElementById('activate');

let activated = true;

chrome.storage.sync.get('activated', function (data) {
    if (data.activated != null && data.activated != "undefined") activated = data.activated;
    updateButton()

    //changeColor.style.backgroundColor = data.color;
    //changeColor.setAttribute('value', data.color);
});

activationButton.onclick = function (element) {
    activated = !activated
    chrome.storage.sync.set({
        activated: activated
    }, function () {})
    updateButton()

    /*
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id, {
                code: 'document.body.style.backgroundColor = "' + color + '";'
            });
    });
    */
};

function updateButton() {
    if (activated) activationButton.innerHTML = "Deactivate"
    else activationButton.innerHTML = "Activate"
}