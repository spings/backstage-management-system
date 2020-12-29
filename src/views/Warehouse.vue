<template>
    <!--    仓库信息-->
    <div id="warehouseView">
        <el-button type="success" icon="el-icon-check" circle @click="warehouseEdits(null,null,'add')">添加</el-button>
        <el-table
                border
                :data="tableData"
                style="width: 100%;">
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
                    label="容量"
                    prop="capacity">
            </el-table-column>
            <el-table-column
                    label="类型"
                    prop="warehouseType.name">
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot="header" slot-scope="[]">
                    <el-input size="mini" v-model="search" placeholder="请输入仓库名称"/>
                </template>
                <template slot-scope="scope">
                    <el-button
                            type="primary" icon="el-icon-edit" circle
                            size="small"
                            @click="warehouseEdits(scope.$index, scope.row,'edit')">
                    </el-button>
                    <el-button
                            type="danger" icon="el-icon-delete" circle
                            size="small"
                            @click="handleDelete(scope.$index, scope.row)">
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--        分页-->
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="5"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>

        <!--        编辑-->
        <el-dialog
                class="dialog"
                title="仓库编辑"
                :visible.sync="dialogVisible"
                destroy-on-close
                :before-close="handleClose">
            <span>

                <warehouseEdit ref="warehouseEdit">

                </warehouseEdit>

            </span>
            <span slot="footer" class="dialog-footer">
            </span>
        </el-dialog>

        <!--        编辑-->
        <el-dialog
                class="dialog"
                title="仓库添加"
                :visible.sync="dialogVisibleAdd"
                destroy-on-close
                :before-close="handleClose">
            <span>

                <warehouseAdd>

                </warehouseAdd>

            </span>
            <span slot="footer" class="dialog-footer">
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import WarehouseEdit from "../components/warehouse/WarehouseEdit";
    import WarehouseAdd from "../components/warehouse/WarehouseAdd";

    export default {
        name: "inventoryView",
        data() {
            return {
                tableData: [
                ],
                search: '',
                rows: '', //每夜条数
                total: 0,
                page: '1',
                dialogVisible: false,
                dialogVisibleAdd: false,
                warehouseEditData: {},
                value: "1"
            }

        },
        methods: {
            //pageSize（每页条数） 改变时触发
            handleSizeChange(val) {
                this.rows = val;
                this.getAllWarehouse();
            },
            //改变页码时触发
            handleCurrentChange(val) {
                this.page = val;
                this.getAllWarehouse();
            },
            //获取数据
            getAllWarehouse() {
                var _this = this;
                var params=new URLSearchParams();
                params.append("name",this.search);
                params.append("page",this.page);
                params.append("rows",this.rows);
                this.$axios.get("queryAllWarehouse.action",{
                    params
                }).then(function (result) {
                    _this.total = result.data.total;
                    _this.tableData = result.data.rows;
                }).catch(function (error) {
                    alert(error)
                })
            },
            //修改
            warehouseEdits(index, row, msg) {
                if (msg == 'edit') {
                    this.dialogVisible = true;
                    this.warehouseEditData = {...row};
                    this.value = row.warehouseType.name;
                    if (this.$refs.warehouseEdit != undefined) {
                        this.$refs.warehouseEdit.warehouseEditData = {...row};
                        this.$refs.warehouseEdit.value = row.warehouseType.name;
                    }
                }else {
                    this.dialogVisibleAdd = true;
                }


            },
            //删除
            handleDelete(index, row) {
                console.log(index, row);
            },
            pageEdit(page) {
                this.page = page;
                this.getAllWarehouse();
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
        },
        watch:{
          "search":function () {
            this.getAllWarehouse();
          }
        },
        components: {
            "warehouseEdit": WarehouseEdit,
            "warehouseAdd": WarehouseAdd
        },
        created() {
            this.getAllWarehouse();
        }
    }
</script>

<style>
    .dialog .el-dialog {
        background-image: url(http://localhost:8080/shop/img/30.png);
        background-size: 120%;
        padding: 10px;
        height: 500px;
    }
    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }
</style>