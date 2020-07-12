import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const api = location.hostname + ':5000/api'
let state = {
    app: null,
    api: api
}

let mutations = {
    getUser(state) {
        state.app.$http.get(api + '/session')
            .then(data => {
                state.user = data.data
            })
    }
}

export default new Vuex.Store({
    state,
    mutations
})
