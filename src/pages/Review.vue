<template>
    <div class="Review">
        <div class="cloud1" />
        <div class="cloud2" />
        <div v-for="index in 2" :key="index" class="clouds" :class="`clouds_${index}`" />
        <div class="showBox">
            <div v-for="(item, index) in imgItmes" :key="`i${index}`" class="inner itemImg"
                :style="{backgroundImage: `url(${item})`, opacity: (isOddItem && imgIndex === index) ? 1:0}" />
            <div v-for="(item, index) in imgNames" :key="`n${index}`" class="inner itemName"
                :style="{backgroundImage: `url(${item})`, opacity: (isOddItem && imgIndex === index) ? 1:0}" />
            <div v-for="(item, index) in letterItems" :key="`l${index}`"
                class="inner itemLetter" :style="{backgroundImage: `url(${item})`, opacity: (!isOddItem && letterIndex === index)? 1:0}" />
        </div>
        <div class="srcollArea">
            <div class="srcollItems" @touchstart.stop="_stopEvent"
                @click.stop.prevent="showItem">
                <span v-for="(item, index) in reviewItems" :key="index" v-if="reviewImgSum > index"
                    :data-index="index" :data-letter="item" class="item"
                    :style="{backgroundImage: `url(${item})`}" />
            </div>
        </div>
        <div class="backHomeBtn" @touchend="backHome" />
    </div>
</template>

<script>
    import { requireAll } from '@/utils/functions.js';
    import { mapGetters } from 'vuex';
    const IMG_TYPE_NUM = 3;
    export default {
        name: 'Review',
        data() {
            return {
                imgNames: [],
                imgItmes: [],
                letterItems: [],
                showItemIndex: 0
            };
        },
        created() {
            const urls = requireAll(require.context('@/assets/review/img'));
            this._initItemUrls(urls);
            //用来防止两个音效一起播放
            this.preSoundId = null;
        },
        computed: {
            ...mapGetters(['reviewImgSum']),
            imgIndex() {
                return ~~((this.showItemIndex + 1) / 2 - 1);
            },
            letterIndex() {
                return ~~(this.showItemIndex / 2);
            },
            isOddItem() {
                return this.showItemIndex % 2 !== 0;
            }
        },
        methods: {
            backHome() {
                this.$router.replace('/');
            },
            showItem({
                target: {
                    dataset: { index, letter }
                }
            }) {
                if (index === undefined) return;
                this.showItemIndex = +index;
                const prefix = this.isOddItem ? 'word_' : 'letter_';
                const audioId = prefix + letter.split(/_(\w+)\./g)[1];
                this.$audio.stop([this.preSoundId]).then(() => {
                    console.log('audioId', audioId);
                    this._playAudio(audioId);
                });
                // console.log(this.showItemIndex, this.isOddItem, this.letterIndex, this.imgIndex, (this.showItemIndex+1)/2 )
            },
            _playAudio(audioId) {
                this.$audio.play(audioId);
                this.preSoundId = audioId;
            },
            _stopEvent() {
                return;
            },
            _initItemUrls(_urls) {
                const len = _urls.length / IMG_TYPE_NUM;
                let urls = [];
                let names = [];
                let letters = [];
                let reviews = [];
                for (let i = 0; i < len; i++) {
                    reviews.push(_urls[i + len], _urls[i]);
                    urls.push(_urls[i]);
                    letters.push(_urls[i + len]);
                    names.push(_urls[i + len * 2]);
                }
                this.reviewItems = reviews;
                this.imgItmes = urls;
                this.imgNames = names;
                this.letterItems = letters;
                // console.log(reviews)
            }
        }
    };
</script>

<style lang="less">
    @paths: 'review', 'home';
    .Review {
        .page();
        .flex-c();
        background: linear-gradient(to bottom, rgb(165, 238, 255), #f2fcff);
        > .cloud1 {
            position: absolute;
            left: 0;
            top: 2.5rem;
            z-index: -1;
            .bg-cover('cloud_top', 2);
        }
        > .cloud2 {
            position: absolute;
            left: 0;
            bottom: 0rem;
            z-index: -1;
            .bg-cover('cloud_bottom', 2);
        }
        > .clouds {
            .bg-cover('cloud', 2);
            position: absolute;
            z-index: -1;
            &_1 {
                top: 0.446rem;
                left: -0.879rem;
                transform: scale(0.8);
            }
            &_2 {
                top: 3.086rem;
                left: 6.071rem;
                transform: scale(0.7);
            }
        }
        > .showBox {
            // .flex-c();
            .bg-cover('bg_showBox');
            position: relative;
            margin-bottom: -0.5rem;
            > .inner {
                .contain();
                &.itemName {
                    .p-center(11%, 51%);
                    .wh(3.5rem, 0.9rem);
                }
                &.itemLetter {
                    .p-center(34%, 51%);
                    .wh(3.5rem);
                }
                &.itemImg {
                    .p-center(42%, 51%);
                    .wh(2.8rem);
                }
            }
        }
        > .srcollArea {
            position: relative;
            .bg-cover('bg_srcollArea');
            > .srcollItems {
                .click-fix();
                position: absolute;
                top: 0.139rem;
                left: 0.122rem;
                width: 8.4rem;
                height: 1.8rem;
                line-height: 1.8rem;
                overflow: scroll;
                white-space: nowrap;
                > .item {
                    display: inline-block;
                    width: 1.3rem;
                    height: 1.3rem;
                    margin: 0.05rem;
                    vertical-align: middle;
                    .contain();
                }
            }
        }
        > .backHomeBtn {
            margin-top: 1.5rem;
            @media @ipad {
                margin-top: 0.2rem;
            }
            .bg-cover('btn_backHome');
        }
    }
</style>
