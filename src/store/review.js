export default {
    state: {
        PRE_LEVEL_REVIEW_IMG_NUM: 6
    },
    getters: {
        reviewImgSum: ({ PRE_LEVEL_REVIEW_IMG_NUM }, getters, { hadPassedLevels }) => {
            return Math.max(hadPassedLevels * PRE_LEVEL_REVIEW_IMG_NUM, 0)
        },
    },
}
