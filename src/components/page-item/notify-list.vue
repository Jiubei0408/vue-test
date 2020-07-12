<template>
    <div>
        <div class="tableTitle">
            <b>
                通知列表 <span v-if="data.length > 0">共 {{data.length}} 条</span></b>
        </div>
        <el-card shadow="hover">
            <el-table :data="data">
            </el-table>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: 'notify-list',
        data() {
            return {
                data: []
            }
        },
        methods: {
            refreshData() {

            }
        }
    }
</script>

<style>
    .tableTitle {
        text-align: center;
        font-size: 20px;
        padding-bottom: 10px;
    }
</style>