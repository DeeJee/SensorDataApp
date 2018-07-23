import { SignalRConfiguration } from "ng2-signalr";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {  
  production: false,
  services: {
    sensorDataService: {
      host: "https://iotsensordata.azurewebsites.net:443",
      //host: "https://localhost:44374",
      baseUrl: "/api"
    }
  },

  adalConfig: {
    tenant: 'd8a301f0-aca0-4e3f-91a4-abcc333dd26b',
    clientId: '1af2a885-6aed-4fbf-8866-51321da47926',
    redirectUri: 'http://localhost:4200',
    ///redirectUri: 'https://sensordataapp.azurewebsites.net',
    cacheLocation: 'localStorage'
  }
};
