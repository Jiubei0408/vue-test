import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const api = location.hostname + ':5000/api'
let state = {
    app: null,
    api: api
}

let mutations = {
    initApp(state, app) {
        state.app = app
    },
    getUser(state) {
        state.app.$http.get(api + '/session')
            .then(data => {
                state.user = data.data
            })
    },
    getNotifyList(state, cb) {
        let data = []
        for (let i = 1; i <= 10; i++) {
            data.push({
                id: i,
                title: "test" + i,
                count: i,
                creator: "test",
                total: 10,
                detail: "波波鸽太强啦！！！".repeat(100)
            })
        }
        cb(data)
        return
        // eslint-disable-next-line no-unreachable
        state.app.$http.get(api + '/notify_list')
            .then(data => {
                cb(data.data)
            })
    }
}

export default new Vuex.Store({
    state,
    mutations
})
