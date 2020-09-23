<template>
    <div class="admin">
        <div class="list">
            <el-button type="success" @click="exportMess">导出到excel</el-button>
            <div class="table">
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column prop="username" label="姓名"></el-table-column>
                    <el-table-column prop="sex" label="性别"></el-table-column>
                    <el-table-column prop="age" label="年龄"></el-table-column>
                    <el-table-column prop="mobile" label="手机号"></el-table-column>
                    <el-table-column label="地址">
                        <template slot-scope="scope">{{ scope.row.province+','+ scope.row.city}}</template>
                    </el-table-column>

                    <el-table-column prop="lovecar" label="意向车型"></el-table-column>
                    <el-table-column prop="createTime" label="创建时间"></el-table-column>
                    <el-table-column prop="words" label="备注" width="180"></el-table-column>

                </el-table>
            </div>

        </div>
    </div>
</template>

<script>

    import {login} from '@/server/index.js';

    export default{
        name: "done",

        data(){
            return {
                tableData: [{
                    createTime: '2016-05-02',
                    lovecar: '观致5S',//意向车型
                    province: "省",//省
                    city: "市",//市
                    mobile: "123",//手机号
                    sex: 0,//性别
                    age: '122',//年龄
                    username: "姓名",//姓名
                    words: "信息",//信息
                    piccode: "1",//图片索引
                },{
                    createTime: '2016-05-02',
                    lovecar: '观致5S',//意向车型
                    province: "省",//省
                    city: "市",//市
                    mobile: "123",//手机号
                    sex: 0,//性别
                    age: '122',//年龄
                    username: "姓名",//姓名
                    words: "信息",//信息
                    piccode: "1",//图片索引
                },{
                    createTime: '2016-05-02',
                    lovecar: '观致5S',//意向车型
                    province: "省",//省
                    city: "市",//市
                    mobile: "123",//手机号
                    sex: 0,//性别
                    age: '122',//年龄
                    username: "姓名",//姓名
                    words: "信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息",//信息
                    piccode: "1",//图片索引
                }]
            }

        },
        mounted(){

        },
        methods: {
            exportMess(){

            }
        },

    }
</script>


<style lang="less">
    @import "./index.less";
</style>
