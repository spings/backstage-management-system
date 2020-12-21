<template>
    <div id="empView">
        <el-button @click="empAdd" type="primary" class="empAddBtn">
            Add
        </el-button>
        <el-table
                :data="emp"
                border
                stripe
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="id" width="100px">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名" width="145px">
            </el-table-column>
            <el-table-column
                    prop="sex"
                    label="性别" width="145px">
            </el-table-column>
            <el-table-column
                    prop="age"
                    label="年龄" width="145px">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="电话" width="145px">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址" width="145px">
            </el-table-column>
            <el-table-column
                    label="照片" width="145px">
                <template slot-scope="scope">
                    <el-image
                            class="empImg"
                            :src="$host+scope.row.img"
                            :preview-src-list="[$host+scope.row.img]">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column
                    label="角色" width="145px">
                <template slot-scope="scope">
                    <el-popover
                            placement="top"
                            width="160">
                        <p style="text-align: center;margin-bottom: 5px"
                           v-for="(r, index) in scope.row.roles" :key="index">
                            {{r.name}}
                        </p>

                        <el-button @click="empRoleEdit(scope.row)" type="warning" size="mini"
                                   style="margin-left: 52px">
                            修改
                        </el-button>
                        <span slot="reference" style="cursor: pointer">......</span>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column align="right">
                <template slot="header" slot-scope="[]">
                    <el-input size="mini" v-model="seInput" placeholder="输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
                    <el-button size="mini" type="warning"
                               @click="empEdit(scope.row)">
                        Edit
                    </el-button>
                    <el-button size="mini" type="danger"
                               @click="empDelete(scope.row)">
                        Delete
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="empSizeChange"
                @current-change="empCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 30, 40]"
                :page-size="5"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
        >
        </el-pagination>
        <edit-emp-role-com></edit-emp-role-com>
        <edit-emp-com></edit-emp-com>
        <add-emp-com></add-emp-com>
    </div>
</template>

<script>
    import EditEmpRoleCom from "../components/emp/EditEmpRole";
    import EditEmpCom from "../components/emp/EditEmp";
    import AddEmpCom from "../components/emp/AddEmp";

    export default {
        name: "empView",
        data() {
            return {
                // 员工集合
                emp: [],
                // 查询input
                seInput: "",
                // 所有角色信息集合
                roles: [],
                // 当前员工的角色信息
                role: [],
                // 总页数
                total: 0,
                // 每页记录条数
                pageSize: 5,
                // 当前页数
                currentPage: 1
            }
        },
        methods: {
            // 点击打开修改员工信息弹窗并传递数据
            empEdit(row) {
                this.$children[4].row = row;
                this.$children[4].visibleEditEmp = true;
            },
            // 删除员工信息（逻辑删除）
            empDelete(row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data = new URLSearchParams();
                    data.set("id", row.id);
                    this.$axios({
                        method: 'post',
                        url: 'delEmp.action',
                        data: data
                    }).then((result) => {
                        if (result.data) {
                            // 执行查询员工方法 刷新页面数据
                            this.empSeAll();
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
            // 修改每页条数执行的方法
            empSizeChange(val) {
                this.pageSize = val;
                this.currentPage = 1;
                let data = new URLSearchParams();
                data.set("rows", val);
                data.set("conditions", this.seInput);
                this.$axios({
                    method: 'post',
                    url: 'seEmp.action',
                    data: data
                }).then((result) => {
                    this.emp = result.data.rows;
                    this.total = result.data.total;
                });
            },
            // 修改页数执行的方法
            empCurrentChange(val) {
                this.currentPage = 1;
                let data = new URLSearchParams();
                data.set("page", val);
                data.set("rows", this.pageSize);
                data.set("conditions", this.seInput);
                this.$axios({
                    method: 'post',
                    url: 'seEmp.action',
                    data: data
                }).then((result) => {
                    this.emp = result.data.rows;
                    this.total = result.data.total;
                });
            },
            // 修改角色弹窗并传递数据
            empRoleEdit(row) {
                let roles = row.roles;
                // this.role 当前员工角色信息
                this.role = roles;
                // 显示窗口
                this.$children[3].visibleEditRole = true;
                // 传递数据   this.roles  所有角色信息  row.id 当前员工id
                this.$children[3].roles = this.roles;
                this.$children[3].eid = row.id;
                // 循环所有角色信息
                this.roles.forEach((r, index) => {
                    let a = 1;
                    // 循环当前员工的角色信息
                    roles.forEach((r1) => {
                        // 判断 如果当前员工有这个角色，就true
                        if (r1.name === r.name) {
                            a = 0;
                        }
                    });
                    if (a === 0) {
                        this.$children[3].rolesBool[index] = true;
                    } else {
                        this.$children[3].rolesBool[index] = false;
                    }
                });
            },
            // 点击打开添加员工信息弹窗
            empAdd() {
                this.$children[5].visibleAddEmp = true;
            },
            // 查询全部员工信息
            empSeAll() {
                this.$axios({
                    method: 'post',
                    url: 'seEmp.action',
                    data: {}
                }).then((result) => {
                    this.emp = result.data.rows;
                    this.total = result.data.total;
                });
            }
        },
        components: {AddEmpCom, EditEmpCom, EditEmpRoleCom},
        watch: {
            empEmpRole(val) {
                if (val.length > this.role.length) {
                    this.role.forEach((r) => {
                        val.forEach((v, index) => {
                            if (v.name === r.role) {
                                this.empEmpRole.splice(index, 1);
                            }
                        });
                    });
                    // 多的角色
                    console.log(this.empEmpRole);
                } else {
                    val.forEach((v) => {
                        this.role.forEach((r, index) => {
                            if (v.name === r.role) {
                                console.log(r.role)
                                console.log(index)
                            }
                        });
                    });
                    // 少的角色
                    console.log(this.role);
                }
            },
            seInput(val) {
                let data = new URLSearchParams();
                data.set("conditions", val)
                this.$axios({
                    method: 'post',
                    url: 'seEmp.action',
                    data: data
                }).then((result) => {
                    this.emp = result.data.rows;
                    this.total = result.data.total;
                });
            }
        },
        created() {
            this.empSeAll();
            this.$axios({
                method: 'post',
                url: 'seRole.action',
                data: {}
            }).then((result) => {
                this.roles = result.data;
            });
        }
    }
</script>

<style scoped>
    .empImg {
        width: 25px;
        height: 22px;
        cursor: pointer;
    }

    .empAddBtn {
        width: 100%;
    }

    #empView .el-pagination {
        text-align: center;
        margin-top: 10px;
    }
</style>