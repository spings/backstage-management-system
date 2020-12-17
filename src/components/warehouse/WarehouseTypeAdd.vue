<template>
    <div>
        <el-form :model="addData" status-icon :rules="rules" ref="addData" label-width="100px" class="demo-ruleForm">
            <el-form-item label="请输入名称" prop="name">
                <el-input type="text" v-model="addData.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="warehouseTypeAdd('addData')">提交</el-button>
                <!--<el-button @click="resetForm('addData')">重置</el-button>-->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "warehouseTypeAdd",
        data() {

            return {

                addData: {
                    name: ''
                },

                // 校验规则
                rules: {
                    name: [{
                        required: true, //是否必填
                        message: '名称不能为空', //规则提示
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
                },
            };
        },
        methods: {
            warehouseTypeAdd(formName) {
                var _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.get("addWarehouseType.action", {
                            params: _this.addData
                        }).then(function (result) {
                            if (result.data == "添加成功") {
                                _this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                                _this.$parent.$parent.dialogVisibleAdd = false;
                                _this.$parent.$parent.getAllWarehouseType();
                            } else {
                                _this.$message.error(result.data);
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
        },
    }
</script>

<style scoped>

</style>