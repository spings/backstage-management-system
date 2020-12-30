<template>
    <div>
        <el-form :model="Addtype" :rules="rules" label-width="80px" ref="Addtype"
                 class="demo-ruleForm">
            <el-form-item label="主类型" prop="tname">
                <el-input placeholder="请选择主类型" v-model="Addtype.tname" style="width: 500px;"
                          autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary " @click="Add('Addtype')">主要按钮</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "ClassifiedlnfoAdd",
        data() {
            return {
                Addtype: {
                    tname: ''
                },
            }
        },
        methods: {
            Add() {
                var _this = this;
                var params = new URLSearchParams();
                params.append("tName", this.Addtype.tname);
                if (this.$parent.$parent.value == "zhu") {
                    _this.$axios.post("insertzhu.action", params).then(function (result) {
                        if (result.data.code != 0) {
                            _this.$message({
                                showClose: true,
                                message: '添加成功',
                                type: 'success'
                            });
                            _this.$parent.$parent.dialogVisible = false;
                            _this.$parent.$parent.getAllZhu();
                        } else {
                            _this.$message({
                                showClose: true,
                                message: '添加失败',
                                type: 'error'
                            });
                        }
                    })
                } else if (this.$parent.$parent.value == "zho") {
                    params.append("ter", this.$parent.$parent.datatype);
                    _this.$axios.post("insertzho.action", params).then(function (result) {
                        if (result.data.code != 0) {
                            _this.$message({
                                showClose: true,
                                message: '添加成功',
                                type: 'success'
                            });
                            _this.$parent.$parent.dialogVisible = false;
                            _this.$parent.$parent.getAllZhu();
                        } else {
                            _this.$message({
                                showClose: true,
                                message: '添加失败',
                                type: 'error'
                            });
                        }
                    })
                } else {
                    params.append("tsan", this.$parent.$parent.datatype);
                    _this.$axios.post("insertci.action", params).then(function (result) {
                        if (result.data.code != 0) {
                            _this.$message({
                                showClose: true,
                                message: '添加成功',
                                type: 'success'
                            });
                            _this.$parent.$parent.dialogVisible = false;
                            _this.$parent.$parent.getAllZhu();
                        } else {
                            _this.$message({
                                showClose: true,
                                message: '添加失败',
                                type: 'error'
                            });
                        }
                    })
                }
            },
        }
    }
</script>

<style scoped>

</style>