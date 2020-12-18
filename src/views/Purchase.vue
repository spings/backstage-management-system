<template>
    <!--    虚拟进货-->
    <div>
        <!--        模糊搜索-->
        <el-input
                style="width: 300px"
                v-model="cname"
                @input="getPurchaseData"
                size="mini"
                placeholder="请输入名称"/>
        <el-select v-model="tid" filterable placeholder="请选择类型" clearable @change="getPurchaseData">
            <el-option
                    v-for="item in options"
                    :key="item.tid"
                    :label="item.tname"
                    :value="item.tid">
            </el-option>
        </el-select>


        <el-table
                :data="purchaseData.filter(
                    data => !search || data.cname.toLowerCase().includes(search.toLowerCase())
                    )
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
                <!--<template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">Edit
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">Delete
                    </el-button>
                </template>-->
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
        name: "Purchase",
        data() {
            return {
                purchaseData: [], //供应商商品
                options: [], //供货商商品类型数据
                cname: '', //模糊查询
                total: '', //总记录数
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
        },
        created() {
            this.getPurchaseTypeData();
            this.getPurchaseData();
        }
    }
</script>

<style scoped>

</style>