<template>
    <div>
        <div class="tableTitle">
            <b>
                通知列表 <span v-if="notify_list.length > 0">共 {{notify_list.length}} 条</span></b>
        </div>
        <el-card shadow="hover">
            <el-table v-loading="loading" :data="notify_list" stripe>
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form>
                            <el-form-item label="通知详情">
                                <span style="word-wrap: break-word">{{props.row.detail}}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="编号"
                        width="100px"/>
                <el-table-column
                        prop="title"
                        label="通知标题"/>
                <el-table-column
                        prop="creator"
                        label="创建人"
                        width="150px"/>
                <el-table-column
                        prop="count"
                        label="完成进度"
                        width="200px">
                    <template slot-scope="scope">
                        <span style="display: flex;">
                            <el-progress
                                    style="width: 60%; padding-right: 8px; color: black !important;"
                                    :stroke-width="20"
                                    :percentage="scope.row.count / scope.row.total * 100"
                                    show-text
                                    text-inside>
                            </el-progress>
                            {{scope.row.count}} / {{scope.row.total}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="confirmed" title="操作" width="200px">
                    <template slot-scope="scope">
                        <el-button v-if="!scope.row.confirmed" @click="confirmNotify(scope.row.id - 1)">确认</el-button>
                        <el-button v-else disabled>已确认</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: 'notify-list',
        data() {
            return {
                loading: false,
                notify_list: []
            }
        },
        methods: {
            refreshData() {
                this.loading = true
                let data = []
                for (let i = 1; i <= 10; i++) {
                    data.push({
                        id: i,
                        title: "test" + i,
                        count: i,
                        creator: "test",
                        total: 10,
                        detail: "波波鸽太强啦！！！".repeat(100),
                        confirmed: false
                    })
                }
                this.notify_list = data
                this.loading = false
            },
            confirmNotify(id) {
                let api = this.$store.api
                let that = this
                this.notify_list[id].confirmed = true
                return
                // eslint-disable-next-line no-unreachable
                this.$http.post(api + '/confirm/' + id)
                    .then(data => {
                        if (data.data.status)
                            that.notify_list[id].confirmed = true
                        else
                            that.$message.error(data.data.msg)
                    })
                    .catch(error => {
                        that.$message.error(error.response.statusText)
                    })
            }
        },
        created() {
            this.refreshData()
        }
    }
</script>

<style>
    .tableTitle {
        text-align: center;
        font-size: 20px;
        padding-bottom: 10px;
    }

    .el-form-item__label {
        color: #99a9bf;
    }
</style>