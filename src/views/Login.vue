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
                    username: '',
                    password: '',
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
                        console.log(valid)
                        console.log(this.user)
                    }
                });
            }
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
        background-image: url("../assets/56.png");
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
        background-image: url(../assets/51.png);
        background-size: cover;
        background-position: 50%;
    }

    #loginForm .login-form{
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