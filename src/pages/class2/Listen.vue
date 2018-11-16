<template>
    <div class="class2Listen" :class="'theme_'+(themeIndex+1)">
       <div class="title"/>
        <div class="baseLine" >
            <Letter
                v-for="letter in listenClassKey" :key="letter"
                :sprite-id="letter" :resetSvgSize='true'
                :class="[letter, listenClassKey.length > 1 && '__letters']"
            />
            <!-- 背景动效 -->
            <div
                v-for="index in bgAnimations[themeIndex].num"
                :key="bgAnimations[themeIndex].prefix+index"
                class="bg_animations" :class="bgAnimations[themeIndex].prefix+index"
            />
        </div>
        <Lights :type="4" @touchstart.stop.native="listenLetter" :listenTime="listenTime" />
        <div class="btn__wrapper">
            <NextBtn :type="2" @click.native="nextClass" :isFinish="finishListen" />
        </div>
    </div>
</template>

<script>
    import listen from '@/mixins/listen.js';
    export default {
        name: 'class2Listen',
        mixins: [listen],
        data() {
            return {
                bgAnimations: [
                    { num: 2, prefix: 'car_' },
                    { num: 3, prefix: 'people_' },
                    { num: 3, prefix: 'umbrella_' }
                ]
            };
        }
    };
</script>

<style lang="less">
    @paths: 'class2/common', 'classCommon/titles';
    @barHeight: 10vh;
    .class2Listen {
        .page();
        .flex-c(space-around);
        padding: 4vh 0;
        box-sizing: border-box;
        &.theme_1 {
            background-color: rgb(0, 127, 125);
        }
        &.theme_2 {
            background-color: rgb(75, 81, 93);
        }
        &.theme_3 {
            background-color: rgb(61, 122, 168);
        }
        > .title {
            .bg-contain('listen_title2', 2);
            background-color: #fff;
            height: @barHeight;
            width: 60%;
            padding: 0 20%;
        }
        > .baseLine {
            .flex(center, flex-start);
            .bg-contain('bg_baseline');
            transform: translateY(2vh);
            > .Letter {
                fill: rgb(255, 104, 105);
                @gapH: 17.5%;
                @lineH: 12%;
                @lowerBaseTop: 25%;
                &.D {
                    height: @lineH*3 + @gapH*2;
                }
                &.d {
                    height: @lineH*3 + @gapH*2;
                }
                &.E {
                    height: @lineH*3 + @gapH*2;
                }
                &.e {
                    margin-top: @lowerBaseTop;
                    height: @lineH*2 + @gapH;
                }
                &.F {
                    height: @lineH*3 + @gapH*2;
                }
                &.f {
                    height: @lineH*4 + @gapH*3;
                }
                &.M {
                    height: @lineH*3 + @gapH*2;
                    &.__letters {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 69% !important;
                        transform-origin: left;
                        transform: scaleX(0.8);
                    }
                }
                &.m {
                    margin-top: @lowerBaseTop;
                    height: @lineH*2 + @gapH;
                    &.__letters {
                        position: absolute;
                        right: 0;
                        top: 0;
                        width: 70% !important;
                        transform-origin: right;
                        transform: scaleX(0.66);
                    }
                }
                &.N {
                    flex: 1;
                    height: @lineH*3 + @gapH*2;
                }
                &.n {
                    flex: 0.95;
                    margin-top: @lowerBaseTop;
                    height: @lineH*2 + @gapH;
                }
                &.O {
                    flex: 1;
                    height: @lineH*3 + @gapH*2;
                }
                &.o {
                    flex: 0.5;
                    margin-top: @lowerBaseTop;
                    height: @lineH*2 + @gapH;
                }
                &.U {
                    height: @lineH*3 + @gapH*2;
                }
                &.u {
                    margin-top: @lowerBaseTop;
                    height: @lineH*2 + @gapH;
                }
                &.V {
                    height: @lineH*3 + @gapH*2;
                }
                &.v {
                    margin-top: @lowerBaseTop;
                    height: @lineH*2 + @gapH;
                }
                &.W {
                    height: @lineH*3 + @gapH*2;
                    &.__letters {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 75% !important;
                        height: @lineH*3 + @gapH*2 !important;
                        transform-origin: left;
                        transform: scaleX(0.81);
                    }
                }
                &.w {
                    margin-top: @lowerBaseTop;
                    height: @lineH*2 + @gapH;
                    &.__letters {
                        position: absolute;
                        right: 0;
                        top: 0;
                        width: 57% !important;
                        transform-origin: right;
                        transform: scaleX(0.75);
                    }
                }
            }
            > .bg_animations {
                position: absolute;
                &.car_1 {
                    top: 1.4rem;
                    left: -30vw;
                    .bg-cover('animation_car_1');
                    animation: toLeft 5s infinite linear;
                }
                &.car_2 {
                    top: 5.2rem;
                    right: -30vw;
                    .bg-cover('animation_car_2');
                    animation: toRight 5s infinite linear;
                }
                &.people_1 {
                    bottom: -0.1rem;
                    left: 0.1rem;
                    .bg-cover('animation_people_1');
                    animation: move 6s infinite linear;
                }
                &.people_2 {
                    top: -0.6rem;
                    right: 2rem;
                    .bg-cover('animation_people_2');
                    animation: move 3s infinite linear;
                }
                &.people_3 {
                    bottom: 0.5rem;
                    right: 2rem;
                    .bg-cover('animation_people_3');
                    animation: move 9s infinite linear;
                }
                &.umbrella_1 {
                    top: -1.4rem;
                    right: -1rem;
                    transform: scale(0.6);
                    .bg-cover('animation_umbrella_1');
                    animation: rotateMove 12s infinite linear;
                }
                &.umbrella_2 {
                    bottom: 0.2rem;
                    left: -0.9rem;
                    transform: scale(0.6);
                    .bg-cover('animation_umbrella_2');
                    animation: rotateMove 9s infinite linear;
                }
                &.umbrella_3 {
                    top: 3rem;
                    right: -0.3rem;
                    transform: scale(0.6);
                    .bg-cover('animation_umbrella_3');
                    animation: rotateMove 6s infinite linear;
                }
            }
        }
        > .Lights {
            .light {
                &.on {
                    .bg-contain('btn_light1--on');
                }
                &.off {
                    .bg-contain('btn_light1--off');
                }
            }
            > .guidedFinger {
                top: 1.8rem;
                left: 1.6rem;
            }
        }
        .btn__wrapper {
            width: 100%;
            height: @barHeight;
            background-color: #fff;
            .flex();
            > .NextBtn {
                padding: 0.5rem;
                > .off {
                    .bg-contain('btn_next--off');
                }
                > .on {
                    top: 0.5rem;
                    .bg-contain('btn_next--on');
                }
            }
        }
    }
</style>
