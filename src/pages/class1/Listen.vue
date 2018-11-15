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
            <div class="letter__wrapper" :style="letterStyle">
                <Letter
                    v-for="letter in listenClassKey" :key="letter"
                    :sprite-id="letter" :class="letter"
                />
            </div>
        </div>
        <Lights @touchstart.stop.native="listenLetter" :listenTime="listenTime" />
        <NextBtn @click.native="nextClass" :isFinish="finishListen" />
    </div>
</template>

<script>
    import listen from '@/mixins/listen.js';
    import BgLetters from '@/components/ui/BgLetters.vue';
    export default {
        name: 'class1Listen',
        components: { BgLetters },
        mixins: [listen],
        data() {
            return {
                letterStyle: {}
            };
        },
        mounted() {
            this._positionLetter();
        },
        methods: {
            listenLetter({
                target: {
                    dataset: { index }
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
            .bg-contain('animal', 2, 'gif');
            background-position-y: bottom;
            // > .eyes {
            //     position: absolute;
            //     animation: show 1s infinite alternate;
            //     &.on {
            //         bottom: 7.874rem;
            //         left: 2.208rem;
            //         .bg-contain('animation_eyes1--on', 2);
            //         animation-timing-function: step-start;
            //     }
            //     &.off {
            //         bottom: 7.9rem;
            //         left: 2.087rem;
            //         .bg-contain('animation_eyes1--off', 2);
            //         animation-timing-function: step-end;
            //     }
            // }
            // > .hand {
            //     position: absolute;
            //     z-index: -1;
            //     bottom: 5.9rem;
            //     &.left {
            //         left: 0.477rem;
            //         .bg-contain('animation_leftHand1', 2);
            //         transform-origin: right bottom;
            //         animation: leftShake 1s infinite alternate linear;
            //     }
            //     &.right {
            //         left: 3.938rem;
            //         .bg-contain('animation_rightHand1', 2);
            //         transform-origin: left bottom;
            //         animation: rightShake 1s infinite alternate linear;
            //     }
            // }
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
        > .Lights {
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
