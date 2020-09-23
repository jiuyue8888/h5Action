<template>
    <div class="admin">
        <div class="login">
            <el-card class="box-card">
                <h3>登陆</h3>
                <div class="suffix">
                    <span>用户名：</span>
                    <el-input
                            placeholder="请输入用户名"
                            suffix-icon="el-icon-user"
                            v-model="name">
                    </el-input>
                </div>
                <div class="suffix">
                    <span>密码：</span>
                    <el-input
                            placeholder="请输入密码"
                            type="password"
                            suffix-icon="el-icon-lock"
                            v-model="password">
                    </el-input>
                </div>
                <el-button type="primary" @click="loginBtn">登陆</el-button>
            </el-card>
        </div>

    </div>
</template>

<script>

    import {login} from '@/server/index.js';

    export default{
        name: "done",

        data(){
            return {
                name:'admin',
                password:'123'
            }

        },
        mounted(){

        },
        methods: {
            loginBtn(){
                login({
                    password:this.password,
                    usernmae:this.name
                }).then(res=>{

                })

                this.$router.push('/list');
            }
        },

    }
</script>


<style lang="less">
    @import "./index.less";
</style>
