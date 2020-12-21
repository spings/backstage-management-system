<template>
    <div id="roleAddCom">
        <el-dialog title="添加角色信息" :visible.sync="roleAddComBool">
            <el-form label-position="right" ref="row" :rules="rules" label-width="80px" status-icon
                     :model="row"
                     size="mini"
                     style="width: 300px">
                <el-form-item label="名字" prop="name">
                    <el-input v-model="row.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('row')">提交</el-button>
                    <el-button @click="resetForm('row')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "roleAddCom",
        data() {
            return {
                roleAddComBool: false,
                row: {},
                // 验证
                rules: {
                    name: [
                        {required: true, message: '名字不能为空'},
                    ]
                }
            }
        },
        methods: {
            // 提交表单
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    // 满足条件提交
                    if (valid) {
                        let  formData = new FormData();
                        //将需要提交的表单数据 快速组装为H5定义的类型FormData
                        Object.keys(this.row).forEach((key) => {
                            formData.append(key, this.row[key]);
                        });
                        this.$axios({
                            method: 'post',
                            url: 'inRole.action',
                            data: formData
                        }).then((result) => {
                            this.roleAddComBool = false;
                            if (result.data) {
                                // 执行父组件的查询角色方法 刷新页面数据
                                this.$parent.seRole();
                                this.$notify({
                                    title: '成功',
                                    message: '添加成功',
                                    type: 'success',
                                    duration: 2000
                                });
                            } else {
                                this.$notify.error({
                                    title: '错误',
                                    message: '添加失败',
                                    duration: 2000
                                });
                            }
                        });
                    } else {
                        return false;
                    }
                });
            },
            // 重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        }
    }
</script>

<style scoped>

</style>