<template>
    <!-- <img v-if="src" class="Letter" :src="src" :alt="src" ref="letter"/> -->
    <div v-if="src" class="Letter img" :style="{backgroundImage: `url(${src})`}" ref="letter"/>
    <svg v-else class="Letter" :style="svgStyle">
        <use class="use" :xlink:href="getSpriteId()" ref="letter" />
    </svg>
</template>

<script>
    import { getLetterName } from '@/utils/functions.js';
    export default {
        name: 'Letter',
        props: {
            src: String,
            spriteId: String,
            resetSvgSize: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                svgStyle: {}
            };
        },
        mounted() {
            if (this.resetSvgSize || this.src) {
                const { width, height } = this.$refs.letter.getBoundingClientRect();
                this.svgStyle = {
                    width: width + 'px',
                    height: height + 'px'
                };
                this.$emit('inited', { width, height });
            }
        },
        methods: {
            getSpriteId() {
                const letterName = getLetterName(this.spriteId);
                return `#${letterName}`;
            }
        }
    };
</script>

<style lang="less">
    .Letter {
        width: 100%;
        height: 100%;
    }
    .img {
        .contain();
        // width: fit-content;
    }
</style>
