export default {
    // 分享文案
    share: {
        title: '分享标题',
        desc: '分享描述',
        link: window.location.href.split('#')[0],
        imgUrl: '',
        type: 'link',
        dataUrl: ''
    },
    imgs: [],
    audioList: {
        bgm: {
            src: '//24haowan-cdn.shanyougame.com/dingzhi/test/test-bgm.mp3', // 在线音频地址
            autoplay: true, // 自动播放
            loop: true, // 循环播放
        },
        test: {
            src: require('@AUDIO/test.mp3') // 本地音频地址
        }
    }
};
