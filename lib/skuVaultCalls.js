const axios = require('axios');

// dev only, remove at production
require('dotenv').config({path: '../.env'});

const urlRoot = 'https://app.skuvault.com/api/';

async function getInventoryByLocation() {
  try {
    const response = await axios({
      method: 'POST',
      url: urlRoot + 'inventory/getInventoryByLocation',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: {
        IsReturnByCodes: false,
        PageNumber: 0,
        ProductSKUs: [],
        ProductCodes: [],
        TenantToken: process.env.SV_TENANT_TOKEN,
        UserToken: process.env.SV_USER_TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

getInventoryByLocation()
  .then(response => {
    const items = response.Items;
    for (const sku in items) {
      if (items.hasOwnProperty(sku) && items[sku].length > 0) {
        console.log(items[sku]);
      }
    }
  })
  .catch(error => console.log(error));
