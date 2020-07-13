<template>
    <div id="nav-bar">
        <el-menu :default-active="$route.path" mode="horizontal" style="height: 60px" router>
            <div id="nav_title" class="el-menu-item">
                <el-link @click="$router.push('/')" :underline="false">信息管理系统</el-link>
                <el-divider direction="vertical"/>
            </div>
            <el-menu-item v-for="(name, path) in all_routes" :key="name" :index="path" :route="path">
                {{name}}
            </el-menu-item>
            <div id="userBox">
                <user-box/>
            </div>
        </el-menu>
    </div>
</template>

<script>
    import UserBox from '@/components/page-item/user-box'

    export default {
        name: 'page-nav',
        components: {
            'user-box': UserBox,
        },
        data() {
            return {
                all_routes: {}
            }
        },
        created() {
            for (let i in this.$router.options.routes) {
                let route = this.$router.options.routes[i]
                if (route.path === '*' || route.path === '/login') continue
                this.all_routes[route.path] = route.name
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

    #userBox {
        position: relative;
        top: 50%;
        transform: translate(0, -50%);
        float: right;
        outline: none;
    }

</style>