<template>
    <div class="NextBtn" :class="isFinish && 'active'">
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
            isFinish: Boolean
        }
    };
</script>

<style lang="less">
    .NextBtn {
        position: relative;
        padding: 0.2rem 0.5rem 1rem 0.5rem;
        z-index: 2;
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
    }
</style>
