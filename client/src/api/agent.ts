import axios, { AxiosError, AxiosResponse } from "axios";
import { error } from "console";
import { toast } from "react-toastify";
import React from "react";
import { resolve } from "path";
import { ProductParams } from "../app/models/Products";
import { PaginatedResponse } from "../app/models/Pagination";
import { store } from "../features/store/configureStore";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.interceptors.request.use(config => {
    const token = store.getState().account.user?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
        return response;
    }
    return response
}, (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 500:
            toast.error(data.title);
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
})

const requests =
{
    get: (url: string, params?: URLSearchParams) => axios.get(url, { params }).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list: (params: URLSearchParams) => requests.get('product', params),
    details: (id: number) => requests.get(`product/${id}`),
    filters: () => requests.get('product/details')
}

const Account = {
    login: (Values: any) => requests.post('account/login', Values),
    register: (Values: any) => requests.post('account/register', Values),
    currentUser: () => requests.get('account/currentUser'),
}

const TestErrors =
{
    Get404Error: () => requests.get('Buggy/Not-Found'),
    GetBadRequestError: () => requests.get('Buggy/Bad-Request'),
    GetUnAuthorisedError: () => requests.get('Buggy/Unauthorised-user'),
    GetValidationError: () => requests.get('Buggy/Validation-error'),
    GetServerError: () => requests.get('Buggy/Server-error'),
}

const Basket =
{
    get: () => requests.get('basket'),
    additem: (productId: number, quantity = 1) => requests.post(`Basket?productId=${productId}&quantity=${quantity}`, {}),
    removeitem: (productId: number, quantity = 1) => requests.delete(`Basket?productId=${productId}&quantity=${quantity}`),
}

const Orders =
{
    list: () => requests.get('Order'),
    fetch: (id: number) => requests.get(`Order/${id}`),
    createOrder: (Values: any) => requests.post('Order', Values),
}

const agent = {
    Catalog,
    TestErrors,
    Basket,
    Account,
    Orders
}

export default agent;

