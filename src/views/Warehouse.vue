<template>
    <!--    仓库信息-->
    <div id="warehouseView">
        <el-button type="success" icon="el-icon-check" circle @click="warehouseEdits(null,null,'add')">添加</el-button>
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
                    label="容量"
                    prop="capacity">
            </el-table-column>
            <el-table-column
                    label="类型"
                    prop="warehouseType.name">
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
        <!-- 分页 -->
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="5"
                       @current-change="pageEdit">
        </el-pagination>


        <!--        编辑-->
        <el-dialog
                title="仓库编辑"
                :visible.sync="dialogVisible"
                width="30%"
                center
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
                title="仓库添加"
                :visible.sync="dialogVisibleAdd"
                width="30%"
                center
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
                total: '',
                page: '1',
                dialogVisible: false,
                dialogVisibleAdd: false,
                warehouseEditData: {},
                value: ''
            }

        },
        methods: {
            //获取数据
            getAllWarehouse() {
                var _this = this;
                this.$axios.get("queryAllWarehouse.action?page=" + _this.page).then(function (result) {
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

</style>