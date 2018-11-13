import { mapGetters, mapActions } from 'vuex'
import Loading from '@/components/ui/Loading.vue'
import StartTitle from '@/components/ui/StartTitle.vue'
export default {
    components: {
        Loading,
        StartTitle
    },
    mounted() {
        console.log('mounted classLoading')
        const _assets = []
        // this.hadLoadCommonClass || _assets.push(this.$assetsMap.get('common'))
        _assets.push(this.$assetsMap.get(this.currentLevelKey))
        this.$assets = _assets
    },
    computed: {
        ...mapGetters(['hadLoadCommonClass', 'currentLevelKey', 'classMusicId'])
    },
    methods: {
        ...mapActions(['loadedCommon']),
        $loaded() {
            this.$audio.play(this.classMusicId)
            setTimeout(() => {
                this.$assetsMap = null
                this.mixinLoaded = true
                this.loadedCommon()
            }, 1000);
        },
    }
}


// mounted() {
//     this.$audio.play(this.classMusicId);
//     const { width, height } = this.$refs.animal.getBoundingClientRect();
//     const h = (height * 2) / 714;
//     const w = (width * 2) / 445;
//     const factor = Math.min(h, w);
//     // console.log(h, w)
//     // this.test = {
//     //     bottom: factor * 300 + 'px'
//     // };
//     // this.test2 = {
//     //     bottom: factor * 230 + 'px'
//     // };
//     // this.testL = {
//     //     bottom: factor * 118 + 'px',
//     //     height: factor * 67 + 'px'
//     // };
//     // this.eyesOff= {
//     //     bottom: factor*295+ 'px',
//     // }
//     // this.eyesOn = {
//     //     bottom: factor*290+ 'px',
//     // }
// },
