import config from '@COMMON/config';
import axios from 'axios'
import Qs from 'qs'
import wx from 'weixin-js-sdk';
import { isWeixinBrowser, isProdENV, base64Encode } from '@COMMON/util'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

function Wxsdk() {
    this.sdkAxios = axios.create({
        headers: Object.assign(axios.defaults.headers, {
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    })
}

/**
 * 配置微信签名
 */
Wxsdk.prototype.configWx = function(wxSignPackage) {
    if (!isWeixinBrowser() || !isProdENV) {
        return Promise.reject('非微信浏览器，且非prod，不能调用该接口: configWx of wxsdk.js')
    }
    console.log('config:', wxSignPackage)
    // 这里有个坑。用//api.24haowan.com时，nonceStr是大写。用平台时是：noncestr。切换时记得切换
    if (!wxSignPackage.appId || !wxSignPackage.timestamp ||
        !wxSignPackage.nonceStr || !wxSignPackage.signature) {
        return Promise.reject('微信签名参数错误')
    }
    /* 微信接口 */
    wx.config({
        debug: false,
        appId: wxSignPackage.appId,
        timestamp: wxSignPackage.timestamp,
        nonceStr: wxSignPackage.nonceStr,
        signature: wxSignPackage.signature,
        jsApiList: [
            // 所有要调用的 API 都要加到这个列表中
            'onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems',
            // 录音相关
            'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'onVoicePlayEnd', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice',
        ],
    })
    wx.error(err=> {
        console.error('error: configWx of wxsdk.js', err)
    })
    return Promise.resolve('微信签名配置完成')
}

/**
 * 获取微信签名信息(项目走平台的就调用这个接口，独立出来的项目自己在http.js里实现，记得调用wxsdk.configWx())
 */
Wxsdk.prototype.getWxSignPackage = function() {
    if (!isWeixinBrowser() || !isProdENV) {
        return Promise.reject('非微信浏览器，且非prod，不能调用该接口: getWxSignPackage of wxsdk.js')
    }
    let params = {
        url: location.href.split('#')[0]
    }
    return this.sdkAxios.post('/game/gameAjax/GetSignPackage', Qs.stringify(params))
        .then(result=> {
            const wxSignPackage = result.data.data
            this.configWx(wxSignPackage)
            return Promise.resolve(wxSignPackage)
        }).catch(err=> {
            console.error('error: getWxSignPackage of wxsdk.js', JSON.stringify(err))
            return Promise.reject(err)
        })
}

/**
 * 获取微信用户信息(项目走平台的就调用这个接口，独立出来的项目自己在http.js里实现)
 */
Wxsdk.prototype.getWxUserInfo = function() {
    if (!isWeixinBrowser() || !isProdENV) {
        return Promise.reject('非微信浏览器，且非prod，不能调用该接口: getWxUserInfo of wxsdk.js')
    }
    let params = {
        game_id: location.href.match(/game_id\/\d+/) ? location.href.match(/game_id\/\d+/)[0].split('/')[1] : -1,
        isTest: 0,
        key: '',
    }
    let config = {
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        }
    }
    return this.sdkAxios.post('/game/v1/userViewParams', Qs.stringify(params), config)
        .then(result=> {
            const data = result.data
            if (data.code == 0) {
                return Promise.resolve(data.data)
            }
            return Promise.reject(data)
        }).catch(err=> {
            console.error('error: getWxUserInfo of wxsdk.js', JSON.stringify(err))
            return Promise.reject(err)
        })
}

/**
 * 设置微信分享参数，对外接口
 */
Wxsdk.prototype.share = function(opt = {}) {
    if (!isWeixinBrowser() || !isProdENV) {
        return Promise.reject('非微信浏览器，且非prod，不能调用该接口: share of wxsdk.js')
    }
    // 配置分享信息
    wx.ready(() => {
        this.setShareInfo(Object.assign(config.share, opt))
    })
}

/**
 * 设置微信分享参数
 */
Wxsdk.prototype.setShareInfo = function(info) {
    console.log(info)
    // 分享朋友
    wx.onMenuShareAppMessage({
        title: info.title, // 分享标题
        desc: info.desc, // 分享描述
        link: info.link, // 分享链接
        imgUrl: info.imgUrl, // 分享图标
        type: info.type, // 分享类型,music、video或link，不填默认为link
        dataUrl: info.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
        success: () => {
            // 现在微信似乎到了分享界面取消后也会到该回调
            // this.requestShare()
        },
        cancel: () => {
        },
    })
    // 分享朋友圈
    wx.onMenuShareTimeline({
        title: info.title, // 分享标题
        link: info.link, // 分享链接
        imgUrl: info.imgUrl, // 分享图标
        success: () => {
            // this.requestShare()
        },
        cancel: () => {
        },
    })
}

/**
 * 微信分享回调(项目走平台的就调用这个接口，独立出来的项目自己在http.js里实现)
 */
Wxsdk.prototype.requestShare = function() {
    let params = {
        game_id: window.game_id,
    }
    let config = {
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        }
    }
    return this.sdkAxios.post('/GameAjax/ShareGame', Qs.stringify(params), config)
        .then(result=> {
            const data = result.data
            if (data.code == 0) {
                return Promise.resolve(data)
            }
            return Promise.reject(data)
        }).catch(err=> {
            console.error('error: requestShare of wxsdk.js', JSON.stringify(err))
            return Promise.reject(err)
        })
}

/**
 * 根据传入的参数，返回可用于微信分享参数的字符串，有中文会自动编码
 */
Wxsdk.prototype.makeLinkParams = function(params = {}) {
    let result = '?'
    Object.keys(params).forEach(key=> {
        let data = params[key]
        if (data.ignore) {
            data = data.value
        } else {
            data = base64Encode(data)
        }
        result += `${key}=${data}&`
    })
    return result.substr(0, result.length - 1)
}

export default {
    install: function install(Vue) {
        const wxsdk = new Wxsdk()
        window.wxsdk = wxsdk
    }
}