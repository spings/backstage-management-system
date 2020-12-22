<template>
    <div>
        <el-form :model="warehouseAddData" status-icon :rules="rules" ref="warehouseAddData" label-width="100px"
                 style="width: 300px"
                 label-position="right" size="mini"
                 class="demo-ruleForm">
            <el-form-item label="请输入名称" prop="name">
                <el-input type="text" v-model="warehouseAddData.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="请输入容量" prop="capacity">
                <el-input-number v-model="warehouseAddData.capacity" :min="1000" :max="2000"
                                 autocomplete="off"></el-input-number>
            </el-form-item>
            <el-form-item label="请选择类型" prop="tid">
                <template>
                    <el-select v-model="warehouseAddData.tid" filterable placeholder="请选择">
                        <el-option
                                v-for="item in warehouseTypeData"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </template>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="warehouseAdd('warehouseAddData')">提交</el-button>
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
                warehouseAddData: {
                    name:'',
                    capacity:'',
                    tid:''
                },
                value: '',
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
                    capacity: [{
                        required: true,
                        message: '容量不能为空'
                    },
                        {
                            type: 'number',
                            message: '容量必须为数字值'
                        }
                    ],
                    tid: [{
                        required: true,
                        message: '请选择一个类型'
                    },
                        {
                            type: 'number',
                            message: '请选择一个类型'
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
                }).catch(function (error) {
                    alert(error)
                })
            },
            warehouseAdd(formName) {
                var _this=this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.get("addWarehouse.action",{
                            params:_this.warehouseAddData
                        }).then(function (result) {
                            if (result.data=="添加成功"){
                                _this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                                _this.$parent.$parent.dialogVisibleAdd=false;
                                _this.$parent.$parent.getAllWarehouse();
                            }else {
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
        created() {
            this.getAllWarehouseType();
        }
    }
</script>

<style scoped>

</style>