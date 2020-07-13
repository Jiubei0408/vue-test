<template>
    <div>
        <template v-if="$store.state.user.username">
            <span style="margin-right: 15px">
            欢迎您,
                <el-button type="text"> {{this.$store.state.user.nickname}}</el-button>
            </span>
            <el-button icon="el-icon-user" @click="logout">登出</el-button>
        </template>
        <template v-else>
            <el-button icon="el-icon-user" type="primary" @click="$router.push('/login')">登录</el-button>
        </template>
    </div>
</template>


<script>
    export default {
        name: 'user-box',
        methods: {
            logout() {
                this.$store.commit('logout')
            }
        }
    }
</script>