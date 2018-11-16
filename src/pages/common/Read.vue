<template>
    <div class="Read" >
        <BgLetters :letterKey="readClassKey" :type="currentClassType"/>
        <div class="top__mask"/>
        <div class="title__wrapper">
            <div class="title"/>
        </div>
        <main class="showBox" :class="'class'+currentClassType">
            <div class="sentence" :style="{backgroundImage: `url(${require(`@/assets/class${currentClassType}/common/read/sentence_${readClassKey}.png`)})`}"/>
            <div class="item" :style="{backgroundImage: `url(${require(`@/assets/review/img/img_${_readClassKey}.png`)})`}"/>
        </main>
        <div class="btns_wrapper">
            <Lights
                :type="currentClassType" :listenTime="readTime"
                :showGuidedFinger="false"
                @touchstart.stop.native="readSentence"
            />
            <NextBtn
                :type="currentClassType"
                @click.native="nextClass"
                :isFinish="finishRead"
            />
        </div>
    </div>
</template>

<script>
    const SHOULD_READ_TIME = 3;
    import Letter from '@/components/ui/Letter.vue';
    import Lights from '@/components/ui/Lights.vue';
    import NextBtn from '@/components/ui/NextBtn.vue';
    import BgLetters from '@/components/ui/BgLetters.vue';
    import { mapGetters } from 'vuex';
    export default {
        name: 'Read',
        components: {
            Letter,
            Lights,
            NextBtn,
            BgLetters
        },
        data() {
            return {
                //听完的次数
                readTime: 0
            };
        },
        created() {
            this._clickAble = true;
        },
        computed: {
            ...mapGetters(['currentClassType', 'readClassKey']),
            _readClassKey() {
                const duplicateLetter = 'y';
                const { readClassKey, currentClassType } = this;
                return readClassKey === duplicateLetter
                    ? duplicateLetter + Math.ceil(currentClassType / 2)
                    : readClassKey;
            },
            finishRead() {
                return SHOULD_READ_TIME === this.readTime;
            }
        },
        methods: {
            readSentence({
                target: {
                    dataset: { index }
                }
            }) {
                if (index - 1 === this.readTime && this._clickAble) {
                    const wordAudio = 'word_' + this.readClassKey;
                    this.readTime += 1;
                    this._clickAble = false;
                    this.$audio.play(wordAudio).then(() => {
                        this._clickAble = true;
                        this.finishListen && this.$audio.play(`finish`);
                    });
                }
            },
            nextClass() {
                console.log('to do to game1');
                // this.$router.replace('class1/game1');
            }
        }
    };
</script>

<style lang="less">
    @paths: 'classCommon', 'class1/common/read', 'class2/common/read', 'class3/common/read',
        'classCommon/titles';
    .Read {
        .page();
        .flex-c(space-between);
        > .top__mask {
            .p-top();
            .bg-cover('bg_header');
        }
        > .title__wrapper {
            z-index: 1;
            > .title {
                margin-top: 4vh;
                @media @ipad {
                    margin-top: 0vh;
                    transform: translateY(2vh);
                }
                .bg-cover('read_title', 5);
            }
        }
        > .showBox {
            @x: 7%;
            position: relative;
            .wh(6.7733rem, 6.52rem);
            .contain();
            > .sentence {
                .wh(100%, 1rem);
                .contain();
            }
            .item {
                position: absolute;
                transform: translate(-50%, -50%);
                .contain();
            }
            &.class1 {
                transform: translate(-@x, 10vh);
                .bg-img('bg_showBox', 2);
                > .sentence {
                    transform: translate(@x, -7vh);
                    @media @ipad {
                        transform: translate(@x, -9vh);
                    }
                }
                > .item {
                    top: 44%;
                    left: 57%;
                    .wh(65%);
                }
            }
            &.class2 {
                transform: translateY(6vh);
                .bg-cover('bg_showBox', 3);
                @media @ipad {
                    transform: translateY(2vh);
                }
                > .sentence {
                    transform: translate(-2%, 94%) scale(0.75);
                }
                > .item {
                    top: 71%;
                    left: 50%;
                    .wh(50%);
                }
            }
            &.class3 {
                .bg-cover('bg_showBox', 4);
                transform: translateY(6vh);
                @media @ipad {
                    transform: translateY(5vh);
                }
                > .item {
                    top: 65%;
                    left: 50%;
                    .wh(35%);
                }
                > .sentence {
                    transform: translate(2.5%, -7vh) scale(0.8);
                    @media @ipad {
                        transform: translate(2.5%, -7vh) scale(0.7);
                    }
                }
            }
        }
        > .btns_wrapper {
            .flex-c();
            > .Lights > .lights {
                @media @ipad {
                    padding-top: 0;
                    padding-bottom: 0.2rem;
                }
            }
            > .NextBtn {
                @media @ipad {
                    padding-bottom: 0.5rem;
                }
            }
        }
    }
</style>
