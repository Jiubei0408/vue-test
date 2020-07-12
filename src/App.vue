<template>
    <div id="app" ref="pageBox">
        <el-scrollbar class="scrollbar">
            <div id="appBox">
                <page-nav/>
                <div class="page-main-box">
                    <router-view/>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
    import PageNav from "@/components/page-item/page-nav"

    export default {
        name: 'app',
        components: {
            'page-nav': PageNav
        },
        data() {
            return {}
        },
        methods: {
            adjustSize() {
                this.clientHeight = window.innerHeight
                this.clientWidth = window.innerWidth
                this.$refs.pageBox.style.height = this.clientHeight + 'px'
                this.$refs.pageBox.style.widows = this.clientWidth + 'px'
            }
        },
        mounted() {
            this.adjustSize()
            const that = this
            window.onresize = () => {
                that.adjustSize()
            }
        }
    }
</script>

<style>
    * {
        padding: 0;
        margin: 0;
        border: 0;
        text-decoration: none;
        list-style-type: none;
    }

    #app {
        font-family: "Helvetica Neue", Helvetica, "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        overflow: hidden;
        width: 100%;
        min-width: 1100px;
    }

    #appBox {
        width: 1100px;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
    }

    .page-main-box {
        margin-top: 20px;
        margin-bottom: 20px;
        position: relative;
    }

    .scrollbar {
        height: 100%;
    }

    .el-scrollbar__wrap {
        overflow: auto;
    }
</style>
