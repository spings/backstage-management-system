<template>
    <div id="editEmpRoleCom">
        <el-dialog title="修改角色" :visible.sync="visibleEditRole">
            <div class="empRoles">
                <div v-for="(r, index) in roles" :key="index">
                    <!--循环显示所有角色名-->
                    <span>{{r.name}}</span>
                </div>
            </div>
            <div class="empRolesBtn">
                <div v-for="(index) in roles.length" :key="index*10">
                    <!--给角色添加一个开关，当当前员工拥有此角色时打开，在emp.vue中判断了  数据存入了rolesBool集合-->
                    <el-switch v-model="rolesBool[index - 1]" active-color="#13ce66">
                    </el-switch>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "editEmpRoleCom",
        data() {
            return {
                // 控制窗口是否打开
                visibleEditRole: false,
                // 所有的角色信息集合
                roles: [],
                // 员工是否拥有当前角色的判断集合 false/true
                rolesBool: [],
                // 窗口关闭时选中的角色
                roleCloseWin: [],
                // 当前员工id,
                eid: 0
            }
        },
        watch: {
            // 监听
            visibleEditRole(val) {
                // 判断当窗口关闭时 false
                if (!val) {
                    // 我要干的事：在窗口关闭时对员工角色的增加或删除
                    // 分析：
                    // 当窗口关闭时，拿到所有为true的开关存入一个集合，
                    // 循环rolesBool拿到选中的角色名存入roleCloseWin
                    this.rolesBool.forEach((item, index) => {
                        if (item) {
                            // 拿id就行了
                            this.roleCloseWin.push({
                                "id": this.roles[index].id
                            });
                        }
                    });

                    // 如果集合的长度大于之前的员工角色集合，则将员工已有的角色排除，将拿到的需要添加的角色id进行添加
                    // 员工未改变的角色
                    let role = this.$parent.role;
                    // 改变后的 this.roleCloseWin
                    if (this.roleCloseWin.length > role.length) {
                        // 将员工已有的角色排除
                        role.forEach((r) => {
                            this.roleCloseWin.forEach((rw, index) => {
                                if (r.id === rw.id) {
                                    this.roleCloseWin.splice(index, 1);
                                }
                            });
                        });
                        // 拿到的需要添加的角色id进行添加
                        let addBool = true;
                        this.roleCloseWin.forEach((rw) => {
                            let data = new URLSearchParams();
                            data.set("eid", this.eid);
                            data.set("rid", rw.id);
                            this.$axios({
                                method: 'post',
                                url: 'inEmpRole.action',
                                data: data
                            }).then((result) => {
                                if (!result.data) {
                                    addBool = false;
                                }
                            });
                        });
                        if (addBool) {
                            this.$notify({
                                message: '修改成功',
                                type: 'success',
                                duration: 2000
                            });
                        } else {
                            this.$notify.error({
                                message: '修改失败',
                                duration: 2000
                            });
                        }
                    }
                    // 反之则进行删除
                    if (this.roleCloseWin.length < role.length) {
                        // 将用户取消的角色id 搞出来
                        let cr = [];
                        // 循环员工当前的所有角色
                        role.forEach((r) => {
                            let a = 1;
                            // 循环用户关闭窗口时选择的角色
                            this.roleCloseWin.forEach((rw) => {
                                if (r.id === rw.id) {
                                    a = 0;
                                }
                            });
                            // 将员工原来有但是窗口关闭时用户没有选中的角色拿出来
                            if (a === 1) {
                                cr.push({
                                    "id": r.id
                                })
                            }
                        });
                        // 进行删除操作
                        let delBool = true;
                        cr.forEach((c) => {
                            let data = new URLSearchParams();
                            data.set("eid", this.eid);
                            data.set("rid", c.id);
                            this.$axios({
                                method: 'post',
                                url: 'delEmpRole.action',
                                data: data
                            }).then((result) => {
                                if (!result.data) {
                                    delBool = false;
                                }
                            });
                        });
                        if (delBool) {
                            this.$notify({
                                message: '修改成功',
                                type: 'success',
                                duration: 2000
                            });
                        } else {
                            this.$notify.error({
                                message: '修改失败',
                                duration: 2000
                            });
                        }
                    }

                    // 完事之后应将roleCloseWin清空，避免重复
                    this.roleCloseWin.splice(0);

                    // 当窗口关闭时应当把rolesBoll集合清空，以至于下次打开时不会出现混乱
                    this.rolesBool.splice(0);

                    // 执行父组件的查询员工方法 刷新页面数据
                    this.$parent.empSeAll();
                }
            }
        }
    }
</script>

<style>
    .empRoles {
        width: 150px;
        text-align: right;
    }

    .empRoles > div {
        margin-top: 10px;
    }

    .empRolesBtn {
        width: 100px;
        position: absolute;
        top: 84px;
        left: 190px;
    }

    .empRolesBtn > div {
        margin-top: 7px;
    }

    #editEmpRoleCom .el-dialog {
        background-image: url(http://localhost:8090/images/30.png);
        background-size: cover;
        background-repeat: no-repeat;
        /*padding: 10px;*/
        width: 338px;
    }
</style>