<template>
    <div class="Class3Home">
        <div class="title"/>
        <!-- 加载页 -->
        <Loading v-show="!mixinLoaded" :percentage="mixinPercentage"/>
        <!-- 开始页 -->
        <StartTitle :show="mixinLoaded" :classType="3"/>
        <div class="bottom__family"/>
    </div>
</template>

<script>
import preload from '@/mixins/preload.js';
import classLoading from '@/mixins/classLoading.js';
    export default {
        name: 'Class3Home',
        mixins: [classLoading, preload],
        created() {
            this.$assetsMap = new Map([
                ['ghi', require.context('@/assets/class3/ghi', true)],
                ['pqr', require.context('@/assets/class3/pqr', true)],
                ['xyz', require.context('@/assets/class3/xyz', true)],
                // ['common', require.context('@/assets/class3/common/loading', true)]
            ])
        },
    };
</script>

<style lang="less">
    @paths: 'class3/common/loading', 'class3/common';
    .Class3Home {
        .page();
        .flex-c(space-around);
        .bg-cover('bg_loading');
        height: 100vh;
        > .bottom__family {
            // .p-center(81%);
            .bg-cover('bg_family');
            // @media @ipad {
            //     top: 78%;
            // }
        }
        > .title {
            // .p-center(3.2rem);
            .bg-cover('start_title');
            // @media @ipad {
            //     top: 10%;
            // }
        }
        > .Loading {
            .p-center(40%);
            @media @ipad {
                top: 35%;
            }
            .bg-cover('loadingBar--empty');
            > .innerBar {
                .bg-cover('loadingBar--full');
            }
        }
        > .StartTitle{
            // .p-center(48%);
            @media @ipad {
                top: 40%;
            }
            > .lettersBg {
                margin-bottom: 1.5rem;
                @media @ipad {
                    margin-bottom: .6rem;
                }
                .bg-cover('bg_letters');
                > .letters {
                    .wh(80%);
                    .p-center(50.5%, 46%);
                }
            }
            > .startBtn{
                .bg-cover('btn_start');
            }
        }
    }

</style>
