<template>
    <div class="Loading">
        <div class="innerBar" :style="{transform: `translateX(-${100-percentage}%)`}" />
    </div>
</template>

<script>
    export default {
        name: 'Loading',
        props: {
            percentage: {
                type: Number,
                default: 0
            }
        },
    };
</script>

<style lang="less">
    .Loading {
        .flex();
        .border-horn-hidden-fix(2rem);
        > .innerBar {
            transition: all 1s;
            transform-origin: 0 center;
        }
    }
</style>
