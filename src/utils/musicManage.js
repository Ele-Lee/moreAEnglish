import {Howl} from 'howler';

import {getRandomColor} from './utils.js'

class MusicManage {
    constructor() {
        this.loadedAudio = new Map()
        this.playingList = new Set()
    }

    getAudio(key) {
        const loadedAudio = this.loadedAudio
        return loadedAudio.has(key) && loadedAudio.get(key)
    }

    preload(src) {
        console.log(src)
        return new Promise((resolve) => {
            const key = src.split(/\/media\/(.+?)\./)[1]
            const audio = new Howl({ src, preload: true });
            const _color = getRandomColor()
            console.log(`%c start load: ${key}`, `color: ${_color}`)
            audio.once('load', () => {
                this.loadedAudio.set(key, audio)
                console.log(`%c loaded: ${key}`, `color: ${_color}`)
                resolve()
            })
            // setTimeout(() => {
            //     this.loadedAudio.set(key, audio)
            //     resolve()
            // }, 1000)
        })
    }

    unload(keys) {
        if (Array.isArray(keys)) {
            for (let key of keys) {
                loadedAudio.delete(key)
            }
        }
    }

    play(key, { loop = false, force = false } = {}) {
        return new Promise((resolve, reject) => {
            if (this.playingList.has(key)) return;
            if (this.loadedAudio.has(key)) {
                const _over = () => {
                    this.playingList.delete(key)
                    resolve()
                }
                const audio = this.loadedAudio.get(key).loop(loop)
                audio.play()
                loop || audio.once('end', _over)
                audio.once('stop', _over)

                force && this._wxAutoPlay(audio)
                this.playingList.add(key)
            } else {
                console.warn('unload', key)
                resolve()
            }
        })
    }

    stop(keys) {
        return new Promise(resolve => {
            let stopSum = 0
            const stopLength = keys.length
            // console.log(keys, stopLength)
            // if (stopLength === undefined) resolve()
            const _stop = (key) => {
                key && this.playingList.delete(key)
                ++stopSum === stopLength && resolve()
            }
            // console.log('keys', keys)
            for (let key of keys) {
                if (this.playingList.has(key)) {
                    const audio = this.loadedAudio.get(key)
                    audio.once('stop', _stop(key))
                    audio.stop()
                } else {
                    _stop()
                }
            }
        })
    }

    _wxAutoPlay(audio) {
        return new Promise((resolve, reject) => {
            if (window['WeixinJSBridge']) {
                WeixinJSBridge.invoke('getNetworkType', {}, () => {
                    const id = audio.play()
                    resolve(id)
                }, false);
            } else {
                reject()
            }
        })
    }
}

export default {
    install(Vue) {
        Vue.prototype.$audio = new MusicManage()
    }
}
