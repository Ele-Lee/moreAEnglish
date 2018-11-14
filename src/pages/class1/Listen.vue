<template>
    <div class="class1Listen">
        <!-- 背景 -->
        <BgLetters :letterKey="letterKey" />
        <div class="top__mask" />
        <div class="bottom__cloud" />
        <div class="grass" />
        <!-- flex -->
        <div class="title" />
        <div class="animal" v-if="currentLevelKey === 'abc'" ref="animal">
            <div class="eyes on" />
            <div class="eyes off" />
            <div class="hand left" />
            <div class="hand right" />
            <div class="letter__wrapper" :style="letterStyle">
                <Letter v-for="letter in listenClassKey" :key="letter"
                    :sprite-id="letter" :class="letter" />
                <!-- <Letter v-for="letter in 'Aa'" :key="letter" :sprite-id="letter"
                    :class="letter" /> -->
            </div>
        </div>
        <Lights @touchstart.stop.native="listenLetter" :listenTime="listenTime" />
        <NextBtn @click.native="nextClass" :isFinish="finishListen" />
    </div>
</template>

<script>
    const SHOULD_LISTEN_TIME = 3;
    import { mapGetters, mapActions } from 'vuex';
    import Letter from '@/components/ui/Letter.vue';
    import Lights from '@/components/ui/Lights.vue';
    import NextBtn from '@/components/ui/NextBtn.vue';
    import BgLetters from '@/components/ui/BgLetters.vue';
    export default {
        name: 'class1Listen',
        components: { Letter, Lights, NextBtn, BgLetters },
        data() {
            return {
                //听完的次数
                listenTime: 0,
                letterStyle: {},
                showFinger: true,
                letterAudios: []
            };
        },
        computed: {
            ...mapGetters(['currentLevelKey', 'listenClassKey']),
            letterKey() {
                return this.listenClassKey[0].toLowerCase();
            },
            finishListen() {
                return SHOULD_LISTEN_TIME === this.listenTime;
            }
        },
        mounted() {
            //页面出现次数
            this._showTime = 0;
            this._clickAble = true;
            this._initAutoPlayList();
            this._initLetterAudios();
            this._positionLetter();
            this._initListen();
        },
        methods: {
            ...mapActions(['finishClass']),
            _initAutoPlayList() {
                const key = this._getAudioKey;
                this.autoPlayList = {
                    a: [false, key(2), false],
                    b: [false, key(10), false],
                    c: [false, key(15), false]
                };
            },
            _initLetterAudios() {
                const key = this._getAudioKey;
                const l = `letter_${this.letterKey}`;
                this.letterAudios = {
                    a: [[key(l), key(l), key(l)], [key(l), key(l), key(3)], [key(l), key(l), key(4)]],
                    b: [[key(l), key(l), key(l)], [key(l), key(l), key(10)], [key(l), key(l), key(11)]],
                    c: [[key(l), key(l), key(l)], [key(l), key(l), key(15)], [key(l), key(l), key(16)]]
                };
            },
            _getAudioKey(id) {
                return this.currentLevelKey + '-' + id;
            },
            nextClass() {
                const overShowTime = [3, 6, 9];
                if (!this.finishListen) return;
                this._showTime += 1;
                this._initListen();
                if (overShowTime.indexOf(this._showTime) !== -1) {
                    this.$router.replace('/write');
                } else {
                    this.finishClass('listen');
                }
            },
            listenLetter({
                target: {
                    dataset: { index }
                }
            }) {
                if (index - 1 === this.listenTime && this._clickAble) {
                    const letterAudio = this.letterAudios[this.letterKey][this._showTime][
                        this.listenTime
                    ];
                    this.showFinger = false;
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
            },
            _positionLetter() {
                const { width, height } = this.$refs.animal.getBoundingClientRect();
                const scaleH = (height * 2) / 714;
                const scaleW = (width * 2) / 445;
                const scaleFactor = Math.min(scaleH, scaleW);
                this.letterStyle = {
                    bottom: scaleFactor * 118 + 'px',
                    height: scaleFactor * 67 + 'px'
                };
            }
        }
    };
</script>

<style lang="less">
    @paths: 'class1/common', 'class1/abc', 'class1/jkl', 'class1/sty', 'classCommon',
        'classCommon/titles';
    .class1Listen {
        .page();
        .flex-c(space-around);
        > .BgLetters {
            background: linear-gradient(to bottom, #a9f2f9, #cafdff);
            .Letter {
                fill: rgb(214, 250, 253);
            }
        }
        // > .Letter {
        //     position: absolute;
        //     fill: rgb(214, 250, 253);
        //     width: 0.8rem;
        //     &.l-1 {
        //         top: 12.379rem;
        //         left: 0.968rem;
        //         transform: rotate(-30deg);
        //     }
        //     &.l-2 {
        //         top: 7.318rem;
        //         left: 1.993rem;
        //         transform: rotate(-15deg);
        //     }
        //     &.u-1 {
        //         top: 5.526rem;
        //         left: 0.846rem;
        //         transform: rotate(35deg);
        //     }
        //     &.u-2 {
        //         top: 9.714rem;
        //         left: 0.766rem;
        //         transform: rotate(40deg);
        //     }
        //     &.u-3 {
        //         top: 10.422rem;
        //         left: 8.531rem;
        //         transform: rotate(45deg);
        //     }
        //     &.u-4 {
        //         top: 5.731rem;
        //         left: 8.339rem;
        //         transform: rotate(45deg);
        //     }
        // }
        > .top__mask {
            z-index: 1;
            .p-top();
            .bg-cover('bg_header');
        }
        > .bottom__cloud {
            .p-bottom(2.5rem);
            .bg-cover('bg_footer_cloud');
        }
        > .grass {
            .p-bottom();
            .bg-cover('bg_footer');
        }
        > .title {
            flex: 0.25;
            z-index: 1;
            .bg-contain('listen_title1', 6);
            background-position-y: bottom;
        }
        > .animal {
            flex: 1;
            position: relative;
            z-index: 1;
            // .bg-contain('test', 2, 'gif');
            .bg-contain('giraffe_body', 2);
            background-position-y: bottom;
            > .eyes {
                position: absolute;
                animation: show 1s infinite alternate;
                &.on {
                    bottom: 7.874rem;
                    left: 2.208rem;
                    .bg-contain('animation_eyes1--on', 2);
                    animation-timing-function: step-start;
                }
                &.off {
                    bottom: 7.9rem;
                    left: 2.087rem;
                    .bg-contain('animation_eyes1--off', 2);
                    animation-timing-function: step-end;
                }
            }
            > .hand {
                position: absolute;
                z-index: -1;
                bottom: 5.9rem;
                &.left {
                    left: 0.477rem;
                    .bg-contain('animation_leftHand1', 2);
                    transform-origin: right bottom;
                    animation: leftShake 1s infinite alternate linear;
                }
                &.right {
                    left: 3.938rem;
                    .bg-contain('animation_rightHand1', 2);
                    transform-origin: left bottom;
                    animation: rightShake 1s infinite alternate linear;
                }
            }
            > .letter__wrapper {
                width: 100%;
                .flex(center, flex-end);
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                > .Letter {
                    fill: rgb(255, 104, 105);
                    &.A {
                        height: 100%;
                        width: 26%;
                    }
                    &.a {
                        height: 57%;
                        width: 16%;
                    }
                }
            }
        }
        > .Light {
            .light {
                &.on {
                    .bg-contain('btn_light--on');
                }
                &.off {
                    .bg-contain('btn_light--off');
                }
            }
        }
        > .NextBtn {
            > .off {
                .bg-contain('btn_next--off');
            }
            > .on {
                .bg-contain('btn_next--on');
            }
        }
    }
</style>
