<template>
    <div id="loginView">
        <div class="bg-banner"></div>
        <div id="loginForm">
            <div class="login-banner"></div>
            <el-form label-position="right" ref="user" :rules="rules" label-width="80px" status-icon
                     :model="user" class="login-form">
                <div class="title-container">
                    <h3 class="title">哥谭市欢乐购后台管理</h3>
                </div>
                <el-form-item prop="username">
                    <el-input v-model="user.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="user.password" placeholder="密码" type="password"></el-input>
                </el-form-item>
                <el-form-item style="margin-bottom: 13px;">
                    <el-checkbox-group v-model="user.remember">
                        <el-checkbox label="记住我" name="remember"></el-checkbox>
                        <el-button type="text" style="margin-left: 190px;">忘记密码</el-button>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item>
                    <el-button style="width: 100%" type="primary" @click="submitForm('user')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "loginView",
        data() {
            return {
                // 表单数据对象
                user: {
                    username: "",
                    password: "",
                    remember: false,
                },
                // 验证
                rules: {
                    username: [
                        {required: true, message: '用户名不能为空'},
                    ],
                    password: [
                        {required: true, message: '密码不能为空'}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    // 满足条件提交
                    if (valid) {
                        let forData = new FormData();
                        Object.keys(this.user).forEach((key) => {
                            forData.append(key, this.user[key]);
                        });
                        this.$axios.post('loginAuthentication.action', forData).then((result) => {
                            // 登录验证成功 用户密码正确
                            if (result.data !== '') {
                                // 是否选中了记住我
                                if (this.user.remember) {
                                    // JSON.stringify() 将对象转为字符串
                                    // JSON.parse() 将字符串转为对象
                                    // 如果选中了 将用户数据储存到localStorage中
                                    localStorage.setItem('empUser', JSON.stringify(result.data));
                                    // 再将用户数据储存到sessionStorage中
                                    sessionStorage.setItem('empUser', JSON.stringify(result.data));
                                } else {
                                    // 没选中 将用户数据储存到sessionStorage中
                                    sessionStorage.setItem('empUser', JSON.stringify(result.data));
                                    // 再将localStorage的用户数据删除
                                    localStorage.removeItem('empUser');
                                }

                                // 登录成功显示后台页面
                                this.$store.commit("setBool", true);
                                this.$message({type: "success", message: "登录成功"});
                            } else {
                                // 登录验证失败
                                // 提示错误消息
                                this.$message.error("账号或密码错误");
                            }
                        });
                    }
                });
            },
            setEmpUser() {
                if (localStorage.getItem("empUser")) {
                    this.user.username = JSON.parse(localStorage.getItem("empUser")).username;
                    this.user.password = JSON.parse(localStorage.getItem("empUser")).password;
                    this.user.remember = true;
                }
            }
        },
        created() {
            this.setEmpUser();
        }
    }
</script>

<style scoped>
    .bg-banner {
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: 50%;
        background-image: url("../assets/59.png");
    }

    #loginForm {
        width: 750px;
        height: 406.83px;
        border-radius: 10px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        background: #ffffffdb;
        box-shadow: 0 0 5px #999;
        display: flex;
        overflow: hidden;
    }

    .login-banner {
        width: 300px;
        height: 100%;
        background-image: url(../assets/57.png);
        background-size: cover;
        background-position: 50%;
    }

    #loginForm .login-form {
        width: 400px;
        padding: 50px 35px 30px 0px;
        overflow: hidden;
    }

    #loginForm .login-form .title-container {
        position: relative;
    }

    #loginForm .login-form .title-container .title {
        font-size: 22px;
        color: #666;
        margin: 0 auto 30px 128px;
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>