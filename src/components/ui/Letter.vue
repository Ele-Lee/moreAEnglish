<template>
    <svg class="Letter">
        <use :xlink:href="getSpriteId()"/>
    </svg>
</template>

<script>
//大小写的ASCII码阈值
const ASCII_THRESHOLD = 91
    export default {
        name: 'Letter',
        props: {
            spriteId: String
        },
        computed: {
        },
        methods: {
            getSpriteId() {
                const ASCII = +this.spriteId.charCodeAt()
                //大于阈值小写，反之大写
                const sign = ASCII > ASCII_THRESHOLD ? '_' : '-'
                return `#letter${sign}${this.spriteId}`
            }
        }
    };
</script>

<style lang="less">
</style>
