<template>
    <el-button type="primary" icon="el-icon-user" @click="login">登录测试</el-button>
</template>

<script>
    export default {
        name: 'login',
        methods:{
            login(){
                this.$store.commit('login', {
                    username: 'admin',
                    password: 'admin'
                })
            }
        }
    }
</script>