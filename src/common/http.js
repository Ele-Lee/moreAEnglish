import axios from 'axios';
import Qs from 'qs'
import { API, API_HOST, DEFAULT_HEADER } from './api';

const selfAxios = axios.create({
    baseURL: API_HOST,
    headers: Object.assign(axios.defaults.headers, DEFAULT_HEADER)
})

selfAxios.interceptors.request.use((config)=> {
    // 配置公共header
    // let entrance = getCookie('entrance')
    // let jwt = getCookie(`_entry_${entrance}_sid`)
    // if (jwt) {
    //     config.headers.Authorization = `Bearer ${jwt}`
    // }
    return config
}, (error)=> {
    return Promise.reject(error)
})

// Add a response interceptor
selfAxios.interceptors.response.use((response)=> {
    if (response.data.code == 0) {
        return response.data
    }
    return Promise.reject('请求失败', response)
}, (error)=> {
    return Promise.reject(error)
})

const getCookie = (name) => { 
    let reg=new RegExp("(^| )" + name + "=([^;]*)(;|$)")
 
    let arr
    if(arr = document.cookie.match(reg)) {
        return unescape(arr[2])
    }
    return null
}

export default {
    getWxSignPackage: (url = window.location.href.split('#')[0])=> {
        return selfAxios.get(API.WX_SIGNPACKAGE, {params: {url: url}}).then(data=> {
            // 传入的data需要看看接口返回的数据是否包多一层payload等等
            console.log(data)
            return wxsdk.configWx(data)
        })
    },
    getWxUserInfo: ()=> selfAxios.get(API.WX_USERINFO),
    // testPost: (params = {})=> axios.post('', Qs.stringify(params)), post方法的例子
    // testPut: (params = {})=> axios.put('', Qs.stringify(params)) put方法的例子
};
