<template>
    <!--    仓库商品-->
    <div>
        <el-table
                row-key="id"
                border
                :data="warehouseGoodsData.filter(data => !search || data.cname.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
            <el-table-column
                    width="100px"
                    label="编号"
                    prop="id">
            </el-table-column>
            <el-table-column
                    label="名称"
                    prop="commodity.cname">
            </el-table-column>
            <el-table-column
                    label="存量"
                    prop="stock">
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
                        进货
                    </el-button>
                </template>
            </el-table-column>
        </el-table>


    </div>



</template>

<script>
    export default {
        name: "warehouseGoods",
        data() {
            return {
                warehouseGoodsData:[],
                arr:[
                    {
                        id:'',
                        cname:''
                    }
                ]
            }
        },
        methods: {
            //获取仓库商品信息
            getWarehouseGoodsData(){
                var _this=this;
                this.$axios.get("queryWarehouseGoodsByGroup.action").then(function (result) {
                    _this.warehouseGoodsData=result.data.rows;
                }).catch(function (error) {
                    alert(error)
                })

            },
            load(tree, treeNode, resolve) {

                 var _this=this;
                    this.$axios.get("queryAllWarehouseGoods.action?id="+tree.id).then(function (result) {
                        _this.arr=result.data;

                    }).catch(function (error) {
                        alert(error)
                    })
                    resolve(_this.arr)


            }
        },
        created() {
            this.getWarehouseGoodsData();
        }
    }
</script>

<style scoped>

</style>