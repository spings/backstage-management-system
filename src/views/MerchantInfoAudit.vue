<template>
    <div id="merchantInfoAuditView">
        <el-table
                :data="storeApplyData"
                style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="店铺名">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="经营人">
                            <span>{{ props.row.uid }}</span>
                        </el-form-item>
                        <el-form-item label="店铺 电话">
                            <span>{{ props.row.phone }}</span>
                        </el-form-item>
                        <el-form-item label="地  址">
                            <span>{{ props.row.address }}</span>
                        </el-form-item>
                        <el-form-item label="照片">
                            <el-image
                                    style="width: 100px; height: 100px"
                                    :src="$host+props.row.photo"
                                    :preview-src-list="[$host+props.row.photo]"
                                    fit="cover"></el-image>
                            <!--                            <img src="../assets/image/1.jpg">-->
                        </el-form-item>
                        <el-form-item label="备注">
                            <span>{{ props.row.msg }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>

            <el-table-column
                    label="店铺名"
                    prop="name"
                    width="200px">
            </el-table-column>
            <el-table-column
                    label="经营人"
                    prop="uid"
                    width="200px">
            </el-table-column>

            <el-table-column
                    label="地  址"
                    prop="address"
                    width="650px">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini"
                               type="success" icon="el-icon-check" circle
                               @click="StoreApplyAgree(scope.$index, scope.row)"></el-button>
                    <el-button size="mini"
                               type="danger" icon="el-icon-close" circle
                               @click="StoreApplyrefuse(scope.$index, scope.row)"></el-button>
                </template>
            </el-table-column>

        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[5, 10, 20, 50]"
                :page-size="5"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: 'MerchantInfoAudit',
        data() {
            return {
                total:0,
                page:'',
                rows: '',
                storeApplyData: [],
                currentPage4: 1
            }
        },
        methods: {
            handleSizeChange(val) {
                this.rows = val;
                this.queryStoreApplyData();
            },
            handleCurrentChange(val) {
                this.page = val;
                this.queryStoreApplyData();
            },


            queryStoreApplyData() {
                var _this = this;
                var params = new URLSearchParams();
                params.append("page", _this.page);
                params.append("rows", _this.rows);

                this.$axios.post("queryStoreApplyData.action",params)
                    .then(function (result) {
                        _this.storeApplyData = result.data.rows;

                        //应该在监听 pagevo数据变化时，进行总页数计算
                        //pagevo json对象  deep:true  深度监听
                        // var total = _this.storeApplyData.total;//总记录
                        //总页数
                        // _this.total = total%5==0?total/5:Math.floor(total/5)

                        //总记录条数
                        _this.total = result.data.total;
                    })
                    .catch(function (error) {
                        alert(error)
                    })
            },

        //    审批扩展，输入管理员密码，正确可通过或拒绝其请求


        //    通过
            StoreApplyAgree(index,row){
                // alert(index,row.storeId)

                var _this = this;
                var params = new URLSearchParams();
                params.append("storeid", row.storeId);
                params.append("results", 1);

                this.$axios.post("applyAudit.action",params)
                    .then(function (result) {
                        console.log(result)
                        _this.queryStoreApplyData();
                        alert("已通过其请求")
                    })
                    .catch(function (error) {
                        alert(error)
                    })
            },
        //    不通过
            StoreApplyrefuse(index,row){
                // alert(index,row.storeId)
                var _this = this;
                var params = new URLSearchParams();
                params.append("storeid", row.storeId);
                params.append("results", 3);

                this.$axios.post("applyAudit.action",params)
                    .then(function (result) {
                        console.log(result)
                        _this.queryStoreApplyData();
                        alert("已拒绝其请求")
                    })
                    .catch(function (error) {
                        alert(error)
                    })
            }
        },
        created: function () {
            this.queryStoreApplyData();

            this.$axios.post("userOrder.action")
                .then(function () {

                })
                .catch(function (error) {
                    alert(error)
                })
        }
    }
</script>

<style>
    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>