<template>
    <div id="editPermissionsCom">
        <el-dialog title="修改角色权限信息" :visible.sync="editPermissionsComBool">
            <el-button type="warning" @click="upRolePer" size="mini">授权</el-button>
            <el-tree
                    :data="menus"
                    show-checkbox
                    node-key="id"
                    :props="menusProps"
                    highlight-current
                    :default-checked-keys="menusTrue"
                    :default-expanded-keys="menusTrue"
                    ref="menusTree">
            </el-tree>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "editPermissionsCom",
        data() {
            return {
                editPermissionsComBool: false,
                menus: [],
                menusProps: {
                    children: 'children',
                    label: 'name'
                },
                menusTrue: [],
                rid: 0
            }
        },
        methods: {
            // 查询所有菜单信息，包括按钮
            seMenusBtn() {
                this.$axios({
                    method: 'post',
                    url: 'seMenu1.action',
                    data: {}
                }).then((result) => {
                    this.menus = result.data;
                    this.menus.forEach((m) => {
                        if (m.children.length < 1) {
                            m.children = m.children1;
                        }
                    });
                });
            },
            // 修改角色权限
            upRolePer() {
                // 当对话框关闭时进行判断
                // 拿到选中菜单的集合
                let list1 = this.$refs.menusTree.getCheckedKeys();
                // 判断角色原有的权限数量是否大于改变后的权限数量
                if (this.menusTrue.length > list1.length) {
                    // 删除权限
                    // 循环角色原有的权限
                    this.menusTrue.forEach((item, index) => {
                        // 循环对话框关闭时选中的菜单
                        list1.forEach((item1) => {
                            // 将一样的删掉
                            if (item === item1) {
                                this.menusTrue.splice(index, 1);
                            }
                        });
                    });
                    // 剩下的从角色权限删除
                    let a = 1;
                    this.menusTrue.forEach((item) => {
                        let data = new URLSearchParams();
                        data.set("rid", this.rid);
                        data.set("mid", item);
                        this.$axios.post("delRolePer.action", data).then((result) => {
                            if (!result.data) {
                                a = 0;
                            }
                        });
                    });
                    if (a === 1) {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                    } else {
                        this.$message.error('修改失败');
                    }
                } else if (this.menusTrue.length < list1.length) {
                    // 添加权限
                    // 循环对话框关闭时选中的菜单
                    list1.forEach((item, index) => {
                        // 循环角色原有的权限
                        this.menusTrue.forEach((item1) => {
                            // 将一样的删掉
                            if (item === item1) {
                                list1.splice(index, 1);
                            }
                        });
                    });
                    // 剩下的添加入角色权限
                    let a = 1;
                    list1.forEach((item) => {
                        let data = new URLSearchParams();
                        data.set("rid", this.rid);
                        data.set("mid", item);
                        this.$axios.post("inRolePer.action", data).then((result) => {
                            if (!result.data) {
                                a = 0;
                            }
                        });
                    });
                    if (a === 1) {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                    } else {
                        this.$message.error('修改失败');
                    }
                }
                // 关闭对话框
                this.editPermissionsComBool = false;
            }
        },
        watch: {
            editPermissionsComBool(val) {
                if (!val) {
                    let _this = this;
                    // 取消所有选中
                    this.$refs.menusTree.setCheckedKeys([]);
                    // 将没有转换成树的原数据
                    // 全部收起
                    let list = this.menus;
                    for (let i = 0; i < list.length; i++) {
                        _this.$refs.menusTree.store.nodesMap[list[i].id].expanded = false;
                    }
                }
            }
        },
        created() {
            this.seMenusBtn();
        }
    }
</script>

<style scoped>

</style>