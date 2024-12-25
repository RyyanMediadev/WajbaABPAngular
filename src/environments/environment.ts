import { Environment } from '@abp/ng.core';

const baseUrl = 'https://wajbaapi-08765bdfe115.herokuapp.com/';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'Wajba',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: baseUrl,
    redirectUri: baseUrl,
    clientId: 'Wajba_App',
    responseType: 'code',
    scope: 'offline_access Wajba',
    requireHttps: true,
  },
  apis: {
    default: {
      url: baseUrl,
      rootNamespace: 'Wajba',
    },
  },
} as Environment;
