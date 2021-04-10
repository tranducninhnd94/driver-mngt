import axios from 'axios';

const requestProcess = request => {

    if (request.headers) {
        request.headers = {
            ...request.headers,
            'X-Device-Identifier': navigator.userAgent
        }
    } else {
        request.headers = {
            'X-Device-Identifier': navigator.userAgent
        }
    }

    if (request.url && request.url.indexOf('http') === -1) {
        request.url = "http://localhost:8080" + request.url;
    }

    return request;
}

axios.interceptors.request.use(
    config => {
        // Do something before request is sent
        console.log("axios.interceptors.request")
        return config;
    },
    function (error) {
        // Do something with request error
        console.log("error axios.interceptors.request")
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => {
        // Do something with response data
        console.log("axios.interceptors.response")
        return response;
    },
    error => {
        // if (EEXIST)
        //     // Do something with response error
        //     window.location.href = '#/logout';

        console.log("error axios.interceptors.response")
        return Promise.reject(error);
    }
);

export const api = request => {
    return axios(requestProcess({ ...request }));
};
