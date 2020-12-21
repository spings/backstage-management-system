<template>
    <div id="editPermissionsCom">
        <el-dialog title="修改角色权限信息" :visible.sync="editPermissionsComBool">
            <el-tree
                    :data="menus"
                    show-checkbox
                    node-key="id"
                    :props="menusProps"
                    highlight-current
                    :default-checked-keys="menusTrue">
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
                menusTrue: []
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
            }
        },
        created() {
            this.seMenusBtn();
        }
    }
</script>

<style scoped>

</style>