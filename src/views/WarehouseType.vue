<template>
    <!--仓库类型-->
    <div id="warehouseTypeView">
        <el-button type="success" icon="el-icon-check" circle @click="warehouseEdit(null,null,'add')">添加</el-button>
        <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
            <el-table-column
                    width="100px"
                    label="编号"
                    prop="id">
            </el-table-column>
            <el-table-column
                    label="名称"
                    prop="name">
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot="header" slot-scope="{}">
                    <el-input
                            v-model="search"
                            size="mini"
                            placeholder="输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="warehouseEdit(scope.$index, scope.row,'edit')">
                        <i class="el-icon-edit"></i>
                    </el-button>
                    <el-popconfirm
                            title="你确认要删除吗?"
                            @confirm="handleDelete(scope.$index, scope.row)"
                    >
                        <el-button
                                slot="reference"
                                size="mini"
                                type="danger"
                                >
                            <i class="el-icon-delete"></i>
                        </el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!--        分页-->
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="5"
                       @current-change="pageEdit">
        </el-pagination>

        <!--        编辑-->
        <el-dialog
                title="仓库类型编辑"
                :visible.sync="dialogVisible"
                width="30%"
                center
                destroy-on-close
                :before-close="handleClose">
            <span>
                <warehouseTypeEdit ref="editdialog">

                </warehouseTypeEdit>
            </span>
            <span slot="footer" class="dialog-footer">
  </span>
        </el-dialog>

        <!--        添加-->
        <el-dialog
                title="仓库类型添加"
                :visible.sync="dialogVisibleAdd"
                width="30%"
                center
                destroy-on-close
                :before-close="handleClose">
            <span>
                <warehouseTypeAdd>

                </warehouseTypeAdd>
            </span>
            <span slot="footer" class="dialog-footer">
  </span>
        </el-dialog>
    </div>
</template>

<script>
    import warehouseTypeEdit from "../components/warehouse/WarehouseTypeEdit";
    import warehouseTypeAdd from "../components/warehouse/WarehouseTypeAdd";

    export default {
        name: "classificationView",
        data() {
            return {
                total: '',
                page: '',
                tableData: [],
                search: '',
                dialogVisible: false,
                dialogVisibleAdd: false,
                editData: {}
            }
        },
        methods: {
            //获取数据
            getAllWarehouseType() {
                var _this = this;
                this.$axios.get("queryAllWarehouseType.action?page=" + _this.page)
                    .then(function (result) {
                        _this.tableData = result.data.rows;
                        _this.total = result.data.total;
                    })
                    .catch(function (error) {
                        alert(error)
                    })
            },
            //编辑
            warehouseEdit(index, row, msg) {
                if (msg == 'edit') {
                    this.editData = {...row};
                    this.dialogVisible = true;
                    if (this.$refs.editdialog != undefined) {
                        this.$refs.editdialog.editData = this.editData;
                    }
                } else {
                    this.dialogVisibleAdd = true;
                }


            },
            //删除
            handleDelete(index, row) {
                var _this = this;
                this.$axios.get("delWarehouseTypeById.action", {
                    params: {
                        id: row.id
                    }
                }).then(function (result) {
                    if (result.data == '删除成功') {
                        _this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        _this.getAllWarehouseType();
                    } else {
                        _this.$message.error(result.data);
                    }
                }).catch(function (error) {
                    alert(error)
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
            //分页点击
            pageEdit(page) {
                this.page = page;
                this.getAllWarehouseType();
            }
        },
        components: {
            warehouseTypeEdit,
            warehouseTypeAdd
        },
        created() {
            this.getAllWarehouseType();
        }
    }
</script>

<style>

</style>