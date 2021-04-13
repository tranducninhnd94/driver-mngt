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
        method: 'GET',
        url: `/api/v1/object/${objectName}`,
        headers: {
            'Content-Type': 'application/json',
            'X-Device-Identifier': navigator.userAgent
        },
        params: {
            ...requestParams
        }
    };
    return api(requestOptions);
}


function createObject(body) {
    const requestOptions = {
        method: 'POST',
        url: `/api/v1/object`,
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
        method: 'PUT',
        url: `/api/v1/object`,
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
        method: 'DELETE',
        url: `/api/v1/object/${objectName}/${id}`,
        headers: {
            'Content-Type': 'application/json',
            'X-Device-Identifier': navigator.userAgent,
            ...authHeader()
        }
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
        method: 'GET',
        url: `/api/v1/data`,
        headers: {
            'Content-Type': 'application/json',
            'X-Device-Identifier': navigator.userAgent
        },
        params: {
            ...requestParams
        }
    };
    return api(requestOptions);
}