const SHOULD_LISTEN_TIME = 3;
import {
    mapGetters,
    mapActions
} from 'vuex'
import Letter from '@/components/ui/Letter.vue';
import Lights from '@/components/ui/Lights.vue';
import NextBtn from '@/components/ui/NextBtn.vue';
export default {
    components: {
        Letter,
        Lights,
        NextBtn
    },
    data() {
        return {
            //听完的次数
            listenTime: 0,
        }
    },
    created() {
        //页面出现次数
        this._showTime = 0;
        this._clickAble = true;
    },
    mounted() {
        this._initAutoPlayList();
        this._initLetterAudios();
        this._initListen();
    },
    computed: {
        ...mapGetters(['currentLevelKey', 'listenClassKey', 'themeIndex']),
        letterKey() {
            return this.listenClassKey[0].toLowerCase();
        },
        finishListen() {
            return SHOULD_LISTEN_TIME === this.listenTime;
        }
    },
    methods: {
        ...mapActions(['finishClass']),
        _initAutoPlayList() {
            const key = this._getAudioKey(this.currentLevelKey + '-');
            const bgmOrder = [
                [false, key(2), false],
                [false, key(10), false],
                [false, key(15), false]
            ];
            this.autoPlayList = this._getAudioList(bgmOrder);
        },
        _initLetterAudios() {
            const key1 = this._getAudioKey('letter_');
            const key2 = this._getAudioKey(this.currentLevelKey + '-');
            const l = this.letterKey;
            const letterOrder = [
                [
                    [key1(l), key1(l), key1(l)],
                    [key1(l), key1(l), key2(3)],
                    [key1(l), key1(l), key2(4)]
                ],
                [
                    [key1(l), key1(l), key1(l)],
                    [key1(l), key1(l), key2(10)],
                    [key1(l), key1(l), key2(11)]
                ],
                [
                    [key1(l), key1(l), key1(l)],
                    [key1(l), key1(l), key2(15)],
                    [key1(l), key1(l), key2(16)]
                ]
            ];
            this.letterAudios = this._getAudioList(letterOrder);
        },
        _getAudioKey(prefix) {
            return id => prefix + id;
        },
        _getAudioList(order) {
            let res = {};
            const Key = this.currentLevelKey;
            for (let i = 0; i < Key.length; i++) {
                res[Key[i]] = order[i];
            }
            return res;
        },
        //点击next按钮
        nextClass() {
            // const overShowTime = [3, 6, 9];
            if (!this.finishListen) return;
            this._showTime += 1;
            this._initListen();
            // if (overShowTime.indexOf(this._showTime) !== -1) {
            if (this._showTime === 3) {
                console.log('to /write --- this._showTime', this._showTime);
                this.$router.replace('/write');
            } else {
                this.finishClass('listen');
            }
        },
        //点击按钮，播放音乐
        listenLetter({
            target: {
                dataset: {
                    index
                }
            }
        }) {
            if (index - 1 === this.listenTime && this._clickAble) {
                const letterAudio = this.letterAudios[this.letterKey][this._showTime][
                    this.listenTime
                ];
                this._clickAble = false;
                this.listenTime += 1;
                this.$audio.play(letterAudio).then(() => {
                    this._clickAble = true;
                    if (this.finishListen) {
                        this.$audio.play(`finish`);
                    }
                });
            }
        },
        _initListen() {
            const autoAudio = this.autoPlayList[this.letterKey][this._showTime];
            if (autoAudio) {
                this._clickAble = false;
                this.$audio.play(autoAudio).then(() => {
                    this._clickAble = true;
                });
            }
            this.listenTime = 0;
        }
    }
}
