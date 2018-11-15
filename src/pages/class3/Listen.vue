<template>
    <div class="class3Listen" :class="'theme_'+(themeIndex+1)">
        <div class="title"/>
        <div class="bed">
            <div class="child off"/>
            <div class="child on"/>
            <div class="baseLine">
                <div class="letter__wrapper">
                    <Letter
                        v-for="letter in 'P'" :key="letter"
                        :sprite-id="letter" :class="letter" :resetSvgSize='true'
                    />
                </div>

            </div>
        </div>
        <Lights @touchstart.stop.native="listenLetter" :listenTime="listenTime" />
        <NextBtn @click.native="nextClass" :isFinish="finishListen" />
    </div>
</template>

<script>
    import listen from '@/mixins/listen.js';
    export default {
        name: 'class3Listen',
        mixins: [listen],
        data() {
            return {};
        }
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
                    height: 100%;
                    .flex();
                    > .Letter {
                        fill: rgb(255, 207, 72);
                        @media @ipad {
                            transform: scale(1.1);
                        }
                        &.P {
                            height: 34%;
                        }
                        &.p {
                            padding-top: 69%;
                            height: 34%;
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
