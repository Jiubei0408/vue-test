import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const api = 'http://' + location.hostname + ':5000'
let state = {
    app: null,
    api: api,
    user: {
        username: "admin",
        nickname: "admin",
        permission: 1
    }
}

let mutations = {
    initApp(state, app) {
        state.app = app
    },
    getUser(state) {
        state.app.$http.get(api + '/session')
            .then(response => {
                state.user = response.data.data
            })
    },
}

export default new Vuex.Store({
    state,
    mutations
})
