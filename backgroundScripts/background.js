importScripts("./../utils.js");
importScripts("./bgUtils.js");

chromeStorageGet(storageKey, (val) => {
   if (!val) {
      chromeStorageSet(storageKey, values);
   } else {
      values = val;
   }
});

runtimeOnMessage("c_b", (request, _, sendResponse) => {
   chromeStorageGet(storageKey, (val) => {
      sendResponse(val);
   });
});