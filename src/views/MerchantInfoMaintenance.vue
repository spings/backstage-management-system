<template>
    <div id="merchantInfoMaintenanceView">

        <el-input
                v-model="search"
                @input="getAllStore"
                size="mini"
                placeholder="输入商户名搜索"/>

        <el-table
                :data="storeData"
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
            <!--            <el-table-column label="操作">-->
            <!--                <template slot-scope="scope">-->
            <!--                    <el-button size="mini"-->
            <!--                               type="success" icon="el-icon-check" circle-->
            <!--                               @click="StoreApplyAgree(scope.$index, scope.row)"></el-button>-->
            <!--                    <el-button size="mini"-->
            <!--                               type="danger" icon="el-icon-close" circle-->
            <!--                               @click="StoreApplyrefuse(scope.$index, scope.row)"></el-button>-->
            <!--                </template>-->
            <!--            </el-table-column>-->

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
        name: "merchantInfoMaintenanceView",
        data() {
            return {
                total: 0,
                page: '',
                rows: '',
                storeData: [],
                currentPage4: 1,

            //    查询条件
                search:''
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(val)
            },
            handleCurrentChange(val) {
                console.log(val)
            },
            getAllStore(){
                var _this = this;
                var params = new URLSearchParams();
                params.append("page", _this.page);
                params.append("rows", _this.rows);
                params.append("name", _this.search);

                this.$axios.post("queryAllStore.action",params)
                    .then(function (result) {
                        _this.storeData = result.data.rows;
                        _this.total = result.data.total;
                    })
                    .catch(function (error) {
                        alert(error)
                    })
            }
        },
        created: function () {
            this.getAllStore();
        }
    }
</script>

<style>

</style>