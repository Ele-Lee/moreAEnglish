<template>
    <div class="Class1Home">
        <div class="top__mask"/>
        <div class="bottom cloud"/>
        <div class="bottom children"/>
        <div class="title"/>
        <!-- 加载页 -->
        <Loading v-show="!mixinLoaded" :percentage="mixinPercentage"/>
        <!-- 开始页 -->
        <StartTitle :show="mixinLoaded" :classType="1"/>
    </div>
</template>

<script>
import preload from '@/mixins/preload.js';
import classLoading from '@/mixins/classLoading.js';
    export default {
        name: 'Class1Home',
        mixins: [classLoading, preload],
        created() {
            console.log('created')
            this.$assetsMap = new Map([
                ['abc', require.context('@/assets/class1/abc')],
                ['jkl', require.context('@/assets/class1/jkl')],
                ['sty', require.context('@/assets/class1/sty')]
                // ['common', require.context('@/assets/class1/common/loading', true)]
            ])
        },
    };
</script>

<style lang="less">
    @paths: 'class1/common/loading', 'class1/common';
    .Class1Home {
        .page();
        .flex-c(start);
        background: linear-gradient(to bottom, #a9f2f9, #cafdff);
        > .top__mask {
            .p-top();
            .bg-cover('bg_header', 2);
            z-index: -1;
        }
        > .bottom {
            .p-bottom();
            &.cloud {
                padding-bottom: 2.2rem;
                .bg-cover('bg_footer_cloud', 2)
            }
            &.children {
                .bg-cover('bg_reading')
            }
        }
        > .title {
            flex: .25;
            .bg-contain('start_title');
        }
        > .Loading {
            .p-center(40%);
            @media @ipad {
                top: 45%;
            }
            .bg-cover('loadingBar--empty');
            > .innerBar {
                .bg-cover('loadingBar--full');
            }
        }
        > .StartTitle{
            .p-center(45%);
            @media @ipad {
                top: 40.5%;
            }
            > .lettersBg {
                margin-bottom: .8rem;
                @media @ipad {
                    margin-bottom: .3rem;
                }
                .bg-contain('bg_letters');
                > .letters {
                    .wh(80%);
                    .p-center(62%);
                }
            }
            > .startBtn{
                .bg-contain('btn_start');
            }
        }
    }

</style>
