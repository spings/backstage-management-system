<template>
    <div id="roleView">
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
            <el-table-column align="left">
                <template slot-scope="scope">
                    <el-button size="mini" type="warning"
                               @click="permissionsEdit(scope.row)">
                        修改权限
                    </el-button>
                    <el-button size="mini" type="warning"
                               @click="roleEdit(scope.row)">
                        修改角色信息
                    </el-button>
                    <el-button size="mini" type="danger"
                               @click="roleDel(scope.row)">
                        删除角色
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "roleView",
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
                console.log(row);
            },
            // 修改角色信息
            roleEdit(row) {
                console.log(row);
            },
            // 删除角色
            roleDel(row) {
                console.log(row);
            }
        },
        created() {
            this.seRole();
        }
    }
</script>

<style>

</style>