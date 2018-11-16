<template>
    <div class="Write">
        <!-- bg -->
        <BgLetters :letterKey="writeClassKey" :type="currentClassType"/>
        <div class="top__mask" />
        <div class="title" />
        <div class="drawLetter">
            <div class="baseLine" :style="{opacity: showBaseLine ? 1: 0}"/>
            <LetterCanvas
                @draw="playAudio" v-bind="LetterCanvasBinds" :key="finishTime"
                :class="[writeClassKey, showBaseLine ? 'showBaseLine' : '']"
            />
                <!-- :class="['class'+currentClassType, writeClassKey, showBaseLine ? 'showBaseLine' : '']" -->
        </div>
        <NextBtn :type="currentClassType" :isFinish="finishWrite" @click.native="nextClass"/>
    </div>
</template>

<script>
    const props = {
        //擦去比例正确率
        correctSmearRatio: {
            type: Number,
            default: 0.5
        },
        //起点落点正确范围
        correctPointRange: {
            type: Number,
            default: 6
        },
        //字母起落点的xy的百分比 (固定大小可用px)
        letterPoints: {
            type: Array,
            // default: () => [161, 45, 43, 376, 203, 44, 323, 374, 125, 223, 230, 226]
            default: () => [45, 8, 10, 92, 57, 8, 87, 91, 35, 55, 63, 55]
        }
        // //笔触大小
        // strokeRadius: {
        //     type: Number,
        //     default: 30
        // }
    };
    import { mapGetters, mapActions } from 'vuex';
    import { getLetterName } from '@/utils/functions.js';
    import BgLetters from '@/components/ui/BgLetters.vue';
    import NextBtn from '@/components/ui/NextBtn.vue';
    import Letter from '@/components/ui/Letter.vue';
    import LetterCanvas from '@/components/functional/LetterCanvas.vue';
    export default {
        name: 'Write',
        components: {
            BgLetters,
            NextBtn,
            Letter,
            LetterCanvas
        },
        data() {
            return {
                finishTime: 0,
                finishWrite: false
            };
        },
        created() {
            this.config = {
                A: {
                    letterPoints: [45, 8, 10, 92, 57, 8, 87, 91, 35, 55, 63, 55]
                },
                a: {
                    letterPoints: [68, 20, 88, 89]
                }
            };
        },
        mounted() {
            this._initAutoPlayList();
            this._playBgm();
        },
        computed: {
            ...mapGetters(['currentLevelKey', 'writeClassKey', 'currentClassType']),
            LetterCanvasBinds() {
                const { config, strokesUrl, writeClassKey } = this;
                return {
                    ...config[writeClassKey],
                    letterKey: writeClassKey,
                    strokesUrl
                };
            },
            strokesUrl() {
                const letterName = getLetterName(this.writeClassKey);
                return `class${this.currentClassType}/${this.currentLevelKey}/strokes/${letterName}`;
            },
            currentCtxIndex() {
                return this.strokesSum - this.currentStrokeIndex;
            },
            showBaseLine() {
                return this.finishTime % 3 !== 0;
            }
        },
        methods: {
            ...mapActions(['finishClass']),
            _initAutoPlayList() {
                const _key = this.currentLevelKey;
                const key = id => _key + '-' + id;
                this.autoPlayList = {
                    A: [key(5), key(6), key(7)],
                    a: [key(8), key(9), key(7)],
                    B: [key(12), key(13), key(7)],
                    b: [key(11), key(14), key(7)],
                    C: [key(17), key(18), key(7)],
                    c: [key(16), key(19), key(7)]
                };
            },
            _playBgm() {
                const audioKey = this.autoPlayList[this.writeClassKey][this.finishTime];
                this.$audio.play(audioKey);
            },
            playAudio(remainStrokes) {
                let audioKey;
                if (remainStrokes === 0) {
                    audioKey = 'finish';
                    this.finishWrite = true;
                } else {
                    audioKey = 'letter_' + this.writeClassKey.toLowerCase();
                }
                this.$audio.play(audioKey);
            },
            nextClass() {
                if (this.finishWrite) {
                    this.finishClass('write');
                    this.finishTime++;
                    if (this.finishTime === 6) {
                        this.$router.repalce(`/read`);
                    } else {
                        this._playBgm();
                        this.finishWrite = false;
                    }
                }
            }
        }
    };
</script>

<style lang="less">
    @paths: 'classCommon/titles', 'class1/common', 'class2/common', 'class3/common', 'classCommon';
    .Write {
        .page();
        .flex-c(space-between);
        > .drawLetter {
            position: relative;
            > .baseLine {
                .bg-contain('bg_baseLine', 2);
            }
            > .LetterCanvas {
                .p-center();
                .wh(100%);
                &.showBaseLine {
                    top: 0%;
                    left: 50%;
                    transform: translate(-50%, 0);
                    &.A {
                        width: 65%;
                        height: 66%;
                    }
                    &.a {
                        top: 30%;
                        width: 38%;
                        height: 38%;
                    }
                }
            }
        }
        > .top__mask {
            .p-top();
            .bg-cover('bg_header', 5);
        }
        > .title {
            margin-top: 5vh;
            z-index: 1;
            .bg-contain('write_title');
        }
    }
</style>
