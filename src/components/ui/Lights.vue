<template>
    <div class="Lights" :class="'type_'+type">
        <div class="lights off">
            <div class="light off" v-for="light in 3" :key="light+'off'" />
        </div>
        <div class="lights on">
            <div class="light on" v-for="light in 3" :key="light+'on'"
                :data-index="light" :style="{opacity: listenTime > light-1 ? 1: 0}" />
        </div>
        <div class="guidedFinger" :data-index="1" :style="{display: (showGuidedFinger && listenTime>0) ? 'block':'none'}" />
    </div>
</template>

<script>
    const SHOULD_LISTEN_TIME = 3;
    import { mapGetters } from 'vuex';
    export default {
        name: 'class1Listen',
        props: {
            listenTime: {
                type: Number,
                default: 0
            },
            type: Number,
            showGuidedFinger: {
                type: Boolean,
                default: true
            }
        }
        // data() {
        //     return {
        //         showGuidedFinger: true
        //     };
        // },
        // watch: {
        //     listenTime() {
        //         this.showGuidedFinger = false;
        //     }
        // }
    };
</script>

<style lang="less">
    @paths: 'classCommon', 'class1/common', 'class2/common', 'class3/common';
    .Lights {
        position: relative;
        z-index: 1;
        > .lights {
            .flex();
            padding: 0.5rem;
            &.on {
                .p-top();
            }
            > .light {
                padding: 0 0.2rem;
                &.on {
                    transition: opacity 1s;
                }
            }
        }
        > .guidedFinger {
            position: absolute;
            left: 1.4rem;
            top: 1.2rem;
            .bg-contain('guidedFinger');
            width: 1.3rem;
            height: 1.4rem;
            transition: opacity 1s;
            animation: click 1s infinite alternate-reverse;
        }
        &.type_1 {
            .light {
                &.on {
                    .bg-cover('btn_light--on', 2);
                }
                &.off {
                    .bg-cover('btn_light--off', 2);
                }
            }
        }
        &.type_2 {
            .light {
                &.on {
                    .bg-cover('btn_light2--on', 3);
                }
                &.off {
                    .bg-cover('btn_light2--off', 3);
                }
            }
        }
        &.type_3 {
            .light {
                &.on {
                    .bg-cover('btn_light--on', 4);
                }
                &.off {
                    .bg-cover('btn_light--off', 4);
                }
            }
        }
        &.type_4 {
            .light {
                &.on {
                    .bg-cover('btn_light1--on', 3);
                }
                &.off {
                    .bg-cover('btn_light1--off', 3);
                }
            }
        }
    }
</style>
