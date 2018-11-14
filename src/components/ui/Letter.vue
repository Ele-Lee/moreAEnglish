<template>
    <svg class="Letter" :style="svgStyle">
        <use :xlink:href="getSpriteId()" ref="letter" />
    </svg>
</template>

<script>
    import { getLetterName } from '@/utils/functions.js';
    export default {
        name: 'Letter',
        props: {
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
            if (this.resetSvgSize) {
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
        width: unset;
        height: unset;
    }
</style>
