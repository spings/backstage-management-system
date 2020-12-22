<template>
    <div>

        <el-form :model="addPurchaseData" status-icon :rules="rules" ref="addPurchaseData" label-width="100px"
                 style="width: 300px"
                 label-position="right" size="mini"
                 class="demo-ruleForm">
            <el-form-item label="编号" prop="cid">
                <el-input type="text" v-model="addPurchaseData.cid" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="名称" prop="cname">
                <el-input disabled type="text" v-model="addPurchaseData.cname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="price">
                <el-input disabled type="text" v-model="addPurchaseData.price"
                          autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="购买数量" prop="stock">
                <el-input-number v-model="addPurchaseData.stock" :min="1000" :max="20000"
                                 autocomplete="off"></el-input-number>
            </el-form-item>

            <el-form-item label="请选择仓库">
                <template>
                    <el-select @change="queryWarehouse" v-model="addPurchaseData.wid" filterable placeholder="请选择">
                        <el-option
                                v-for="item in warehouseData"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </template>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="purchaseAdd('addPurchaseData')">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "PurchaseAdd",
        data() {
            return {
                addPurchaseData: {
                    cid: 0,
                    wid: '',
                    cname: '',
                    price: '',
                    stock: 0
                },
                warehouseData: [],
                // 校验规则
                rules: {
                    stock: [{
                        required: true,
                        message: '数量不能为空'
                    },
                        {
                            type: 'number',
                            message: '数量必须为数字值'
                        }
                    ]
                },
            }
        },
        methods: {
            purchaseAdd(formName) {
                var _this = this;
                var params = new URLSearchParams();
                params.append('wId', _this.addPurchaseData.wid)
                params.append('cId', _this.addPurchaseData.cid)
                params.append('stock', _this.addPurchaseData.stock)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.get("addWarehouseGoods.action", {
                            params
                        }).then(function (result) {
                            if (result.data == "采购成功") {
                                _this.$message({
                                    message: result.data,
                                    type: 'success'
                                });
                            } else {
                                _this.$message.error(result.data);
                            }
                            _this.$parent.$parent.dialogVisibleAdd = false;
                        }).catch(function (error) {
                            alert(error)
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            queryWarehouse() {
                var _this = this;
                //alert(_this.addPurchaseData.wid+"---"+this.addPurchaseData.cid)
                this.$axios.get("queryWarehouseGoodsById.action", {
                    params: {
                        wId: _this.addPurchaseData.wid,
                        cId: _this.addPurchaseData.cid,
                        stock: _this.addPurchaseData.stock
                    }
                }).then(function (result) {
                    if (result.data == "") {
                        _this.addPurchaseData.wid = "";
                        alert("容量不足");
                    }
                }).catch(function (error) {
                    alert(error)
                })
            }
        },
        created() {
            var _this = this;
            this.addPurchaseData = this.$parent.$parent.purchaseAddData;
            this.$axios.get("queryAllWarehouse.action?rows=1000000").then(function (result) {
                _this.warehouseData = result.data.rows;
            }).catch(function (error) {
                alert(error)
            })

        }
    }
</script>

<style>

</style>