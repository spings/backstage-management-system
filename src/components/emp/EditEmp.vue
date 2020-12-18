<template>
    <div id="editEmpCom">
        <el-dialog title="修改员工信息" :visible.sync="visibleEditEmp">
            <el-form label-position="right" ref="row1" :rules="rules" label-width="80px" status-icon :model="row1"
                     size="mini"
                     style="width: 300px">
                <el-form-item label="名字" prop="name">
                    <el-input v-model="row1.name"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="row1.sex">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input type="age" v-model.number="row1.age" autocomplete="on"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                    <el-input v-model="row1.phone"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="row1.address"></el-input>
                </el-form-item>
                <el-form-item label="照片">
                    <input type="file" accept="image/*" @change="getFile($event)" class="EmpImgFile"/>
                    <img :src="$host+row.img" class="empImg1" id="EmpImgFile">
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('row1')">提交</el-button>
                    <el-button @click="resetForm('row1')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "editEmpCom",
        data() {
            return {
                row: [],
                visibleEditEmp: false,
                row1: {id: 0, name: "", sex: " ", age: 0, phone: "", address: "", img: ""},
                rules: {
                    age: [
                        {required: true, message: '年龄不能为空'},
                        {type: 'number', message: '年龄必须为数字值'}
                    ],
                    name: [
                        {required: true, message: '名字不能为空'},
                    ],
                    phone: [
                        {required: true, message: '电话不能为空'},
                    ],
                    address: [
                        {required: true, message: '地址不能为空'},
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
                        Object.keys(this.row1).forEach((key) => {
                            formData.append(key, this.row1[key]);
                        });
                        this.$axios({
                            method: 'post',
                            url: 'upEmp.action',
                            data: formData
                        }).then((result) => {
                            this.visibleEditEmp = false;
                            if (result.data) {
                                // 执行父组件的查询员工方法 刷新页面数据
                                this.$parent.empSeAll();
                                this.$notify({
                                    title: '成功',
                                    message: '修改成功',
                                    type: 'success',
                                    duration: 2000
                                });
                            } else {
                                this.$notify.error({
                                    title: '错误',
                                    message: '修改失败',
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
            // 选择图片文件
            getFile(event) {
                this.row1.img = event.target.files[0];
                let reader = new FileReader();
                //使用该对象读取file文件
                reader.readAsDataURL(this.row1.img);
                //读取文件成功后执行的方法函数
                reader.onload = function (e) {
                    //读取成功后返回的一个参数e，整个的一个进度事件
                    // console.log(e);
                    //选择所要显示图片的img，要赋值给img的src就是e中target下result里面
                    //的base64编码格式的地址
                    document.getElementById('EmpImgFile').src = e.target.result;
                    // $('#imgshow').get(0).src = e.target.result;
                }
            }
        },
        watch: {
            row(val) {
                this.row1.id = val.id;
                this.row1.name = val.name;
                this.row1.sex = val.sex;
                this.row1.age = val.age;
                this.row1.phone = val.phone;
                this.row1.address = val.address;
                this.row1.img = val.img;
            }
        }
    }
</script>

<style>
    .EmpImgFile {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 108px;
        height: 108px;
        opacity: 0;
        cursor: pointer;
    }

    .empImg1 {
        width: 108px;
        height: 108px;
    }

    #editEmpCom .el-dialog {
        background-image: url(http://localhost:8090/images/24.png);
        background-size: 129%;
        padding: 10px;
    }
</style>