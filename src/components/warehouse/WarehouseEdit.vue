<template>
    <div>
        <el-form :model="warehouseEditData" status-icon :rules="rules" ref="warehouseEditData" label-width="100px"
                 style="width: 300px"
                 label-position="right" size="mini"
                 class="demo-ruleForm">
            <el-form-item label="编号" prop="id">
                <el-input type="text" v-model="warehouseEditData.id" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="请输入名称" prop="name">
                <el-input type="text" v-model="warehouseEditData.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="请输入容量" prop="capacity">
                <el-input-number v-model="warehouseEditData.capacity" :min="1000" :max="2000"
                                 autocomplete="off"></el-input-number>
            </el-form-item>
            <el-form-item label="请选择类型">
                <template>
                    <el-select v-model="value" filterable placeholder="请选择">
                        <el-option
                                v-for="item in warehouseTypeData"
                                :key="item.id"
                                :label="item.name"
                                :value="item.name">
                        </el-option>
                    </el-select>
                </template>
            </el-form-item>

            <!-- <el-form-item label="请输入名称" prop="name">
                 <el-input type="text" v-model="warehouseEditData.name" autocomplete="off"></el-input>
             </el-form-item>-->
            <el-form-item>
                <el-button type="primary" @click="warehouseEdit('warehouseEditData')">提交</el-button>
                <!--<el-button @click="resetForm('editData')">重置</el-button>-->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Warehouse",
        data() {
            return {
                warehouseTypeData: [],
                warehouseEditData: {},
                wTypeId: '',
                value: '',
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
                    capacity: [{
                        required: true,
                        message: '年龄不能为空'
                    },
                        {
                            type: 'number',
                            message: '年龄必须为数字值'
                        }
                    ]
                }
            }
        },
        methods: {
            //获取所有仓库类型
            getAllWarehouseType() {
                var _this = this;
                this.$axios.get("queryAllWarehouseTypes.action").then(function (result) {
                    _this.warehouseTypeData = result.data;

                    var arr = result.data.filter(function (val) {
                        return val.name == _this.value;
                    })
                    _this.wTypeId = arr[0].id;



                }).catch(function (error) {
                    alert(error)
                })
            },
            warehouseEdit(formName) {
                var _this=this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var params=new URLSearchParams();
                        params.append("id",this.warehouseEditData.id)
                        params.append("name",this.warehouseEditData.name)
                        params.append("capacity",this.warehouseEditData.capacity)
                        params.append("tid",this.wTypeId)
                        this.$axios.get("updateWarehouseById.action",{
                            params
                        }).then(function (result) {
                            if (result.data == "修改成功"){
                                _this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                            }else {
                                _this.$message.error('修改失败');
                            }
                            _this.$parent.$parent.dialogVisible=false;
                            _this.$parent.$parent.getAllWarehouse();
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
        created() {
            this.value = this.$parent.$parent.value;
            this.getAllWarehouseType();
            this.warehouseEditData = this.$parent.$parent.warehouseEditData;

        },
        watch: {
            value: function (value) {
                var arr = this.warehouseTypeData.filter(function (val) {
                    return val.name == value;
                })
                this.wTypeId = arr[0].id;
            }
        }
    }
</script>

<style scoped>

</style>