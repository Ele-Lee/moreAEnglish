<template>
    <div class="BgLetters" :class="'type_'+type">
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
            letterKey: String,
            type: Number
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
        &.type_1 {
            background-color: rgb(255, 242, 195);
            .Letter {
                fill: rgb(254, 235, 181);
            }
        }
        &.type_2 {
            background-color: rgb(184, 230, 254);
            .Letter {
                fill: rgb(165, 220, 254);
            }
        }
        &.type_3 {
            background-color: rgb(255, 233, 244);
            .Letter {
                fill: rgb(255, 225, 236);
            }
        }
    }
</style>
