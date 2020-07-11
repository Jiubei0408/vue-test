<template>
    <div id="nav-bar">
        <el-menu :default-active="this.$route.path" mode="horizontal" style="display: inline-block" router>
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
                this.all_routes[ele.path] = ele.name
            }
        }
    }
</script>