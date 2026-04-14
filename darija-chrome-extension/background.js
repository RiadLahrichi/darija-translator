// === EVENT: Extension Installed ===
// This runs once when the user first installs the extension,
// or when they update it. We use it to create the right-click menu item.
chrome.runtime.onInstalled.addListener(() => {

  chrome.contextMenus.create({
    id: "translate-darija",       // A unique ID so we can identify which menu item was clicked
    title: "Translate to Darija", // The text the user sees in the right-click menu
    contexts: ["selection"]       // Only show this menu item when text is selected
                                  // Other options: "page", "link", "image", "all"
  });
});
chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.open({ tabId: tab.id });
});

// === EVENT: Context Menu Clicked ===
// This fires every time the user clicks any context menu item we created.
chrome.contextMenus.onClicked.addListener((info, tab) => {

  // `info` contains details about what was clicked:
  //   info.menuItemId   → which menu item ("translate-darija")
  //   info.selectionText → the text the user highlighted
  //
  // `tab` contains info about the current tab:
  //   tab.id → we need this to open the side panel on the right tab

  if (info.menuItemId === "translate-darija" && info.selectionText) {

    // Step 1: Open the side panel on this tab
    chrome.sidePanel.open({ tabId: tab.id });

    // Step 2: Wait a moment for the side panel to load, then send it the selected text.
    // We use a small delay because the side panel HTML needs time to load and
    // register its message listener before we can send messages to it.
    setTimeout(() => {
      chrome.runtime.sendMessage({
        action: "translate",
        text: info.selectionText
      });
    }, 500);
  }
});