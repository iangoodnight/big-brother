const axios = require('axios');

// dev only, remove at production
require('dotenv').config();

function BuildRequest(endpoint, body) {
  const tenantToken = process.env.SV_TENANT_TOKEN;
  const userToken = process.env.SV_USER_TOKEN;
  const baseUrl = 'https://app.skuvault.com/api/';

  body.TenantToken = tenantToken;
  body.UserToken = userToken;

  const call = axios.post(baseUrl + endpoint, body);

  return call;
}

const getInventory = new BuildRequest('inventory/getInventoryByLocation', {
  IsReturnByCodes: false,
  PageNumber: 0,
  ProductSKUs: [],
});

getInventory
//console.log(process.env);
