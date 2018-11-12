import axios from 'axios'

// const host = 'http://192.168.0.65:3000' //test
// const host = 'http://192.168.0.106:3000' //test
const host = 'https://custom.24haowan.com' //线上

const api = axios.create({
    baseURL: host,
    headers: {
        "Content-Type": "application/json",
    },
})


export {
    api
}