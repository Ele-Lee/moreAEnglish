export default {
    state: {
        AWARD_TITLES: ['勤奋之星', '自信之星', '进取之星'],
        loadCommonClass: [false, false, false],
        startLearnTimeStamp: 0,
        // CLASS_LENGTH: 35,
        classes: [],
        classMusicIndex: 1,
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
        //class要播放的音乐id
        classMusicId: ({
            classMusicIndex
        }, getters, rootState, {
            currentLevelKey
        }) => currentLevelKey + '-' + classMusicIndex,
        //听、写、读class的Key
        listenClassKey: (state) => state.classes[0].listen[0],
        writeClassKey: (state) => state.classes[0].write[0],
        readClassKey: (state) => state.classes[0].read[0],
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
            state.classes.listen.unshift()
        },
        write(state) {
            state.classes.write.unshift()
        },
        read(state) {
            state.classes.unshift()
        },
        handleMusicIndex(state, index) {
            state.classMusicIndex = index
        },
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
            rootGetters
        }) {
            const keys = rootGetters.currentLevelKey
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
            commit('startLearn')
            commit('handleMusicIndex', 1)
            commit('initClasses', classes)
        },
        finishClass({
            commit,
            state,
        }, type) {
            type && commit(type)
            type !== 'read' && commit('handleMusicIndex', ++state.classMusicIndex)
        }
    },
}
