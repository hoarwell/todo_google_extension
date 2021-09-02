/* global chrome */
chrome.browserAction.onClicked.addListener(function(activeTab){
    let newURL = "https://youngjo.com/";
    chrome.tabs.create({ url: newURL });
});