<template>
    <div id="ShopInfoView">
        <h1>商品信息</h1>
        <!--名称:
        <el-input
                v-model="uName"
                size="mini"
                placeholder="输入名称" style="width: 200px;" @change="chu"/>-->
        <el-button
                size="mini"
                type="danger"
                @click="handleAdd">添加商品
        </el-button>
        <el-input v-model="aavalue" @change="getAllCommodity" size="mini" style="width: 200px"
                  placeholder="输入名称搜索"></el-input>
        <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                  style="width: 100%">
            <el-table-column width="100px" label="编号" prop="cid">

            </el-table-column>
            <el-table-column width="220px" label="名称" prop="cname">

            </el-table-column>
            <el-table-column width="100px" label="类型" prop="commodityType.tname">

            </el-table-column>
            <el-table-column width="100px" label="价格" prop="price">

            </el-table-column>
            <el-table-column width="100px" label="图片" prop="picture">
                <template slot-scope="scope">
                    <el-image
                            class="empImg"
                            :src="$host+scope.row.picture"
                            :preview-src-list="[$host+scope.row.picture]">
                    </el-image>
                </template>

            </el-table-column>
            <el-table-column width="300px" label="介绍" prop="introduce">

            </el-table-column>
            <el-table-column width="100px" label="库存"
                             prop="warehouseGoods.stock">
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handletian(scope.$index, scope.row,'tian')">添加图片
                    </el-button>
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row,'edit')">修改
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index,scope.row)">删除
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
        <!--添加-->
        <el-dialog

                :visible.sync="dialogVisible"
                title="商品添加"
                width="60%"

                :before-close="handleClose"
                center>
                <span>
                    <shoplnfoAdd ref="shoplnfoAdd" v-if="isReloadData2">

                    </shoplnfoAdd>
                </span>
            <span slot="footer" class="dialog-footer">
            </span>
        </el-dialog>
        <!--//添加图片-->
        <el-dialog
                :visible.sync="dialogVisibleB"
                title="商品添加图片"
                width="60%"

                :before-close="handleClose"
                center>
                <span>
                  <shoplnfoAddPicture v-if="isReloadData3"></shoplnfoAddPicture>
                </span>
            <span slot="footer" class="dialog-footer">
            </span>
        </el-dialog>
        <!--修改-->
        <el-dialog
                :visible.sync="dialogVisibleA"
                title="商品修改"
                width="60%"

                :before-close="handleClose"
                center>
                <span>
                  <shoplnfoEdit v-if="isReloadData"></shoplnfoEdit>
                </span>
            <span slot="footer" class="dialog-footer">
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import ShoplnfoAdd from "../components/shop/ShoplnfoAdd";
    import shoplnfoEdit from "../components/shop/ShoplnfoEdit";
    import shoplnfoAddPicture from "../components/shop/ShoplnfoAddPicture";
    export default {
        name: "ShopInfoView",
        data() {
            return {
                tableData: [],
                isReloadData2: false,
                isReloadData: false,
                isReloadData3: false,
                imageUrl1: '',
                imageUrl2: '',
                imageUrl3: '',
                shujuaaa:[],
                search: '',
                rows: '', //每夜条数
                total: 0,
                page: '1',
                dialogImageUrl: '',
                dialogVisibleB:false,
                dialogVisibleA: false,
                dialogVisible: false,
                shoplnfoEditData: {},
                shoplnfotianData:{},
                aavalue: '',
                imgname: '',
                aa: '',
                value: ''
            }
        },
        methods: {
            //图片放大
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            //查询所有主类型
            getAllzhu() {
                var _this = this
                this.$axios.post("queryAllzhu.action").then(function (result) {
                    _this.shoplnfoTypeDatazhu = result.data;
                    _this.shoplnfoEditData.valuezhu = _this.shoplnfoEditData.commodityType.tid;
                    _this.getAllci2()
                    _this.getAllzho2()
                })
            },
            //逻辑删除
            handleDelete(index, row) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        var _this = this;
                        _this.$axios.post("delCommodityById.action?cid=" + row.cid).then(function (result) {
                            if (result.data.code != 0) {
                                _this.$message({
                                    showClose: true,
                                    message: '删除成功',
                                    type: 'success'
                                });
                                _this.getAllCommodity()
                            } else {
                                _this.$message({
                                    showClose: true,
                                    message: '删除失败',
                                    type: 'error'
                                });
                            }
                        })
                    })
                    .catch(() => {
                    });
            },
            //pageSize（每页条数） 改变时触发
            handleSizeChange(val) {
                this.rows = val;
                this.getAllCommodity();
            },
            //改变页码时触发
            handleCurrentChange(val) {
                this.page = val;
                this.getAllCommodity();
            },
            //查询展示所有
            getAllCommodity() {
                var _this = this
                var params = new URLSearchParams();
                params.append("name", this.search);
                params.append("page", this.page);
                params.append("rows", this.rows);
                params.append("cName", this.aavalue);
                this.$axios.post("queryAllCommodity.action", params).then(function (result) {
                    _this.tableData = result.data.rows;
                    _this.total = result.data.total;
                }).catch(function (error) {
                    alert(error);
                })
            },
            pageEdit(page) {
                this.page = page;
                this.getAllCommodity();
            },
            //添加图片
            handletian(index, row, ce) {
                if (ce == 'tian') {
                    this.isReloadData3 = false;
                    this.$nextTick(() => {
                        this.isReloadData3 = true;
                    });
                    this.dialogVisibleB = true;
                    this.shoplnfotianData = {...row};
                    /*this.shoplnfoEditData = row;*/
                    console.log(this.shoplnfotianData)
                }
            },
            //修改
            handleEdit(index, row, ce) {
                if (ce == 'edit') {
                    this.isReloadData = false;
                    this.$nextTick(() => {
                        this.isReloadData = true;
                    });
                    this.dialogVisibleA = true;
                    this.shoplnfoEditData = {...row};
                    console.log(this.shoplnfoEditData)
                }
            },
            //打开添加页面
            handleAdd() {
                this.isReloadData2 = false;
                this.$nextTick(() => {
                    this.isReloadData2 = true;
                });
                this.dialogVisible = true;
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
        //钩子函数
        created() {
            this.getAllCommodity();
        },
        components: {
            "shoplnfoAdd": ShoplnfoAdd,
            shoplnfoEdit,
            shoplnfoAddPicture
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

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>