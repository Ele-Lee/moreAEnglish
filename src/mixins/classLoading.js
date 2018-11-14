import {
    mapGetters,
    mapActions
} from 'vuex'
import Loading from '@/components/ui/Loading.vue'
import StartTitle from '@/components/ui/StartTitle.vue'
export default {
    components: {
        Loading,
        StartTitle
    },
    mounted() {
        const _assets = []
        this.hadLoadCommonClass || _assets.push(this.$assetsMap.get('common'))
        _assets.push(this.$assetsMap.get(this.currentLevelKey))
        this.$assets = _assets
    },
    computed: {
        ...mapGetters(['hadLoadCommonClass', 'currentLevelKey', 'currentClassType'])
    },
    methods: {
        ...mapActions(['loadedCommon']),
        $loaded() {
            this.$audio.play('bgm_class' + this.currentClassType, {
                loop: true
            })
            this.$audio.play(`${this.currentLevelKey}-1`)
            setTimeout(() => {
                this.$assetsMap = null
                this.mixinLoaded = true
                this.loadedCommon()
            }, 1000);
        },
    }
}
