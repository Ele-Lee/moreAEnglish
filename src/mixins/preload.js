//必须定义assets变量
import { requireAll } from '@/utils/functions.js';
export default {
    data() {
        return {
            mixinPercentage: 0,
            mixinLoaded: false
        }
    },
    mounted() {
        console.log('mounted preload')
        this.$preLoadAssets().then(() => {
            // this.loaded = true
            this.$loaded && this.$loaded()
        })
    },
    methods: {
        $preLoadAssets() {
            return new Promise((resolve, reject) => {
                //获得资源的url
                const getAssets = (assets) => {
                    return assets.reduce((acm, _asstes) => {
                        acm.push(...requireAll(_asstes))
                        return acm
                    }, [])
                }
                const loaded = (e) => {
                    loadedAssets++;
                    this.mixinPercentage = ~~((loadedAssets / assetsLength) * 100)
                    if (loadedAssets >= assetsLength) {
                        // 释放内存
                        needLoadAssets = null
                        resolve(true)
                    };
                };
                const preloadImg = (url) => {
                    const img = new Image();
                    img.onload = img.onerror = loaded;
                    img.src = url
                }
                const preloadMusic = (url) => {
                    this.$audio.preload(url).then(loaded)
                }
                let loadedAssets = 0;
                let assetsLength = 0;
                let needLoadAssets = []
                if (!Array.isArray(this.$assets)) reject()
                needLoadAssets = getAssets(this.$assets);
                assetsLength = needLoadAssets.length;
                console.log('preload assets', assetsLength, needLoadAssets)
                // const requireAll = context => context.keys().map(context);
                for (let url of needLoadAssets) {
                    // 图片预加载
                    if (/^(data\:image)|(\.png|\.gif)$/.test(url)) {
                        preloadImg(url)
                        // 音乐预加载
                    } else if (/(\.mp3|\.wav)$/.test(url)) {
                        preloadMusic(url)
                    }
                }
            });
        }
    }
}
