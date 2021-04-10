import Cookie from 'js-cookie';

export function authHeader() {
    // return authorization header with jwt token
    let accessToken = Cookie.get("access_token");

    if (accessToken) {
        return { 'Authorization': 'Bearer ' + accessToken };
    } else {

        return {};
    }
}
