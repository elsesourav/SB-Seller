// increase decrease button (only switch limit .input)
const numInpLimit = I(".inp.num .inp-limit");

I(".inp.num .inc").click((_, i) => {
   numInpLimit[i].value = parseInt(numInpLimit[i].value) + 1;
   saveData();
});
I(".inp.num .dec").click((_, i) => {
   const val = parseInt(numInpLimit[i].value);
   if (val > 0) {
      numInpLimit[i].value = val - 1;
      saveData();
   }
});

I(".input").on("input", (e) => {
   saveData();
});

const inputs = I(".input.inp-limit");
const textAreaInputs = I("textarea");

// setup
(async () => {
   await chromeStorageGet(storageKey, (val) => {
      values = val;
   });
   inputs.forEach((inp) => {
      inp.value = values[inp.name];
   });

   textAreaInputs.forEach((inp) => {
      inp.value = values[inp.name];
   });
})();

function saveData() {
   inputs.forEach((inp) => {
      values[inp.name] = inp.value;
   });

   textAreaInputs.forEach((inp) => {
      values[inp.name] = inp.value;
   });
   
   chromeStorageSet(storageKey, values);
}
