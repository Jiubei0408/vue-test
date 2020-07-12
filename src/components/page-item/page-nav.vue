<template>
    <div id="nav-bar">
        <el-menu :default-active="$route.path" mode="horizontal" router>
            <div id="nav_title" class="el-menu-item">
                <el-link @click="$router.push('/')" :underline="false">信息管理系统</el-link>
                <el-divider direction="vertical"/>
            </div>
            <el-menu-item v-for="(name, path) in all_routes" :key="name" :index="path" :route="path">
                {{name}}
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: 'page-nav',
        data() {
            return {
                all_routes: {}
            }
        },
        created() {
            for (let i in this.$router.options.routes) {
                let ele = this.$router.options.routes[i]
                if (ele.path === '*') continue
                this.all_routes[ele.path] = ele.name
            }
        }
    }
</script>

<style>
    #nav_title {
        color: #606266;
    }

    #nav_title:hover {
        color: #409EFF;
    }
</style>