//默认请求头
const DEFAULT_HEADER = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
}

const API_ROOT = 'http://nanhang2th-test.custom.24haowan.com'
const API_ROOT_DEV = 'http://nanhang2th-test.custom.24haowan.com'

const API_HOST = (process.env.NODE_ENV === 'production' ? API_ROOT : API_ROOT_DEV)

//配置请求API的映射, 放置在window.API
const API = {
    WX_SIGNPACKAGE: '/wechat/sdk-config', //获取微信jssdk配置
    WX_USERINFO: '/userInfo', //获取用户信息
};

export {
    API,
    API_HOST,
    DEFAULT_HEADER
};
