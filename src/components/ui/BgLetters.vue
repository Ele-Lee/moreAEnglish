<template>
    <div class="BgLetters">
        <div class="cloums" v-for="cloums in 5" :key="cloums">
            <Letter v-for="letter in 6" :key="letter" :sprite-id="cloums%2 ===0 ? letterKey.toLowerCase() : letterKey.toUpperCase()"
                :style="{transform: `rotate(${getRandomRotate()}deg)`}" />
        </div>
    </div>
</template>

<script>
    import Letter from '@/components/ui/Letter.vue';
    export default {
        name: 'BgLetters',
        components: {
            Letter
        },
        props: {
            letterKey: String
        },
        methods: {
            getRandomRotate(n = 0, m = 360) {
                return Math.floor(Math.random() * (m - n + 1) + n);
            }
        }
    };
</script>

<style lang="less">
    .BgLetters {
        .page();
        .flex();
        z-index: -1;
        > .cloums {
            height: 100%;
            width: 20%;
            .flex-c(space-around);
            &:nth-of-type(even) {
                transform: translateY(1rem);
            }
            > .Letter {
                .wh(1rem);
                transform-origin: center;
            }
        }
    }
</style>
