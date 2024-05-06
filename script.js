chrome.contextMenus.onClicked.addListener(searchClick);

function isKanji(input) {
  console.log("isKanji input:", input);
  if (input.length > 1) return false;

  // Ranges 4e00 - 9faf and 3400 - 4dbf are Kanji in Unicode
  return (input >= "\u4e00" && input <= "\u9faf") || (input >= "\u3400" && input <= "\u4dbf");
}

function searchClick(info) {
  const searchURL = "https://www.jisho.org/search/" + info.selectionText;
  chrome.tabs.create({ url: searchURL });
}

chrome.runtime.onInstalled.addListener((e) => {
  chrome.contextMenus.create({
    title: "Look up ''%s'' on Jisho.org",
    contexts: ["selection"],
    id: "jishosearch",
  });
  /* chrome.contextMenus.create({
    title: "Open Kanji entry for ''%s'' on Jisho.org",
    contexts: ["selection"],
    id: "jishosearchkanji",
  }); */
});
