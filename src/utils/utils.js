const isWeixinBrowser = /micromessenger/i.test(navigator.userAgent)

const getRandomColor = () => '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);

export {
    isWeixinBrowser,
    getRandomColor
}
