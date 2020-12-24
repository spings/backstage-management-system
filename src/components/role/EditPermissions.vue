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
                // 拿到半选中菜单的集合
                let list2 = this.$refs.menusTree.getHalfCheckedKeys();
                // 删除当前员工的权限
                let data = new URLSearchParams();
                data.set("rid", this.rid);
                this.$axios.post("delRolePer.action", data).then((result) => {
                    console.log("删除当前员工的权限: " + result.data);
                })
                // 添加选中权限
                let data1 = new URLSearchParams();
                data1.set("rid", this.rid);
                data1.set("midList1", JSON.stringify(list1));
                data1.set("midList2", JSON.stringify(list2));
                this.$axios.post("inRolePer.action", data1).then((result) => {
                    if (result.data) {
                        this.$message({message: "修改成功", type: "success"});
                    } else {
                        this.$message.error("修改失败")
                    }
                });
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