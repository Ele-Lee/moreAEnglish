<template>
    <div class="Home">
        <div class="cloud1" />
        <div class="cloud2" />
        <div v-for="index in 4" :key="index" class="clouds" :class="`clouds_${index}`"
            :style="{opacity: mixinLoaded ? 1 : 0}" />
        <div class="title" />
        <!-- 加载页 -->
        <Loading v-show="!mixinLoaded" :percentage="mixinPercentage" />
        <!-- 关卡选择页 -->
        <section class="levels__select" :style="{opacity: mixinLoaded ? 1 : 0}">
            <main class="isles" @touchend="handleLevel">
                <div v-for="levelIndex in LEVEL_SUM+1" :key="levelIndex"
                    :data-index="levelIndex" class="click__areas" :style="{opacity: latestLevelIndex >= levelIndex ? 0 : 1}"
                    :class="levelIndex === LEVEL_SUM+1 ? 'treasure' : `lock lock-${levelIndex}`" />
            </main>
        </section>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import preload from '@/mixins/preload.js';
    import Loading from '@/components/ui/Loading.vue';
    const REVIEW_INDEX = 10;
    export default {
        name: 'Home',
        mixins: [preload],
        components: {
            Loading
        },
        beforeMount() {
            this.$assets = [
                require.context('@/assets/home/', true),
                require.context('@/assets/review/', true),
                require.context('@/assets/classCommon', true)
            ];
        },
        computed: {
            ...mapGetters(['latestLevelIndex', 'LEVEL_SUM', 'currentClassType'])
        },
        methods: {
            ...mapActions(['swichLevel']),
            $loaded() {
                setTimeout(() => {
                    this.$audio.play('bgm_home', { loop: true, force: true });
                    this.mixinLoaded = true;
                }, 1000);
            },
            handleLevel({
                target: {
                    dataset: { index: levelIndex }
                }
            }) {
                // console.log(levelIndex, levelIndex === REVIEW_INDEX);
                if (!this.mixinLoaded || !levelIndex) return;
                this.$audio.stop('bgm_home');
                //进入宝箱回顾页
                if (levelIndex == REVIEW_INDEX) {
                    this.$router.replace('review');
                } else if (this.latestLevelIndex >= levelIndex) {
                    this.swichLevel(levelIndex);
                    this.$router.replace(`class${this.currentClassType}`);
                    console.log('levelIndex: ', levelIndex, 'currentClassType:', this.currentClassType);
                }
            }
        }
    };
</script>

<style lang="less">
    @paths: 'home';
    .Home {
        .page();
        .flex-c();
        background: linear-gradient(to bottom, #a5eeff, #f2fcff);
        > .cloud1 {
            .p-top(2.5rem);
            z-index: -2;
            .bg-cover('cloud_top');
        }
        > .cloud2 {
            .p-bottom();
            .bg-cover('cloud_bottom');
        }
        > .title {
            flex: 0.3;
            z-index: 4;
            .bg-contain('game_title');
        }
        > .Loading {
            .p-center();
            .bg-cover('loadingBar--empty');
            > .innerBar {
                .bg-cover('loadingBar--full');
            }
        }
        > .levels__select {
            flex: 1;
            transition: opacity 1s;
            > .isles {
                position: relative;
                .bg-cover('bg_levels');
                z-index: 2;
                > .click__areas {
                    position: absolute;
                    &.lock {
                        .bg-cover('level_lock');
                        padding: 0.5rem;
                        transform: scale(0.8);
                        &-1 {
                            top: -0.159rem;
                            left: 1.835rem;
                        }
                        &-2 {
                            top: 0.533rem;
                            left: 4.194rem;
                        }
                        &-3 {
                            top: 1.011rem;
                            left: 5.777rem;
                        }
                        &-4 {
                            top: 3.216rem;
                            left: 6.287rem;
                        }
                        &-5 {
                            top: 2.121rem;
                            left: 3.096rem;
                        }
                        &-6 {
                            top: 3.029rem;
                            left: 1.908rem;
                        }
                        &-7 {
                            top: 2.542rem;
                            left: 0.357rem;
                        }
                        &-8 {
                            top: 3.734rem;
                            left: 4.616rem;
                        }
                        &-9 {
                            top: 6.023rem;
                            left: 2.51rem;
                        }
                    }
                    &.treasure {
                        top: 8.8rem;
                        left: 1.8rem;
                        .wh(2rem);
                    }
                }
            }
        }
        > .clouds {
            .bg-cover('cloud');
            position: absolute;
            z-index: -1;
            &_1 {
                top: 0.83rem;
                left: -1.24rem;
                transform: scale(0.8);
            }
            &_2 {
                top: 0.31rem;
                left: 5.26rem;
                transform: scale(0.35);
            }
            &_3 {
                top: 4.07rem;
                left: 7.25rem;
                transform: scale(0.8);
            }
            &_4 {
                top: 14.27rem;
                left: -2.31rem;
            }
        }
    }
</style>
