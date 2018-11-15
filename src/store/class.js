export default {
    state: {
        AWARD_TITLES: ['勤奋之星', '自信之星', '进取之星'],
        loadCommonClass: [false, false, false],
        startLearnTimeStamp: 0,
        classes: [{
            listen: [],
            // write: [],
            write: ['D', 'D', 'D', 'd', 'd', 'd'],
            read: [],
        }],
        themeIndex: [1, 2, 3]
    },
    getters: {
        //学习时间
        learnTimeMinute: ({
            startLearnTimeStamp
        }) => {
            return ~~((new Date().getTime() - startLearnTimeStamp) / 1000 * 60)
        },
        //获得称号
        awardTitle: ({
            AWARD_TITLES
        }, getters, {
            currentLevelIndex
        }) => {
            const titleIndex = currentLevelIndex % AWARD_TITLES.length
            return AWARD_TITLES[titleIndex]
        },
        //class通用资源的是否加载过
        hadLoadCommonClass: ({
            loadCommonClass
        }, {
            currentClassType
        }) => loadCommonClass[currentClassType],
        //进入的class的类型
        currentClassType: (state, getters, {
            currentLevelIndex
        }) => (currentLevelIndex % 3 || 0) + 1,

        //听、写、读class的Key
        listenClassKey: (state) => state.classes[0].listen[0],
        writeClassKey: (state) => state.classes[0].write[0],
        readClassKey: (state) => state.classes[0].read[0],

        //随机主题
        themeIndex: ({
            themeIndex,
            classes
        }) => themeIndex[classes.length - 1]
    },
    mutations: {
        startLearn(state) {
            state.startLearnTimeStamp = new Date().getTime()
        },
        loadedCommon(state, index) {
            state.loadCommonClass[index] = true
        },
        initClasses(state, classes) {
            state.classes = classes
        },
        listen(state) {
            state.classes[0].listen.shift()
        },
        write(state) {
            state.classes[0].write.shift()
        },
        read(state) {
            state.classes[0].shift()
        },
        setThemeIndex(state, shuffleArr) {
            state.themeIndex = shuffleArr
        }
    },
    actions: {
        loadedCommon({
            commit,
            rootState
        }) {
            commit('loadedCommon', rootState.currentLevelIndex)
        },
        initClasses({
            commit,
            rootGetters,
            dispatch
        }) {
            const keys = rootGetters.currentLevelKey
            // console.log(rootGetters)
            let classes = []
            for (let letter of keys) {
                const lowerCase = letter
                const upperCase = letter.toUpperCase()
                classes.push({
                    listen: [upperCase + lowerCase, upperCase, lowerCase],
                    write: [upperCase, upperCase, upperCase, lowerCase, lowerCase, lowerCase],
                    read: [upperCase]
                })
            }
            dispatch('shuffleThemeIndex')
            commit('startLearn')
            commit('initClasses', classes)
        },
        finishClass({
            commit,
        }, type) {
            type && commit(type)
        },
        shuffleThemeIndex({
            commit,
            state
        }) {
            let arr = state.themeIndex
            for (let i = 1; i < arr.length; i++) {
                const random = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[random]] = [arr[random], arr[i]];
            }
            commit('setThemeIndex', arr)
        }
    },
}
