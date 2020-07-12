<template>
    <div>
        <div class="tableTitle">
            <b>
                通知列表 <span v-if="notify_list.length > 0">共 {{notify_list.length}} 条</span></b>
        </div>
        <el-card shadow="hover">
            <el-table ref="table" :expand-row-keys="expand_row" row-key="id" v-loading="loading" :data="notify_list"
                      stripe>
                <el-table-column
                        prop="id"
                        label="编号"
                        width="100"/>
                <el-table-column
                        prop="title"
                        label="通知标题"/>
                <el-table-column
                        prop="creator"
                        label="创建人"
                        width="150"/>
                <el-table-column
                        prop="count"
                        label="完成进度"
                        width="200">
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
                <el-table-column label="操作" width="500">
                    <template slot-scope="scope">
                        <div>
                            <el-button @click="openDetail(scope.row.id)">
                                通知详情
                            </el-button>
                            <el-button
                                    v-if="$store.state.user.permission === 1"
                                    @click="openConfirmDetail(scope.row.id)">
                                完成情况
                            </el-button>
                            <el-button
                                    v-if="!scope.row.confirmed"
                                    @click="confirmNotify(scope.row.id)">
                                确认
                            </el-button>
                            <el-button v-else disabled>已确认</el-button>
                            <el-button
                                    v-if="$store.state.user.permission === 1"
                                    @click="delNotify(scope.row.id)">
                                删除
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="isDetail"
                        type="expand"
                        width="1">
                    <template slot-scope="props">
                        <el-form v-loading="detailLoading">
                            <el-form-item label="通知详情">
                                <span style="word-wrap: break-word">{{props.row.detail}}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="isConfirmDetail"
                        type="expand"
                        width="1">
                    <template slot-scope="props">
                        <el-form v-loading="confirmDetailLoading">
                            <el-form-item label="完成详情">
                                <span style="word-wrap: break-word">{{props.row.confirmDetail}}</span>
                            </el-form-item>
                        </el-form>
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
                notify_list: [],
                isDetail: false,
                detailLoading: false,
                isConfirmDetail: false,
                confirmDetailLoading: false,
                expand_row: []
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
                        confirmed: false,
                        confirmDetail: "test"
                    })
                }
                this.notify_list = data
                this.loading = false
            },
            openDetail(id) {
                let that = this
                if (this.isDetail && this.expand_row.includes(id.toString())) {
                    this.expand_row = []
                    this.isDetail = false
                    return
                }
                this.expand_row = []
                this.isDetail = true
                this.isConfirmDetail = false
                this.detailLoading = true
                that.notify_list[id - 1].detail = ""
                this.expand_row = [id.toString()]
                setTimeout(() => {
                    that.notify_list[id - 1].detail = "波波鸽太强啦！！！".repeat(100)
                    that.detailLoading = false
                }, 1000)
            },
            openConfirmDetail(id) {
                let that = this
                if (this.isConfirmDetail && this.expand_row.includes(id.toString())) {
                    this.expand_row = []
                    this.isConfirmDetail = false
                    return
                }
                console.log(this.expand_row)
                this.expand_row = []
                this.isDetail = false
                this.isConfirmDetail = true
                this.confirmDetailLoading = true
                that.notify_list[id - 1].confirmDetail = ""
                this.expand_row = [id.toString()]
                setTimeout(() => {
                    that.notify_list[id - 1].confirmDetail = "zzg太菜啦！！！".repeat(100)
                    that.confirmDetailLoading = false
                }, 1000)
            },
            confirmNotify(id) {
                let api = this.$store.api
                let that = this
                this.notify_list[id - 1].confirmed = true
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
            },
            delNotify(id) {
                return id
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