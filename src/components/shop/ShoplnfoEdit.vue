<template>
    <div>
        <el-form :model="shoplnfoEditData" :rules="rules" label-width="80px" ref="shoplnfoEditData"
                 class="demo-ruleForm">
            <el-form-item label="名称" prop="cname">
                <el-input placeholder="请选择" v-model="shoplnfoEditData.cname" style="width: 500px;"
                          autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="price">
                <el-input placeholder="请选择" v-model="shoplnfoEditData.price" style="width: 500px;"></el-input>
            </el-form-item>
            <el-form-item placeholder="请选择" label="类型主" prop="valuezhu">

                <template>
                    <el-select
                            v-model="shoplnfoEditData.valuezhu"
                            @change="getAllzho"
                            filterable placeholder="请选择"
                            style="width: 200px;">
                        <el-option
                                v-for="item in shoplnfoTypeDatazhu"
                                :key="item.tid"
                                :label="item.tname"
                                :value="item.tid">
                        </el-option>
                    </el-select>
                </template>
                中
                <template>
                    <el-select v-model="shoplnfoEditData.valuezho" filterable placeholder="请选择" style="width: 200px;"
                               @change="getAllci">
                        <el-option
                                v-for="item in shoplnfoTypeDatazho"
                                :key="item.ter"
                                :label="item.tname"
                                :value="item.tid">
                        </el-option>
                    </el-select>
                </template>
                次
                <template>
                    <el-select v-model="valueci" filterable placeholder="请选择" style="width: 200px;"
                    @change="chang">
                        <el-option
                                v-for="item in shoplnfoTypeDataci"
                                :key="item.tsan"
                                :label="item.tname"
                                :value="item.tid">
                        </el-option>
                    </el-select>
                </template>
            </el-form-item>
            <el-form-item label="主图片">
                <el-upload
                        class="avatar-uploader"
                        :action="this.$upload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="介绍" prop="introduce">
                <el-input placeholder="请选择" v-model="shoplnfoEditData.introduce" style="width: 500px;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary " @click="warehouseAdd2('shoplnfoEditData')">主要按钮</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>
    export default {
        name: "ShoplnfoEdit",
        data(){
            return{
                shoplnfoTypeDatazhu:[],
                shoplnfoTypeDatazho:[],
                disabled: false,
                dialogImageUrl: '',
                dialogVisible:false,
                shoplnfoTypeDataci:[],
                tid:'',
                valuec:'',
                valuetype:'',
                shoplnfoEditData: {
                    valuezho:'',
                    valuecia:'',
                    valuezhu:'',
                },
                valueci:'',
                rules: {
                    cname: [{
                        required: true, //是否必填
                        message: '名称不能为空', //规则提示
                        trigger: 'blur' //何事件触发
                    },
                        //可以设置多重验证标准
                        /* {
                             min: 2,
                             max: 5,
                             message: '长度在 2 到 5 个字符'
                         },*/
                        /* {;
                             pattern: /^[\u4E00-\u9FA5]+$/, //正则
                             message: '用户名只能为中文'
                         }*/],
                    price: [
                        /*{
                            type: 'number',
                            message: '必须为数字值',
                            trigger: 'c'
                        },*/
                        {
                            required: true,
                            message: '价格必填',
                            trigger: 'blur'
                        },
                    ],
                    introduce: [{
                        required: true,
                        message: '几个必填',
                        trigger: 'blur'
                    },]
                },imageUrl:""
            }
        },
        methods:{
            chang(){
                this.$forceUpdate()
            },
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
                    _this.shoplnfoEditData.valuezhu=_this.shoplnfoEditData.commodityType.tid;
                    _this.getAllci2()
                    _this.getAllzho2()
                })
            },
            /**
             * 上传单张图片
             * 上传后
             * @param response 返回值
             * @param file
             */
            handleAvatarSuccess(response, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                this.imgname = response;
            },
            //上传前
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;
                var is = "";
                if (isJPG || isPNG) {
                    !isJPG ? is = isPNG : isJPG;
                } else {
                    this.$message.error('上传头像图片只能是 JPG、PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return is && isLt2M;
            },
            //点击主类型展示中类型
            getAllzho() {
                var _this = this
                _this.shoplnfoTypeDatazho = '';
                this.$axios.post("queryAllzho.action?ter=" + this.shoplnfoEditData.valuezhu).then(function (result) {
                    _this.shoplnfoTypeDatazho = result.data;
                })
                this.shoplnfoEditData.valuezho = '';
                this.valueci = '';
                this.shoplnfoTypeDataci='';
            },
            getAllzho2(){
                var _this = this
                _this.shoplnfoTypeDatazho = '';
                this.$axios.post("queryAllxiuzho.action?tid=" + this.shoplnfoEditData.tid).then(function (result) {
                    _this.shoplnfoTypeDatazho = result.data;
                    _this.shoplnfoEditData.valuezho=_this.shoplnfoTypeDataci[0].tsan;
                    console.log(_this.shoplnfoTypeDataci[0].tsan)
                })
            },
            //点击中类型展示次类型
            getAllci() {
                var _this = this
                this.$axios.post("queryAllci.action?tsan=" + this.shoplnfoEditData.valuezho).then(function (result) {
                    _this.shoplnfoTypeDataci = result.data;
                })
                this.valueci = '';
                this.shoplnfoTypeDataci='';
            },
            getAllci2() {
                var _this = this
                this.$axios.post("queryAllxiuci.action?tid=" + this.shoplnfoEditData.tid).then(function (result) {
                    _this.shoplnfoTypeDataci = result.data;
                    _this.valueci=_this.shoplnfoEditData.tid;
                })
            },
            getAllCommoditydan(){
                this.shoplnfoEditData=this.$parent.$parent.shoplnfoEditData;
                this.imageUrl=this.$host+this.shoplnfoEditData.picture;
                this.imgname=this.shoplnfoEditData.picture
            },
            warehouseAdd2(formName){
                var _this = this;
                this.$refs[formName].validate((valid) => {
                    if (_this.shoplnfoEditData.valuezho!='' && _this.valueci!='') {
                        if(_this.imgname!=''){
                            if (valid) {
                                var params = new URLSearchParams();
                                params.append("cId",_this.shoplnfoEditData.cid)
                                params.append("cName", _this.shoplnfoEditData.cname)
                                params.append("price", _this.shoplnfoEditData.price)
                                params.append("tId", _this.valueci)
                                params.append("picture", _this.imgname)
                                params.append("introduce", _this.shoplnfoEditData.introduce)
                                this.$axios.post("updateCommodityByPid.action?cId="+_this.shoplnfoEditData.cid
                                    +"&cName="+ _this.shoplnfoEditData.cname
                                    +"&price="+ _this.shoplnfoEditData.price
                                    +"&tId="+ _this.valueci
                                    +"&picture="+ _this.imgname
                                    +"&introduce="+_this.shoplnfoEditData.introduce,{params}
                                ).then(function (result) {
                                    if (result.data.code != '0') {
                                        _this.$message({
                                            showClose: true,
                                            message: '修改成功',
                                            type: 'success'
                                        });
                                        _this.$parent.$parent.dialogVisibleA = false;
                                        _this.$parent.$parent.getAllCommodity();
                                    } else {
                                        _this.$message({
                                            showClose: true,
                                            message: '修改失败',
                                            type: 'error'
                                        });
                                    }
                                })
                                /* _this.$axios.post("")*/

                            } else {
                                console.log('error submit!!');
                                return false;
                            }
                        }else {
                            _this.$message({
                                showClose: true,
                                message: '请选择一张图片',
                                type: 'error'
                            });
                        }
                    }else {
                        _this.$message({
                            showClose: true,
                            message: '请选择类型',
                            type: 'error'
                        });
                    }
                })
            },
        },
        created() {
            this.getAllCommoditydan()
            this.getAllzhu();
        }
    }
</script>

<style scoped>
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