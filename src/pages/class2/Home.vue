<template>
    <div class="Class2Home">
        <div class="bottom__building" />
        <div class="title" />
        <!-- 加载页 -->
        <Loading v-show="!mixinLoaded" :percentage="mixinPercentage" />
        <!-- 开始页 -->
        <StartTitle :show="mixinLoaded" :classType="2" />
    </div>
</template>

<script>
    import preload from '@/mixins/preload.js';
    import classLoading from '@/mixins/classLoading.js';
    export default {
        name: 'Class2Home',
        mixins: [classLoading, preload],
        beforeMount() {
            this.$assetsMap = new Map([
                ['def', require.context('@/assets/class2/def')],
                ['mno', require.context('@/assets/class2/mno')],
                ['uvw', require.context('@/assets/class2/uvw')],
                ['common', require.context('@/assets/class2/common')]
            ]);
        }
    };
</script>

<style lang="less">
    @paths: 'class2/common/loading', 'class2/common';
    .Class2Home {
        .page();
        background: rgb(188, 252, 255);
        > .title {
            .p-center(11%);
            @media @ipad {
                top: 7%;
            }
            .bg-cover('start_title');
        }
        > .bottom__building {
            .p-bottom();
            .bg-cover('bg_footer');
        }
        > .Loading {
            .p-center(33%);
            .bg-cover('loadingBar--empty');
            border-radius: 0;
            > .innerBar {
                .bg-cover('loadingBar--full');
            }
        }
        > .StartTitle {
            .p-center(35%);
            @media @ipad {
                top: 30%;
            }
            > .lettersBg {
                .bg-cover('bg_letters');
                transform: translateY(0.5rem);
                > .letters {
                    .wh(80%);
                    .p-center(48%);
                }
            }
            > .startBtn {
                .bg-cover('btn_start');
            }
        }
    }
</style>

