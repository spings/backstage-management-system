<template>
    <div id="classifiedInfoView">
        <h1>分类信息</h1>
        <div style="width: 390px;float: left">
            <el-button v-if="this.tableDatazhu!=null"
                       size="mini"
                       type="danger"
                       @click="handleAdd('zhu')">添加
            </el-button>
            <el-table
                    :data="tableDatazhu.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%">
                <el-table-column width="50px" label="编号" prop="tid">

                </el-table-column>
                <el-table-column width="100px" label="名称" prop="tname">

                </el-table-column>
                <el-table-column
                        align="right">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index,scope.row,'zhu')">删除
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleAll(scope.$index,scope.row,'zhu')">查看子
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="width: 390px;float: left;margin-left: 100px">
            <el-button v-if="this.tableDatazho!=null"
                       size="mini"
                       type="danger"
                       @click="handleAdd('zho')">添加
            </el-button>
            <el-table
                    :data="tableDatazho.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%">
                <el-table-column width="50px" label="编号" prop="tid">

                </el-table-column>
                <el-table-column width="100px" label="名称" prop="tname">

                </el-table-column>
                <el-table-column
                        align="right">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index,scope.row,'zho')">删除
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleAll(scope.$index,scope.row)">查看子
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="width: 390px;float: left;margin-left: 100px">
            <el-button v-if="this.tableDataci!=null"
                       size="mini"
                       type="danger"
                       @click="handleAdd('ci')">添加
            </el-button>
            <el-table
                    :data="tableDataci.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%">
                <el-table-column width="50px" label="编号" prop="tid">

                </el-table-column>
                <el-table-column width="100px" label="名称" prop="tname">

                </el-table-column>
                <el-table-column
                        align="right">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index,scope.row,'ci')">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--添加-->
        <el-dialog
                class="dialog"
                :visible.sync="dialogVisible"
                title="类型添加"
                width="40%"

                :before-close="handleClose"
                center>
                <span>
                  <classifiedlnfoAdd v-if="isReloadData"></classifiedlnfoAdd>
                </span>
            <span slot="footer" class="dialog-footer">
            </span>
        </el-dialog>
        <!--修改-->
        <el-dialog
                class="dialog"
                :visible.sync="dialogVisibleA"
                title="类型修改"
                width="40%"

                :before-close="handleClose"
                center>
                <span>
                  <classifiedlnfoEdit v-if="isReloadData1"></classifiedlnfoEdit>
                </span>
            <span slot="footer" class="dialog-footer">
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import classifiedlnfoAdd from "../components/fied/ClassifiedlnfoAdd";
    import classifiedlnfoEdit from "../components/fied/ClassifiedlnfoEdit";

    export default {
        name: "classifiedInfoView",
        data() {
            return {
                tableDatazhu: [],
                tableDatazho: [],
                tableDataci: [],
                search: '',
                isReloadData1: false,
                isReloadData: false,
                dialogVisibleA: false,
                dialogVisible: false,
                value: '',
                zho: '',
                ci: '',
                datatype: '',
            }
        },
        methods: {
            getAllZhu() {
                var _this = this
                this.$axios.post("queryAllzhu.action").then(function (result) {
                    _this.tableDatazhu = result.data;
                    _this.ci = '';
                })
            },
            //关闭
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        done();
                    })
                    .catch(() => {
                    });
            },

            handleAll(input, row, ce) {
                var _this = this
                if (ce == 'zhu') {
                    this.datatype = row.tid
                    this.$axios.post("queryAllzho.action?ter=" + row.tid).then(function (result) {
                        _this.tableDatazho = result.data;
                        _this.tableDataci = [];
                        _this.zho = 'zho';
                    })
                } else {
                    this.datatype = row.tid
                    this.$axios.post("queryAllci.action?tsan=" + row.tid).then(function (result) {
                        _this.tableDataci = result.data;
                        _this.ci = 'ci';
                    })
                }
            },
            //添加类型
            handleAdd(ec) {
                this.isReloadData = false;
                this.$nextTick(() => {
                    this.isReloadData = true;
                });
                if (ec == "zhu") {
                    this.value = "zhu";
                    this.dialogVisible = true;
                } else if (ec == "zho") {
                    if (this.zho != '') {
                        this.value = "zho";
                        this.dialogVisible = true;
                    } else {
                        this.$message({
                            showClose: true,
                            message: '请展示出类型',
                            type: 'error'
                        });
                    }
                } else {
                    if (this.ci != '') {
                        this.value = "ci";
                        this.dialogVisible = true;
                    } else {
                        this.$message({
                            showClose: true,
                            message: '请展示出类型',
                            type: 'error'
                        });
                    }
                }
            },
            handleDelete(input, row, ce) {
                var _this=this
                if (ce == "zhu") {
                    this.$confirm('确认关闭？')
                        .then(() => {
                            this.$axios.post("deleteAll.action?tId="+row.tid).then(function () {
                                _this.$message({
                                    showClose: true,
                                    message: '删除成功',
                                    type: 'success'
                                });
                                _this.tableDatazho=[]
                                _this.tableDataci=[]
                                _this.getAllZhu()
                            })
                        })
                        .catch(() => {
                        });
                } else if (ce == "zho") {
                    this.$confirm('确认删除？')
                        .then(() => {
                            this.$axios.post("deleteAll.action?tId="+row.tid).then(function () {
                                _this.$message({
                                    showClose: true,
                                    message: '删除成功',
                                    type: 'success'
                                });
                                _this.tableDataci=[]
                                _this.getAllZhu()
                            })
                        })
                        .catch(() => {
                        });
                } else {
                    this.$confirm('确认删除？')
                        .then(() => {
                            this.$axios.post("deleteAll.action?tId="+row.tid).then(function () {
                                _this.$message({
                                    showClose: true,
                                    message: '删除成功',
                                    type: 'success'
                                });
                                _this.getAllZhu()
                            })
                        })
                        .catch(() => {
                        });
                }
            },
        },
        created() {
            this.getAllZhu();
        },
        components: {
            "classifiedlnfoAdd": classifiedlnfoAdd,
            classifiedlnfoEdit
        }
    }
</script>

<style>
    /* 三种方法选择自己喜欢的一个即可 */
    .dialog .el-dialog {
        background-image: url(http://localhost:8080/shop/img/30.png);
        background-size: 120%;
        padding: 10px;
        height: 400px;
    }
</style>