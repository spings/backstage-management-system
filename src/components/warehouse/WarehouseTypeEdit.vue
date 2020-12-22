<template>
    <div>
        <el-form :model="editData" status-icon :rules="rules" ref="editData" label-width="100px" class="demo-ruleForm"
                 style="width: 300px"
                 label-position="right" size="mini">
            <el-form-item label="编号" prop="id">
                <el-input type="text" v-model="editData.id" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="请输入名称" prop="name">
                <el-input type="text" v-model="editData.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="warehouseTypeEdit('editData')">提交</el-button>
                <!--<el-button @click="resetForm('editData')">重置</el-button>-->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "WarehouseTypeEdit",
        data() {

            return {

                editData: {},

                // 校验规则
                rules: {
                    name: [{
                        required: true, //是否必填
                        message: '用户名不能为空', //规则提示
                        trigger: 'blur' //何事件触发
                    },
                        //可以设置多重验证标准
                        {
                            min: 2,
                            max: 5,
                            message: '长度在 2 到 5 个字符'
                        },
                        {
                            pattern: /^[\u4E00-\u9FA5]+$/, //正则
                            message: '用户名只能为中文'
                        }
                    ],
                    age: [{
                        required: true,
                        message: '年龄不能为空'
                    },
                        {
                            type: 'number',
                            message: '年龄必须为数字值'
                        }
                    ]
                },
            };
        },
        methods: {
            getData() {
                this.editData = this.$parent.$parent.editData;
            },
            warehouseTypeEdit(formName) {
                var _this=this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.get("updateWarehouseTypeById.action",{
                            params:_this.editData
                        }).then(function (result) {
                            if (result.data=="修改成功"){
                                _this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                _this.$parent.$parent.dialogVisible=false;
                                _this.$parent.$parent.getAllWarehouseType();
                            }else {
                                _this.$message.error('修改失败');
                            }
                        }).catch(function (error) {
                            alert(error)
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        created() {
            this.getData();
        }
    }
</script>

<style>

</style>