import Vue from 'vue'
import Vuex from 'vuex'
import Review from './review.js';
import Class from './class.js';
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //各个关卡的key
        levels: [
            'abc',
            'def',
            'ghi',
            'jkl',
            'mno',
            'pqr',
            'sty',
            'uvw',
            'xyz'
        ],
        //通过的关卡数
        //进入的关卡index
        //class 1
        // hadPassedLevels: 0,
        // currentLevelIndex: 0,

        //class 2
        // hadPassedLevels: 2,
        // currentLevelIndex: 1,

        //class 3
        hadPassedLevels: 9,
        currentLevelIndex: 2,
    },
    getters: {
        // levels: state => state.levels,
        //关卡总数
        LEVEL_SUM: state => state.levels.length,
        //每关字母数量
        PRE_LEVEL_LETTERS: state => state.levels[0].length,
        //最新的关卡index
        latestLevelIndex: state => state.hadPassedLevels + 1,
        //通过的关卡数
        hadPassedLevels: state => state.hadPassedLevels,
        //进入关卡的相应key
        currentLevelKey: state => {
            const {
                levels,
                currentLevelIndex
            } = state
            return levels[currentLevelIndex]
        },
        inHome: (state) => state.inHome
    },
    mutations: {
        passLevel(state) {
            state.hadPassedLevels++
        },
        initPassedLevels(state, level) {
            state.hadPassedLevels = level
        },
        swichLevel(state, level) {
            state.currentLevelIndex = level
        }
    },
    actions: {
        async initPassedLevels({
            commit
        }) {
            //todo 从接口返回
            const level = 1
            commit('initPassedLevels', level)
        },
        async passLevel({
            commit
        }) {
            //todo 调用接口
            commit('passLevel')
        },
        swichLevel({
            commit,
            dispatch
        }, level) {
            const levelIndex = level - 1
            commit('swichLevel', levelIndex)
            dispatch('initClasses')
        },
    },
    modules: {
        Review,
        Class,
    }
})
