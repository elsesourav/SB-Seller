const createNewTab = (url) => {
   return new Promise((resolve) => {
      chrome.tabs.create({ url: url }, (tab) => resolve(tab.id));
   });
};

function tabUpdate(tabId, newUrl) {
   return new Promise(async (resolve) => {
      await chrome.tabs.update(tabId, { url: newUrl });
      resolve(true);
   });
 }
 

const getNeededAgent = (pc_limit, mobile_limit) => {
   return pc_limit === false && mobile_limit > 0 ? userAgent.mobile : userAgent.pc;
};

const updateStorageDefaultSwitch = (name, is) => {
   chromeStorageGet(storageKey, (values) => {
      const { defaultSwitches } = values;
      defaultSwitches[name] = is;
      chromeStorageSet(storageKey, values);
   });
}