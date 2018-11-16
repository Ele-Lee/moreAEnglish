<template>
    <div class="NextBtn" :class="['type_'+type, isFinish && 'active']">
        <div class="off" />
        <div class="on" :class="isFinish && 'active'" />
    </div>
</template>

<script>
    const SHOULD_LISTEN_TIME = 3;
    import { mapGetters } from 'vuex';
    export default {
        name: 'class1Listen',
        props: {
            isFinish: Boolean,
            type: Number
        }
    };
</script>

<style lang="less">
    @paths: 'class1/common', 'class2/common', 'class3/common';
    .NextBtn {
        position: relative;
        z-index: 2;
        padding: 0.2rem 0.5rem 1rem 0.5rem;
        transition: transform 1s;
        &.active {
            transform: scale(1.13);
        }
        > .on {
            position: absolute;
            top: 0.2rem;
            left: 50%;
            z-index: 0;
            transform: translateX(-50%);
            transition: opacity 1s;
            opacity: 0;
            &.active {
                opacity: 1;
            }
        }
        &.type_1 {
            > .off {
                .bg-contain('btn_next--off');
            }
            > .on {
                .bg-contain('btn_next--on');
            }
        }
        &.type_2 {
            > .off {
                .bg-contain('btn_next--off', 2);
            }
            > .on {
                .bg-contain('btn_next--on', 2);
            }
        }
        &.type_3 {
            > .off {
                .bg-contain('btn_next--off', 3);
            }
            > .on {
                .bg-contain('btn_next--on', 3);
            }
        }
    }
</style>
