import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const api = 'http://' + location.hostname + ':5000'
let state = {
    app: null,
    api: api,
    user: {
        username: '',
        nickname: '',
        permission: 0,
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
            .catch(() => {
                state.user = {
                    username: '',
                    nickname: '',
                    permission: 0,
                }
            })
    },
    login(state, data) {
        state.app.$http.post(api + '/session', {
            username: data.username,
            password: data.password
        })
            .then(response => {
                state.app.$store.commit('getUser')
                state.app.$message.success(response.data.msg)
                state.app.$router.push('/')
            })
            .catch(error => {
                if (error.response) {
                    state.app.$message.error(error.response.data.msg)
                }else{
                    state.app.$message.error("无法连接到服务器")
                }
            })
    },
    logout(state) {
        state.app.$http.delete(api + '/session')
            .then(response => {
                state.app.$store.commit('getUser')
                state.app.$message.success(response.data.msg)
                state.app.$router.push('/')
            })
            .catch(error => {
                if (error.response) {
                    state.app.$message.error(error.response.data.msg)
                }else{
                    state.app.$message.error("无法连接到服务器")
                }
            })
    }
}

export default new Vuex.Store({
    state,
    mutations
})
