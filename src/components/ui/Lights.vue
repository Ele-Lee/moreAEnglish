<template>
    <div class="Light">
        <div class="lights off">
            <div class="light off" v-for="light in 3" :key="light+'off'" />
        </div>
        <div class="lights on">
            <div class="light on" v-for="light in 3" :key="light+'on'"
                :data-index="light" :style="{opacity: listenTime > light-1 ? 1: 0}" />
        </div>
        <div class="guidedFinger" :data-index="1" :style="{display: showGuidedFinger ? 'block':'none'}" />
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
            }
        },
        data() {
            return {
                showGuidedFinger: true
            };
        },
        watch: {
            listenTime() {
                this.showGuidedFinger = false;
            }
        }
    };
</script>

<style lang="less">
    @paths: 'classCommon';
    .Light {
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
    }
</style>
