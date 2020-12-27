<template>
    <div id="AllocatingManagementView">

        <el-button type="primary" size="medium" icon="el-icon-box" style="width: 150px" @click="fahuo()">发货</el-button>
        <el-table
                ref="multipleTable"
                :data="storeOrderInfo"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                @row-dblclick="dblclick">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>

            <el-table-column
                    label="商铺名"
                    width="220">
                <template slot-scope="scope">
                    <i class="el-icon-house"></i>
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="地址"
                    width="220">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>地址: {{ scope.row.address }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.phone}}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">发货
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-size="15"
                layout="prev, pager, next, jumper"
                :total="total">
        </el-pagination>


        <el-dialog title="店铺订单" :visible.sync="dialogTableVisible" width="70%">
            <el-table
                    :data="tableData"
                    style="width: 100%">

                <el-table-column
                        label="订单编号"
                        prop="orderid">
                </el-table-column>
                <el-table-column
                        label="购买用户 "
                        prop="userInfo.uname">
                </el-table-column>
                <el-table-column
                        label="用户号码"
                        prop="userInfo.phone">
                </el-table-column>
                <el-table-column
                        label="下单日期"
                        prop="orderTime">
                </el-table-column>
<!--                <el-table-column-->
<!--                        label="购买商品"-->
<!--                        width="180px">-->
<!--                    <template slot-scope="scope">-->
<!--                        <el-popover trigger="hover" placement="top">-->
<!--                            <div v-for="o in scope.row.orderGoods">-->
<!--                                名称：{{o.commodity.cname}}-->
<!--                                <br>-->
<!--                                价格：{{o.commodity.price}}-->
<!--                                <br>-->
<!--                                数量：{{o.number}}-->
<!--                                <hr>-->
<!--                            </div>-->
<!--                            <div slot="reference" class="name-wrapper">-->
<!--                                <el-tag>查看商品</el-tag>-->
<!--                            </div>-->
<!--                        </el-popover>-->
<!--                    </template>-->
<!--                </el-table-column>-->
            </el-table>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "AllocatingManagement",
        data() {
            return {
                dialogTableVisible: false,

                total: 0,
                page: '',
                rows: '',

                multipleSelection: [],

                storeOrderInfo: [],
                tableData:[]
            }
        },
        methods: {

            handleSizeChange(val) {

                this.rows = val;
                this.getstoreOrderInfo();
            },
            handleCurrentChange(val) {

                this.page = val;
                this.getstoreOrderInfo();
            },


            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            getstoreOrderInfo() {
                var _this = this;

                this.$axios.get("HStoreOrder.action")
                    .then(function (result) {
                        _this.storeOrderInfo = result.data.rows;
                        _this.total = result.data.total;
                    })
                    .catch(function (error) {
                        alert(error)
                    })
            },
            dblclick(row){
                var _this = this
                var params = new URLSearchParams();
                params.append("storeid", row.storeId);
                this.$axios.get("HNoStateOrderPage.action", {params})
                    .then(function (result) {
                    _this.tableData = result.data.rows;
                }).catch(function (error) {
                    alert(error)
                })
                _this.dialogTableVisible= true
            },
            fahuo(){
                var _this = this
                var ids = [];
                for(var i = 0; i < _this.multipleSelection.length;i++){
                    // alert(_this.multipleSelection[i].storeId)
                    ids.push(_this.multipleSelection[i].storeId);
                }
                var params = new URLSearchParams();
                params.append("storeids", ids);
                this.$axios.post("fahuoGiveStore.action", params)
                    .then(function (result) {
                        alert(result)
                        alert("发货成功")
                    }).catch(function (error) {
                    alert(error)
                })
            }
        },

        created: function () {
            this.getstoreOrderInfo();
        }
    }
</script>

<style>

</style>