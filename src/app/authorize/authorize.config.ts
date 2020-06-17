import {AuthConfig} from 'angular-oauth2-oidc';


export let authConfig: AuthConfig;
authConfig = {
    loginUrl : 'https://www.strava.com/oauth/authorize',
    redirectUri: window.location.origin + '/index.html',
    tokenEndpoint: 'https://www.strava.com/oauth/token',
    clientId: '49248',
    responseType: 'code',
    scope: 'read_all',
    showDebugInformation: true,
    timeoutFactor: 0.01,
    dummyClientSecret: '',
    oidc: false
};
