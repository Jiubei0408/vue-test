<template>
    <div>
        <div class="tableTitle">
            <b>
                通知列表 <span v-if="notify_list.length > 0">共 {{notify_list.length}} 条</span></b>
        </div>
        <el-card shadow="hover">
            <el-table id="table" ref="table" :expand-row-keys="expand_row" row-key="id" v-loading="loading"
                      :data="notify_list"
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
                            <el-button @click="openDetail(scope.row)">
                                通知详情
                            </el-button>
                            <el-button
                                    v-if="$store.state.user.permission === 1"
                                    @click="openConfirmDetail(scope.row)">
                                完成情况
                            </el-button>
                            <el-button
                                    v-if="!scope.row.confirmed"
                                    @click="confirmNotify(scope.row)">
                                确认
                            </el-button>
                            <el-button v-else disabled>已确认</el-button>
                            <el-button
                                    v-if="$store.state.user.permission === 1"
                                    @click="delNotify(scope.row)">
                                删除
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        type="expand"
                        width="1">
                    <template slot-scope="props">
                        <el-form
                                v-if="isDetail"
                                v-loading="isDetailLoading">
                            <el-form-item label="通知详情">
                                <span style="word-wrap: break-word">{{props.row.detail}}</span>
                            </el-form-item>
                        </el-form>
                        <el-form
                                v-if="isConfirmDetail"
                                v-loading="isConfirmDetailLoading">
                            <el-form-item label="完成详情">
                                <br>
                                <div v-if="props.row.checked.length > 0">
                                    <p>已完成:</p>
                                    <el-link
                                            style="margin-right: 5px"
                                            :underline="false"
                                            v-for="i in props.row.checked"
                                            :key="i.username">
                                        {{i.nickname}}
                                    </el-link>
                                    <el-divider v-if="props.row.unchecked.length > 0"/>
                                </div>
                                <div v-if="props.row.unchecked.length > 0">
                                    <p>未完成:</p>
                                    <el-link
                                            style="margin-right: 5px;"
                                            :underline="false"
                                            v-for="i in props.row.unchecked"
                                            :key="i.username">
                                        {{i.nickname}}
                                    </el-link>
                                </div>
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
                isDetailLoading: false,
                isConfirmDetail: false,
                isConfirmDetailLoading: false,
                expand_row: []
            }
        },
        methods: {
            refreshData() {
                this.loading = true
                let data = []
                let api = this.$store.state.api
                this.$http.get(api + '/notification/summary')
                    .then(response => {
                        data = response.data.data
                        data.forEach(item => {
                            item.checked = []
                            item.unchecked = []
                        })
                        this.notify_list = data
                        this.loading = false
                    })
            },
            openDetail(row) {
                let that = this
                let api = this.$store.state.api
                let id = this.notify_list.indexOf(row)
                let item = this.notify_list[id]
                if (this.isDetail && this.expand_row.includes(row.id.toString())) {
                    this.isDetail = false
                    this.expand_row = []
                } else {
                    this.isConfirmDetail = false
                    this.isDetail = true;
                    this.isDetailLoading = true
                    item.detail = ""
                    this.expand_row = [row.id.toString()]
                    this.$http.get(api + '/notification/detail/' + row.id)
                        .then(response => {
                            item.detail = response.data.data
                            that.isDetailLoading = false
                        })
                        .catch(error => {
                            that.$message.error(error.response.data.msg)
                        })
                }
            },
            openConfirmDetail(row) {
                let that = this
                let api = this.$store.state.api
                let id = this.notify_list.indexOf(row)
                let item = this.notify_list[id]
                if (this.isConfirmDetail && this.expand_row.includes(row.id.toString())) {
                    this.isConfirmDetail = false
                    this.expand_row = []
                } else {
                    this.isDetail = false
                    this.isConfirmDetail = true;
                    this.isConfirmDetailLoading = true
                    this.expand_row = [row.id.toString()]
                    this.$http.get(api + '/notification/confirm_detail/' + row.id)
                        .then(response => {
                            let data = response.data.res
                            item.checked = data.checked
                            item.unchecked = data.unchecked
                            that.isConfirmDetailLoading = false
                        })
                        .catch(error => {
                            that.$message.error(error.response.data.msg)
                        })
                }
            },
            confirmNotify(row) {
                let api = this.$store.state.api
                let that = this
                let id = this.notify_list.indexOf(row)
                let item = that.notify_list[id]
                this.$http.post(api + '/notification/confirm/' + row.id)
                    .then(() => {
                        item.confirmed = true
                        item.count++
                        let username = that.$store.state.user.username
                        let nickname = that.$store.state.user.nickname
                        if (that.isConfirmDetail) {
                            item.checked.push({
                                username: username,
                                nickname: nickname
                            })
                            for (let i = 0; i < item.unchecked.length; i++) {
                                if (item.unchecked[i].username === username) {
                                    item.unchecked.splice(i, 1)
                                    break
                                }
                            }
                        }
                    })
                    .catch(error => {
                        that.$message.error(error.response.data.msg)
                    })
            },
            delNotify(row) {
                return row
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

    #table .el-divider--horizontal {
        margin: 2px;
    }

    .el-form-item__label {
        color: #99a9bf;
    }
</style>