<template>
    <div id="app" @touchstart="clickSound">
        <keep-alive>
            <router-view />
        </keep-alive>
    </div>
</template>

<script>
    export default {
        methods: {
            clickSound() {
                this.$audio.play('click');
            }
        }
    };
</script>

<style lang="less">
    body {
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        user-select: none;
    }
    #app {
        .page();
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        overflow: hidden;
        // .iconfont{-webkit-font-smoothing: antialiased;}
        // .iconfont{-webkit-text-stroke-width: 0.2px;}
    }
</style>
