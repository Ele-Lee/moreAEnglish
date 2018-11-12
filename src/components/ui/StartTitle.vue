<template>
    <div class="StartTitle" :style="{opacity: show ? 1 : 0}">
        <div class="lettersBg">
            <div
                class="letters"
                :style="{backgroundImage: 'url('+require(`@/assets/class${classType}/${currentLevelKey}/letters_${currentLevelKey}.png`)+')'}"
            />
        </div>
        <div class="startBtn" @touchend="startLearn" />
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    export default {
        name: 'StartTitle',
        props: {
            classType: {
                type: Number,
                default: 0
            },
            show: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            ...mapGetters(['currentLevelKey', 'classMusicId']),
        },
        methods: {
            ...mapActions(['finishClass']),
            startLearn() {
                this.$audio.stop([this.classMusicId]).then(() => {
                    this.finishClass()
                    this.$router.replace(`class${this.classType}/listen`)
                })
            }
        }
    };
</script>

<style lang="less">
    .StartTitle {
        text-align: center;
        transition: opacity 1s;
        > .lettersBg {
            position: relative;
            > .letters {
                .contain();
            }
        }
        > .startBtn {
            margin: 0 auto;
            animation: scale 2s infinite ease-in-out;
        }
    }
</style>
