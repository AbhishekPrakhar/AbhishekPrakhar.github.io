let baseUrl=window.location.origin;
let redirectUri=encodeURI(window.location.href);

export const urlStrings = {
     URLRedirectToMainHome: baseUrl + '/analytics/home',
     logoutURL:'http://172.21.203.98:8080/auth/realms/Dev_Env/protocol/openid-connect/logout?redirect_uri='+redirectUri

    }
