<template>
    <div>
        <el-form :model="Edittype" :rules="rules" label-width="80px" ref="Edittype"
                 class="demo-ruleForm">
            <el-form-item label="主类型" prop="tname">
                <el-input placeholder="请选择主类型" v-model="Edittype.tname" style="width: 500px;"
                          autocomplete="off"></el-input>
            </el-form-item>
            <template>
                <el-select v-model="Edittype.type" filterable placeholder="请选择" style="width: 200px;">
                    <el-option
                            v-for="item in Datatype"
                            :key="item.tid"
                            :label="item.tname"
                            :value="item.tid">
                    </el-option>
                </el-select>

                <el-select v-model="Edittype.type" filterable placeholder="请选择" style="width: 200px;">
                    <el-option
                            v-for="item in Datatype"
                            :key="item.tid"
                            :label="item.tname"
                            :value="item.tid">
                    </el-option>
                </el-select>
            </template>
            <el-form-item>
                <el-button type="primary " @click="Add('Edittype')">主要按钮</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "ClassifiedlnfoEdit",
        data() {
            return {
                Edittype: {
                    tname: '',
                    type:'',
                },
                Datatype:[],
            }
        },
        methods:{
            Edit(){
                var _this=this;
                var params=new URLSearchParams();
                params.append("tName",this.Addtype.tname);
                if(this.$parent.$parent.value=="zhu"){
                    alert("zhu")
                    alert(this.Addtype.tname)
                    _this.$axios.post("insertzhu.action",params).then(function (result) {
                        if(result.data.code!=0){
                            _this.$message({
                                showClose: true,
                                message: '添加成功',
                                type: 'success'
                            });
                        }else{
                            _this.$message({
                                showClose: true,
                                message: '添加失败',
                                type: 'error'
                            });
                        }
                    })
                }else if(this.$parent.$parent.value=="zho"){
                    alert("zho")
                    _this.$axios.post("insertzho.action",params).then(function (result) {
                        if(result.data.code!=0){
                            _this.$message({
                                showClose: true,
                                message: '添加成功',
                                type: 'success'
                            });
                        }else{
                            _this.$message({
                                showClose: true,
                                message: '添加失败',
                                type: 'error'
                            });
                        }
                    })
                }else{
                    alert("ci")
                    _this.$axios.post("insertci.action",params).then(function (result) {
                        if(result.data.code!=0){
                            _this.$message({
                                showClose: true,
                                message: '添加成功',
                                type: 'success'
                            });
                        }else{
                            _this.$message({
                                showClose: true,
                                message: '添加失败',
                                type: 'error'
                            });
                        }
                    })
                }
            },
            getAll(){
                var _this=this;
                if(this.$parent.$parent.value=="zho"){

                this.$axios.post("getAllzhu.action").then(function (result) {
                    _this.Datatype=result.data()
                })

                }else{
                this.$axios.post("getAllzho.action").then(function (result) {
                    _this.Datatype=result.data()
                })

                }
            }
        },
        created() {
            this.getAll()
        }
    }
</script>

<style scoped>

</style>