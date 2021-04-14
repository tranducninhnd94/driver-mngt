import { authHeader, api } from '../_helpers';

export const systemService = {
    loadObject,
    createObject,
    updateObject,
    deleteObject,
    loadOneObject,
    searchData

}

function loadObject(objectName, requestParams) {
    const requestOptions = {
        method: 'POST',
        url: `/api/v1/search`,
        headers: {
            'Content-Type': 'application/json',
            'X-Device-Identifier': navigator.userAgent
        },
        data: JSON.stringify({ type: objectName, ...requestParams })
    };
    return api(requestOptions);
}


function createObject(body) {
    const requestOptions = {
        method: 'POST',
        url: `/add`,
        headers: {
            'Content-Type': 'application/json',
            'X-Device-Identifier': navigator.userAgent,
            ...authHeader()
        },
        data: JSON.stringify(body)
    };
    return api(requestOptions);
}

function updateObject(body) {
    const requestOptions = {
        method: 'POST',
        url: `/update`,
        headers: {
            'Content-Type': 'application/json',
            'X-Device-Identifier': navigator.userAgent,
            ...authHeader()
        },
        data: JSON.stringify(body)
    };
    return api(requestOptions);
}

function deleteObject(objectName, id) {
    const requestOptions = {
        method: 'POST',
        url: `/delete`,
        headers: {
            'Content-Type': 'application/json',
            'X-Device-Identifier': navigator.userAgent,
            ...authHeader()
        },
        data: JSON.stringify({ objectName, id })
    };
    return api(requestOptions);
}

function loadOneObject(objectName, id) {
    const requestOptions = {
        method: 'GET',
        url: `/api/v1/object/${objectName}/${id}`,
        headers: {
            'Content-Type': 'application/json',
            'X-Device-Identifier': navigator.userAgent,
            ...authHeader()
        }
    };
    return api(requestOptions);
}

function searchData(requestParams) {
    const requestOptions = {
        method: 'POST',
        url: `/search/data`,
        headers: {
            'Content-Type': 'application/json',
            'X-Device-Identifier': navigator.userAgent
        },
        data: JSON.stringify(requestParams)
    };
    return api(requestOptions);
}