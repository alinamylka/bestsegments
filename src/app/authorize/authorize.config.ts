import {AuthConfig} from 'angular-oauth2-oidc';


export let authConfig: AuthConfig;
authConfig = {
    loginUrl: 'https://www.strava.com/oauth/authorize',
    redirectUri: window.location.origin + '/challenges',
    tokenEndpoint: 'https://www.strava.com/oauth/token',
    clientId: '49248',
    responseType: 'code',
    scope: 'read_all',
    showDebugInformation: true,
    timeoutFactor: 0.01,
    silentRefreshTimeout: 36000,
    dummyClientSecret: '4449ea3ae9938d9ec7766a53bf271d875580ec9f',
    oidc: false
};
