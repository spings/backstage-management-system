<template>
    <!--    虚拟进货-->
    <div>
        <div style="width: 100%;text-align: center">

            <!--        模糊搜索-->
            <el-input
                    style="width: 300px"
                    v-model="cname"
                    @input="getPurchaseData"
                    size="mini"
                    placeholder="请输入名称"/>
            &nbsp;
            <el-select v-model="tid" filterable placeholder="请选择类型" clearable @change="getPurchaseData">
                <el-option
                        v-for="item in options"
                        :key="item.tid"
                        :label="item.tname"
                        :value="item.tid">
                </el-option>
            </el-select>
        </div>

        <el-table
                border
                :data="purchaseData
"
                style="width: 100%">
            <el-table-column
                    width="100px"
                    label="编号"
                    prop="cid">
            </el-table-column>
            <el-table-column
                    label="名称"
                    prop="cname">
            </el-table-column>
            <el-table-column
                    label="价格"
                    prop="purchasePrice">
            </el-table-column>
            <el-table-column
                    label="类型"
                    prop="commodityType.tname">
            </el-table-column>

            <el-table-column
                    align="right">
                <template slot-scope="scope">
                    <el-button
                            v-if="$indexOf(45)"
                            type="primary" icon="el-icon-edit" circle
                            size="small"
                            @click="openAddWarehouse(scope.$index, scope.row,'edit')">
                        进货
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


        <el-dialog
                class="dialog"
                destroy-on-close
                title="商品采购"
                :visible.sync="dialogVisibleAdd"
                :before-close="handleClose">
            <span>

                <purchaseAdd ref="dialogAdd">

                </purchaseAdd>
            </span>
        </el-dialog>


    </div>
</template>

<script>
    import purchaseAdd from "../components/purchase/PurchaseAdd";

    export default {
        name: "Purchase",
        data() {
            return {
                dialogVisibleAdd: false, //添加对话框
                purchaseAddData: {},
                purchaseData: [], //供应商商品
                options: [], //供货商商品类型数据
                cname: '', //模糊查询
                total: 0, //总记录数
                page: '', //页码
                rows: '', //每夜条数
                tid: ''

            }
        },
        methods: {
            //pageSize（每页条数） 改变时触发
            handleSizeChange(val) {
                this.rows = val;
                this.getPurchaseData();
            },
            //改变页码时触发
            handleCurrentChange(val) {
                this.page = val;
                this.getPurchaseData();
            },
            //获取供货商数据
            getPurchaseData() {
                var _this = this;
                var params = new URLSearchParams();
                params.append('page', this.page);
                params.append('cName', this.cname);
                params.append('rows', this.rows);
                params.append('tId', this.tid == "" ? 0 : this.tid);
                this.$axios.get("/queryAllCommodity.action", {
                    params
                }).then(function (result) {
                    _this.purchaseData = result.data.rows;
                    _this.total = result.data.total;
                }).catch(function (error) {
                    alert(error)
                })
            },
            //获取供货商类型数据
            getPurchaseTypeData() {
                var _this = this;
                this.$axios.get("/queryAllCommodityType.action").then(function (result) {
                    _this.options = result.data;
                }).catch(function (error) {
                    alert(error)
                })
            },
            //编辑
            handleEdit(index, row) {
                console.log(index, row);
            },
            //删除
            handleDelete(index, row) {
                console.log(index, row);
            },
            //打开添加对话框
            openAddWarehouse(index, row) {
                this.dialogVisibleAdd = true;
                this.purchaseAddData = row;
                if (this.$refs.dialogAdd != undefined) {
                    this.$refs.dialogAdd.addPurchaseData = row;
                    this.$refs.dialogAdd.number = 100;
                }

            },
            //对话框关闭
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        done();
                    })
                    .catch(() => {
                    });
            }
        },
        components: {
            purchaseAdd
        },
        created() {
            this.getPurchaseTypeData();
            this.getPurchaseData();
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