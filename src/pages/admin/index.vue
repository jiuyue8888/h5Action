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
    import cookies from 'js-cookie'
    export default{
        name: "done",

        data(){
            return {
                name:'admin',
                password:'123456'
            }

        },
        mounted(){

        },
        methods: {
            loginBtn(){
                if(this.password==''){
                    this.$message('请输入密码');
                    return;
                }
                if(this.name==''){
                    this.$message('请输入用户名');
                    return;
                }
                login({
                    password:this.password,
                    username:this.name
                }).then(res=>{
                    if(res.code==200){
                        this.$router.push('/list');
                        var inFifteenMinutes = new Date(new Date().getTime() + 10 * 60 * 1000);
                        cookies.set('login','1',{expires:inFifteenMinutes})
                    }else{
                        this.$message(res.message)
                    }

                })


            }
        },

    }
</script>


<style lang="less">
    @import "./index.less";
</style>
