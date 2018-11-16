<template>
    <div class="class3Listen" :class="'theme_'+(themeIndex+1)">
        <div class="title"/>
        <div class="bed">
            <div class="child off"/>
            <div class="child on"/>
            <div class="baseLine">
                <div class="letter__wrapper">
                    <!-- 因为有两个y所以要区分，然后就搞得代码真的丑，贼丑，污染眼睛 -->
                    <Letter
                        v-for="letter in listenClassKey" :key="letter"
                        :sprite-id="letter === 'y' ? 'y2' : letter" :class="letter" :resetSvgSize='true'
                    />
                </div>

            </div>
        </div>
        <Lights :type="3" @touchstart.stop.native="listenLetter" :listenTime="listenTime" />
        <NextBtn :type="3" @click.native="nextClass" :isFinish="finishListen" />
    </div>
</template>

<script>
    import listen from '@/mixins/listen.js';
    export default {
        name: 'class3Listen',
        mixins: [listen]
    };
</script>

<style lang="less">
    @paths: 'class3/common', 'class3/def', 'class3/mno', 'class3/uvw', 'classCommon',
        'classCommon/titles';
    .class3Listen {
        .bg-page(0);
        .flex-c(space-between);
        &.theme_1 {
            .bg-img('bg_listen1');
            > .title {
                background-color: rgb(255, 228, 191);
            }
            > .bed {
                .bg-img('bg_bed1');
                > .child {
                    &.on {
                        .bg-img('animation_girl1--on');
                    }
                    &.off {
                        .bg-img('animation_girl1--off');
                    }
                }
            }
        }
        &.theme_2 {
            .bg-img('bg_listen2');
            > .title {
                background-color: rgb(206, 220, 142);
            }
            > .bed {
                .bg-img('bg_bed2');
                > .child {
                    &.on {
                        .bg-img('animation_girl2--on');
                    }
                    &.off {
                        .bg-img('animation_girl2--off');
                    }
                }
            }
        }
        &.theme_3 {
            .bg-img('bg_listen3');
            > .title {
                background-color: rgb(151, 194, 237);
            }
            > .bed {
                .bg-img('bg_bed3');
                > .child {
                    &.on {
                        .bg-img('animation_girl3--on');
                    }
                    &.off {
                        .bg-img('animation_girl3--off');
                    }
                }
            }
        }
        > .title {
            .bg-contain('listen_title2', 6);
            width: 60%;
            padding: 6vh 20% 3vh 20%;
        }
        > .bed {
            .contain();
            .wh(6.75rem, 8.25rem);
            transform: translateY(2vh);
            > .child {
                .p-center(15%);
                .contain();
                .wh(1.733rem, 2.066rem);
                @media @ipad {
                    top: 15.5%;
                    transform: translate(-50%, -50%) scale(0.835);
                }
                &.on {
                    animation: show 3s step-end infinite;
                }
            }
            > .baseLine {
                .flex();
                .p-center-b(3%);
                .bg-cover('bg_baseLine');
                @media @ipad {
                    transform-origin: bottom center;
                    transform: translate(-50%) scale(0.835);
                }
                > .letter__wrapper {
                    position: absolute;
                    top: -14.5%;
                    .wh(100%);
                    .flex();
                    > .Letter {
                        fill: rgb(255, 207, 72);
                        margin: 0 0.2rem;
                        @media @ipad {
                            transform: scale(1.1);
                        }
                        @gapH: 8%;
                        @lineH: 6%;
                        @baseH: @gapH*2+ @lineH*3;
                        @smallH: @gapH+ @lineH*2;
                        @lowBaseTop: 31%;
                        @lowerBaseTop: 16%;
                        &.G {
                            height: @baseH;
                        }
                        &.g {
                            margin-top: @lowBaseTop;
                            height: @baseH;
                        }

                        &.H {
                            height: @baseH;
                        }
                        &.h {
                            height: @baseH;
                        }
                        &.I {
                            height: @baseH;
                        }
                        &.i {
                            margin-top: 9%;
                            height: 26%;
                        }
                        &.P {
                            margin: 0;
                            height: @baseH;
                        }
                        &.p {
                            margin: @lowBaseTop 0 0 0;
                            height: @baseH;
                        }
                        &.Q {
                            margin: 0 0.1rem;
                            height: @baseH;
                        }
                        &.q {
                            margin: @lowBaseTop 0.1rem 0;
                            height: @baseH;
                        }
                        &.R {
                            height: @baseH;
                        }
                        &.r {
                            margin-top: @lowerBaseTop;
                            height: @smallH;
                        }
                        &.X {
                            margin: 0 0.1rem;
                            height: @baseH;
                        }
                        &.x {
                            margin: @lowerBaseTop 0.1rem 0;
                            height: @smallH;
                        }
                        &.Y {
                            margin: 0;
                            height: @baseH;
                        }
                        &.y {
                            margin: @lowBaseTop 0 0;
                            height: @baseH;
                        }
                        &.Z {
                            height: @baseH;
                        }
                        &.z {
                            margin-top: @lowerBaseTop;
                            height: @smallH;
                        }
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
            > .guidedFinger {
                top: 1.35rem;
                left: 1.55rem;
            }
        }
        // > .NextBtn {
        //     > .off {
        //         .bg-contain('btn_next--off');
        //     }
        //     > .on {
        //         .bg-contain('btn_next--on');
        //     }
        // }
    }
</style>
