<template>
    <div id="userView">
        <h1>用户管理</h1>
        名称:<el-input
                v-model="uName"
                size="mini"
                placeholder="输入名称" style="width: 200px;" @change="chu"/>
        手机号码:<el-input
                v-model="phone"
                size="mini"
                placeholder="输入手机号码" style="width: 200px;" @change="chu"/>
        <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                  style="width: 100%">
            <el-table-column width="100px" label="编号" prop="uid">

            </el-table-column>
            <el-table-column width="100px" label="名称" prop="uname">

            </el-table-column>
            <el-table-column width="200px" label="号码" prop="phone">

            </el-table-column>
            <el-table-column width="285px" label="密码" prop="password">

            </el-table-column>
            <el-table-column width="100px" label="图片" prop="photo">
                <template slot-scope="scope">
                    <el-image
                            class="empImg"
                            :src="$host+scope.row.photo"
                            :preview-src-list="[$host+scope.row.photo]">
                    </el-image>
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
    </div>
</template>

<script>
    export default {
        name: "userView",
        data() {
            return {
                tableData: [],
                search: '',
                phone:' ',
                uName:' ',
                rows: '', //每夜条数
                total: 0,
                page: '1',
            }
        },
        methods: {
            //pageSize（每页条数） 改变时触发
            handleSizeChange(val) {
                this.rows = val;
                this.getAllUser();
            },
            //改变页码时触发
            handleCurrentChange(val) {
                this.page = val;
                this.getAllUser();
            },
            getAllUser() {
                var _this = this;
                var params=new URLSearchParams();
                params.append("name",this.search);
                params.append("page",this.page);
                params.append("rows",this.rows);
                this.$axios.post("queryAllUser.action",params).then(function (result) {
                    _this.tableData = result.data.rows;
                    _this.total = result.data.total;
                }).catch(function (error) {
                    alert(error);
                })
            },
            chu() {
                var _this = this;
                var params=new URLSearchParams();
                params.append("uName",this.uName);
                params.append("phone",this.phone);
                this.$axios.post("queryAllUser.action",params).then(function (result) {
                    _this.tableData = result.data.rows;
                }).catch(function (error) {
                    alert(error);
                })
            },
            pageEdit(page) {
                this.page = page;
                this.getAllUser();
            }
        },
        created() {
            this.getAllUser();
        }
    }
</script>

<style>

</style>