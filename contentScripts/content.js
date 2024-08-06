let isOpenPanel = false;

function getValues() {
   return new Promise((resolve) => {
      runtimeSendMessage("c_b", {}, (r) => {
         resolve(r);
      });
   });
}

function setValue(element, value) {
   element[0].value = value;
   const event = new Event("change", { bubbles: true });
   element[0].dispatchEvent(event);
}

async function onlySetup() {
   await wait(100);
   values = await getValues();
   await wait(100);

   setValue(I("#listing_status"), values.listing_status);
   setValue(I("#minimum_order_quantity"), values.minimum_order_quantity);
   setValue(I("#service_profile"), values.service_profile);
   setValue(I("#procurement_type"), values.procurement_type);
   setValue(I("#shipping_days"), values.shipping_days);
   setValue(I("#stock_size"), values.stock_size);

   setValue(I("#shipping_provider"), values.shipping_provider);
   setValue(I("#local_shipping_fee_from_buyer"), values.local_shipping_fee_from_buyer);
   setValue(I("#zonal_shipping_fee_from_buyer"), values.zonal_shipping_fee_from_buyer);
   setValue(I("#national_shipping_fee_from_buyer"), values.national_shipping_fee_from_buyer);

   setValue(I(`input[name="length_p0"]`), values.length_p0);
   setValue(I(`input[name="breadth_p0"]`), values.breadth_p0);
   setValue(I(`input[name="height_p0"]`), values.height_p0);
   setValue(I(`input[name="weight_p0"]`), values.weight_p0);

   setValue(I(`#hsn`), values.hsn);
   setValue(I("#tax_code"), values.tax_code);
   setValue(I(`#country_of_origin`), values.country_of_origin);
   setValue(I(`#manufacturer_details`), values.manufacturer_details);
   setValue(I(`#packer_details`), values.packer_details);

   if (I(`#importer_details`)[0])
   setValue(I(`#importer_details`), values.importer_details);
   setValue(I(`#earliest_mfg_date`), values.earliest_mfg_date);
   setValue(I(`#shelf_life`), values.shelf_life);
}


document.body.click(() => {
   setTimeout(() => {
      if (I(".ReactModalPortal").length > 0 && !isOpenPanel) {
         isOpenPanel = true;

         // setup the modal panel
         onlySetup();
      } else if (I(".ReactModalPortal").length === 0) {
         isOpenPanel = false;
      }
   }, 500);
});
