import axios from "axios";
import {Message} from "element-ui";
import router from "@/router";
import qs from "qs";

/**
 * 请求拦截器
 */
axios.interceptors.request.use(config => {
    //如果token存在,请求头携带这个token
    if (window.sessionStorage.getItem('tokenStr')) {
        config.headers['Authorization'] = window.sessionStorage.getItem('tokenStr');
    }
    return config;
}, error => {
    console.log(error);
})


/**
 * 响应拦截器
 */
axios.interceptors.response.use(success => {
    //业务逻辑错误
    if (success.status && success.status === 200) {
        if (success.data.code === 500 || success.data.code === 401 || success.data.code === 403) {
            Message.error({message: success.data.message});
            return;
        }
        //操作成功时的提示信息
        if (success.data.message) {
            Message.success({message: success.data.message});
        }
    }
    return success.data;
}, error => {
    if (error.response.code === 504 || error.response.code === 404) {
        Message.error({message: '服务器无法访问'});
    } else if (error.response.code === 403) {
        Message.error({message: '权限不足'});
    } else if (error.response.code === 401) {
        Message.error({message: '尚未登录,请登录'});
        router.replace('/');
    } else {
        if (error.response.data.message) {
            Message.error({message: error.response.data.message});
        } else {
            Message.error({message: '未知错误'});
        }
    }
});

let base = '';

/**
 * post请求
 * @param url
 * @param params
 * @returns {AxiosPromise}
 */
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        params: params,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        paramsSerializer: params => {
            return qs.stringify(params, {indices: false})
        }
    });
}

/**
 * get请求
 * @param url
 * @param params
 * @returns {AxiosPromise}
 */
export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        params: params,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    });
}

/**
 * put请求
 * @param url
 * @param params
 * @returns {AxiosPromise}
 */
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        params: params,
        //headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });
}

/**
 * delete请求
 * @param url
 * @param params
 * @returns {AxiosPromise}
 */
export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        params: params,
        //headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });
}