<template>
    <div>
        <el-form :model="shoplnfoAddData" :rules="rules" label-width="80px" ref="shoplnfoAddData"
                 class="demo-ruleForm">
            <el-form-item label="名称" prop="cname">
                <el-input placeholder="请选择" v-model="shoplnfoAddData.cname" style="width: 500px;"
                          autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="price">
                <el-input placeholder="请选择" v-model="shoplnfoAddData.price" style="width: 500px;"></el-input>
            </el-form-item>
            <el-form-item placeholder="请选择" label="类型主" prop="valuezhu">

                <template>
                    <el-select
                            v-model="shoplnfoAddData.valuezhu"
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
                    <el-select v-model="shoplnfoAddData.valuezho" filterable placeholder="请选择" style="width: 200px;"
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
                    <el-select v-model="shoplnfoAddData.valueci" filterable placeholder="请选择" style="width: 200px;">
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
                        :action="this.$upload"
                        list-type="picture-card"
                        accept=".jpg, .jpeg, .png"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        :limit="1"
                        :auto-upload="true">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                        <img
                                :src="file.url" alt=""
                        >
                        <span class="el-upload-list__item-actions">
                        <span
                                class="el-upload-list__item-preview"
                                @click="handlePictureCardPreview(file)"
                        >
                          <i class="el-icon-zoom-in"></i>
                        </span>
                      </span>
                    </div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="介绍" prop="introduce">
                <el-input v-model="shoplnfoAddData.introduce" style="width: 500px;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary " @click="warehouseAdd('shoplnfoAddData')">主要按钮</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
    export default {
        name: "ShoplnfoAdd",
        data() {
            return {
                shoplnfoTypeDatazhu: [],
                shoplnfoTypeDatazho: [],
                shoplnfoTypeDataci: [],
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false,
                imageUrl: '',
                imgname: '',
                shoplnfoAddData: {
                    cname: '',
                    price: '',
                    valuezhu: '',
                    valuezho: '',
                    valueci: '',
                    introduce: ''
                },
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
                }
            }
        },
        methods: {
            handleRemove(file) {

                console.log(file)
                return true
            },
            //图片放大
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            /**
             * 上传单张图片
             * 上传后
             * @param response 返回值
             * @param file
             */
            handleAvatarSuccess(response, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            //上传前
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;
                this.imgname = file.name;
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
            //查询所有主类型
            getAllzhu() {
                var _this = this
                this.$axios.post("queryAllzhu.action").then(function (result) {
                    _this.shoplnfoTypeDatazhu = result.data;
                })
            },
            //点击主类型展示中类型
            getAllzho() {
                var _this = this
                _this.shoplnfoTypeDatazho = '';
                this.$axios.post("queryAllzho.action?ter=" + this.shoplnfoAddData.valuezhu).then(function (result) {
                    _this.shoplnfoTypeDatazho = result.data;
                })
                _this.shoplnfoAddData.valuezho = '';
                _this.shoplnfoAddData.valueci = '';
                this.shoplnfoTypeDataci=[];
            },
            //点击中类型展示次类型
            getAllci() {
                var _this = this
                this.$axios.post("queryAllci.action?tsan=" + this.shoplnfoAddData.valuezho).then(function (result) {
                    _this.shoplnfoTypeDataci = result.data;
                })
                /*_this.shoplnfoAddData.valueci = '';*/
            },
            //添加商品
            warehouseAdd(formName) {
                var _this = this;
                this.$refs[formName].validate((valid) => {
                    if (_this.shoplnfoAddData.valuezho!='' && _this.shoplnfoAddData.valueci!='') {
                        if(_this.imgname!=''){
                            if (valid) {
                                var params = new URLSearchParams();
                                params.append("cName", _this.shoplnfoAddData.cname)
                                params.append("price", _this.shoplnfoAddData.price)
                                params.append("tId", _this.shoplnfoAddData.valueci)
                                params.append("picture", _this.imgname)
                                params.append("introduce", _this.shoplnfoAddData.introduce)
                                _this.$axios.post("insertCommodity.action", params).then(function (result) {
                                    if (result.data.code != '0') {
                                        _this.$message({
                                            showClose: true,
                                            message: '添加成功',
                                            type: 'success'
                                        });
                                        _this.$parent.$parent.dialogVisible = false;
                                        _this.$parent.$parent.getAllCommodity();
                                    } else {
                                        _this.$message({
                                            showClose: true,
                                            message: '添加失败',
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