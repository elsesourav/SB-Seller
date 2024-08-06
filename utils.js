"use strict";

const storageKey = "SB_Seller";

let values = {
   listing_status: "ACTIVE",
   minimum_order_quantity: "1",
   service_profile: "NON_FBF",
   procurement_type: "REGULAR",
   shipping_days: 2,
   stock_size: 30,
   shipping_provider: "FLIPKART",
   local_shipping_fee_from_buyer: 0,
   zonal_shipping_fee_from_buyer: 0,
   national_shipping_fee_from_buyer: 0,
   hsn: 1209,
   tax_code: "GST_5",
   country_of_origin: "IN",
   manufacturer_details: "SBarui",
   packer_details: "SBarui",
   importer_details: "",
   earliest_mfg_date: "2024-07-28",
   shelf_life: 12,
   weight_p0: 0.03,
   length_p0: 17,
   breadth_p0: 16,
   height_p0: 3,
};

/* ----  local storage set and get ---- */
function setDataFromLocalStorage(key, object) {
   let data = JSON.stringify(object);
   localStorage.setItem(key, data);
}

function getDataFromLocalStorage(key) {
   return JSON.parse(localStorage.getItem(key));
}

function reloadLocation() {
   window.location.reload();
}

// create element
const CE = (tagName, className = [], inrHtml = "", parent = null) => {
   const e = document.createElement(tagName);
   if (className) e.classList.add(...className);
   if (inrHtml) e.innerHTML = inrHtml;
   if (parent) parent.appendChild(e);
   return e;
};

function setDataToLocalStorage(key, object) {
   var data = JSON.stringify(object);
   localStorage.setItem(key, data);
}
function getDataToLocalStorage(key) {
   return JSON.parse(localStorage.getItem(key));
}

function OBJECTtoJSON(data) {
   return JSON.stringify(data);
}
function JSONtoOBJECT(data) {
   return JSON.parse(data);
}

/* ----------- extension utils ----------- */
function getActiveTab() {
   return new Promise((resolve) => {
      chrome.tabs.query(
         {
            currentWindow: true,
            active: true,
         },
         (tabs) => {
            console.log(tabs);
            resolve(tabs[0]);
         }
      );
   });
}

function getFormatTime(t) {
   const date = new Date(0);
   date.setSeconds(t);
   return date.toISOString().substr(11, 8);
}

function runtimeSendMessage(type, message, callback) {
   chrome.runtime.sendMessage({ ...message, type }, (response) => {
      callback && callback(response);
   });
}

function tabSendMessage(tabId, type, message, callback) {
   chrome.tabs.sendMessage(tabId, { ...message, type }, (response) => {
      callback && callback(response);
   });
}

function runtimeOnMessage(type, callback) {
   chrome.runtime.onMessage.addListener((message, sender, response) => {
      if (type === message.type) {
         callback(message, sender, response);
      }
      return true;
   });
}

/**
 * @param {number} ms
 **/
function wait(ms) {
   return new Promise((resolve) => setTimeout(resolve, ms));
}

function chromeStorageSet(key, value, callback) {
   let items = {};
   items[key] = value;
   chrome.storage.sync.set(items, function () {
      if (chrome.runtime.lastError) {
         console.error("Error setting item:", chrome.runtime.lastError);
      } else if (callback) {
         callback();
      }
   });
}
// Example usage:
// chromeStorageSet("myKey", "myValue", function () {
//    console.log("Item set");
// });

function chromeStorageGet(key, callback) {
   return new Promise((resolve) => {
      chrome.storage.sync.get([key], function (result) {
         if (chrome.runtime.lastError) {
            console.error("Error getting item:", chrome.runtime.lastError);
         } else if (callback) {
            callback(result[key]);
            resolve(true);
         }
      });
   });
}

const debounce = (func, delayFn) => {
   let debounceTimer;
   return function (...args) {
      const context = this;
      const delay = delayFn();
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
   };
};
