import Vue from 'vue';
import { isWeixinBrowser } from './util';

export default {
    install: function install(Vue) {
        // xx_id(game_id)是需要截取的数字的前面字符串，有些需要映射响应gameid，有点项目直接配置gameid。
        // const gameInfo= {
        //     id: location.href.match(/game_id\/\d+/) ? location.href.match(/game_id\/\d+/)[0].split('/')[1] : null,
        // };
        let bus = new Vue({
            data: {
                // 游戏ID
                userInfo: {
                    avatar: '',
                    name: '',
                    openId: ''
                },
                isWeixinBrowser: isWeixinBrowser,
                audiosUrl: {
                    bg: '//24haowan-cdn.shanyougame.com/dingzhi/vmeshou/bgm2.mp3'
                },
                ready: false,
                gameid: ''
            }
        });

        Vue.prototype.$bus = bus;
    }
};
