<template>
    <div id="roleView">
        <role-edit-com></role-edit-com>
        <role-add-com></role-add-com>
        <EditPermissionsCom></EditPermissionsCom>
        <el-button v-if="$indexOf(30)" @click="roleAdd" type="primary" class="roleAddBtn">
            Add
        </el-button>
        <el-table
                :data="roles"
                border
                stripe
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="角色id">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="角色名">
            </el-table-column>
            <el-table-column align="left" label="操作" v-if="$indexOf(62) || $indexOf(31) || $indexOf(32)">
                <template slot-scope="scope">
                    <el-button v-if="$indexOf(62)" size="mini" type="warning"
                               @click="permissionsEdit(scope.row)">
                        修改权限
                    </el-button>
                    <el-button v-if="$indexOf(31)" size="mini" type="warning"
                               @click="roleEdit(scope.row)">
                        修改角色信息
                    </el-button>
                    <el-button v-if="$indexOf(32)" size="mini" type="danger"
                               @click="roleDel(scope.row)">
                        删除角色
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import RoleEditCom from "../components/role/RoleEdit";
    import RoleAddCom from "../components/role/RoleAdd";
    import EditPermissionsCom from "../components/role/EditPermissions";

    export default {
        name: "roleView",
        components: {EditPermissionsCom, RoleAddCom, RoleEditCom},
        data() {
            return {
                // 角色信息集合
                roles: []
            }
        },
        methods: {
            // 查询所有角色信息
            seRole() {
                this.$axios({
                    method: 'post',
                    url: 'seRole.action',
                    data: {}
                }).then((result) => {
                    this.roles = result.data;
                });
            },
            // 修改权限信息
            permissionsEdit(row) {
                let data = new URLSearchParams();
                data.set("id", row.id);
                this.$axios({
                    method: 'post',
                    url: 'seRolePer.action',
                    data: data
                }).then((result) => {
                    // 删除父菜单的id < 22
                    let data1 = Array.from(new Set(result.data));
                    for (; ;) {
                        let i = 1;
                        data1.forEach((item, index) => {
                            if (item !== 17 && item !== 18 && item !== 19) {
                                if (item < 22 ) {
                                    i = 0;
                                    data1.splice(index, 1);
                                }
                            }
                        });
                        if (i === 1) {
                            break;
                        }
                    }
                    this.$children[2].menusTrue = data1;
                    this.$children[2].rid = row.id;
                });
                this.$children[2].editPermissionsComBool = true;
            },
            // 修改角色信息
            roleEdit(row) {
                this.$children[0].row = row;
                this.$children[0].visibleRoleEdit = true;
            },
            // 删除角色
            roleDel(row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data = new URLSearchParams();
                    data.set("id", row.id);
                    this.$axios({
                        method: 'post',
                        url: 'delRole.action',
                        data: data
                    }).then((result) => {
                        if (result.data) {
                            // 执行查询角色方法 刷新页面数据
                            this.seRole();
                            this.$notify({
                                message: '删除成功',
                                type: 'success',
                                duration: 2000
                            });
                        } else {
                            this.$notify.error({
                                message: '删除失败',
                                duration: 2000
                            });
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            // 添加角色信息
            roleAdd() {
                this.$children[1].roleAddComBool = true;
            }
        },
        created() {
            this.seRole();
        }
    }
</script>

<style scoped>
    .roleAddBtn {
        width: 100%;
    }
</style>