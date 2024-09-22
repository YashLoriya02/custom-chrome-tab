chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "getTabCount") {
        chrome.tabs.query({}, (tabs) => {
            sendResponse({ tabCount: tabs.length });
        });
        return true;
    }
});
