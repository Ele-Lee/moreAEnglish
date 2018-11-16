<template>
    <div class="class1Listen">
        <!-- 背景 -->
        <BgLetters :letterKey="letterKey" :type="1"/>
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
        <Lights :type="1" @touchstart.stop.native="listenLetter" :listenTime="listenTime" />
        <NextBtn :type="1" @click.native="nextClass" :isFinish="finishListen" />
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
            .bg-cover('bg_header', 5);
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
        // > .Lights {
        //     .light {
        //         &.on {
        //             .bg-contain('btn_light--on');
        //         }
        //         &.off {
        //             .bg-contain('btn_light--off');
        //         }
        //     }
        // }
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
