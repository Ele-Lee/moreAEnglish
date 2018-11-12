<template>
    <div class="class1Listen">
        <!-- 背景 -->
        <!-- <Letter v-for="index in 2" :key="'l'+index" :sprite-id="letterKey"/>
        <Letter v-for="index in 4" :key="'u'+index" :sprite-id="letterKey.toUpperCase()"/> -->
        <Letter v-for="index in 2" :key="'l'+index" :class="'l-'+index"
            :sprite-id="'Aa'[0].toLowerCase()" />
        <Letter v-for="index in 4" :key="'u'+index" :class="'u-'+index"
            :sprite-id="'Aa'[0].toUpperCase()" />
        <div class="top__mask" />
        <div class="bottom__cloud" />
        <div class="grass" />
        <!-- flex -->
        <div class="title" />
        <div class="animal" v-if="currentLevelKey === 'abc'" ref="animal">
            <!-- <div class="eyes on" :style="eyesOn"/>
            <div class="eyes off" :style="eyesOff" />
            <div class="hands">
                <div class="hand left" />
                <div class="hand right" />
            </div> -->
            <div id="test" :style="test"></div>
            <div id="test2" :style="test2"></div>
            <!-- <Letter v-for="letter in listenClassKey" :key="letter" :sprite-id="letter" :class="letter" /> -->
            <Letter v-for="letter in 'Aa'" :key="letter" :sprite-id="letter"
                :class="letter" :style="testL" />
            <!-- <div class="letter__wrapper" >
            </div> -->
        </div>
        <div class="lights" @touchstart.stop="listenLetter">
            <div class="light" v-for="light in 3" :key="light" :data-index="light"
                :class="listenTime > light-1?'on':'off'" />
            <div v-show="listenTime === 0" class="guidedFinger" :data-index="1" />
        </div>
        <div class="nextBtn" @touchend="nextClass" :class="finishListen && 'active'">
            <div class="off" />
            <div class="on" :class="finishListen && 'active'" />
        </div>
    </div>
</template>

<script>
    const SHOULD_LISTEN_TIME = 3;
    import { mapGetters, mapActions } from 'vuex';
    import Letter from '@/components/ui/Letter.vue';
    export default {
        name: 'class1Listen',
        components: { Letter },
        data() {
            return {
                listenTime: 0,
                SHOULD_LISTEN_TIME: 3,
                flexScaleRatio: 0,
                test: {},
                test2: {},
                testL: {},
                eyesOn: {},
                eyesOff: {}
            };
        },
        computed: {
            ...mapGetters(['currentLevelKey', 'listenClassKey', 'classMusicId']),
            letterKey() {
                // return this.listenClassKey[0].toLowerCase()
                return 'a'[0].toLowerCase();
            },
            finishListen() {
                return SHOULD_LISTEN_TIME === this.listenTime;
            }
        },
        mounted() {
            this.$audio.play(this.classMusicId);
            const { width, height } = this.$refs.animal.getBoundingClientRect();
            const h = (height * 2) / 714;
            const w = (width * 2) / 445;
            const factor = Math.min(h, w);
            // console.log(h, w)
            this.test = {
                bottom: factor * 300 + 'px'
            };
            this.test2 = {
                bottom: factor * 230 + 'px'
            };
            this.testL = {
                bottom: factor * 118 + 'px',
                height: factor * 67 + 'px'
            };
            // this.eyesOff= {
            //     bottom: factor*295+ 'px',
            // }
            // this.eyesOn = {
            //     bottom: factor*290+ 'px',
            // }
        },
        methods: {
            ...mapActions(['finishClass']),
            nextClass() {
                // this.finishClass('listen')
            },
            listenLetter({
                target: {
                    dataset: { index }
                }
            }) {
                console.log('in', index - 1, this.listenTime, index - 1 === this.listenTime);
                if (index - 1 === this.listenTime) {
                    ++this.listenTime;
                    this.$audio.play(`letter_${this.letterKey}`).then(() => {
                        this.finishListen && this.$audio.play(`完成音效`);
                    });
                }
            }
        }
    };
</script>

<style lang="less">
    @paths: 'class1/common', 'class1/abc', 'class1/jkl', 'class1/sty', 'classCommon',
        'classCommon/titles';
    #test {
        position: absolute;
        height: 1px;
        width: 100%;
        background-color: red;
    }
    #test2 {
        position: absolute;
        height: 1px;
        width: 100%;
        background-color: red;
    }
    .class1Listen {
        .page();
        .flex-c(space-around);
        background: linear-gradient(to bottom, #a9f2f9, #cafdff);
        > .Letter {
            position: absolute;
            fill: rgb(214, 250, 253);
            width: 0.8rem;
            &.l-1 {
                top: 12.379rem;
                left: 0.968rem;
                transform: rotate(-30deg);
            }
            &.l-2 {
                top: 7.318rem;
                left: 1.993rem;
                transform: rotate(-15deg);
            }
            &.u-1 {
                top: 5.526rem;
                left: 0.846rem;
                transform: rotate(35deg);
            }
            &.u-2 {
                top: 9.714rem;
                left: 0.766rem;
                transform: rotate(40deg);
            }
            &.u-3 {
                top: 10.422rem;
                left: 8.531rem;
                transform: rotate(45deg);
            }
            &.u-4 {
                top: 5.731rem;
                left: 8.339rem;
                transform: rotate(45deg);
            }
        }
        > .top__mask {
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
            .bg-contain('giraffe_body', 2);
            background-position-y: bottom;
            > .eyes {
                position: absolute;
                animation: show 1s infinite alternate;
                &.on {
                    // bottom: 7.874rem;
                    left: 2.208rem;
                    .bg-contain('animation_eyes1--on', 2);
                    animation-timing-function: step-start;
                }
                &.off {
                    // bottom: 7.9rem;
                    left: 2.087rem;
                    .bg-contain('animation_eyes1--off', 2);
                    animation-timing-function: step-end;
                }
            }
            > .hands {
                position: absolute;
                bottom: 5.9rem;
                z-index: -1;
                > .hand {
                    position: absolute;
                    z-index: -1;
                    // bottom: 5.9rem;
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
            }

            // > .letter__wrapper {
            //     .flex(center, flex-end);
            //     position: absolute;
            //     // left: 50%;
            //     // height: 3.5rem;
            //     // transform: translateX(-50%);
            //     transform-origin: bottom;
            > .Letter {
                width: 100%;
                position: absolute;
                left: 0;

                fill: rgb(255, 104, 105);
                &.A {
                    // height: 100%;
                    // height: 1.6rem;
                    // width: 1.58rem;
                }
                &.a {
                    // height: 100%;
                    // width: 1rem;
                    // height: 3.25rem;
                }
            }
            // }
        }
        > .lights {
            position: relative;
            .flex();
            padding: 0.5rem;
            z-index: 1;
            > .light {
                padding: 0 0.2rem;
                &.on {
                    .bg-contain('btn_light--on');
                }
                &.off {
                    .bg-contain('btn_light--off');
                }
            }
            > .guidedFinger {
                position: absolute;
                left: 1.3rem;
                top: 1.1rem;
                .bg-contain('guidedFinger', 5);
                width: 1.3rem;
                height: 1.4rem;
                animation: click 1s infinite;
            }
        }
        > .nextBtn {
            position: relative;
            padding: 0 0.5rem 1.2rem;
            z-index: 1;
            transition: transform 1s;
            &.active {
                transform: scale(1.13);
            }
            > .off {
                .bg-contain('btn_next--off');
            }
            > .on {
                position: absolute;
                top: 0;
                left: 50%;
                transform: translateX(-50%);
                .bg-contain('btn_next--on');
                transition: opacity 1s;
                opacity: 0;
                &.active {
                    opacity: 1;
                }
            }
        }
    }
</style>
