<template>
    <div class="admin">
        <div class="list">
            <el-button type="success" @click="exportMess">导出到excel</el-button>
            <div class="table">
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column prop="username" label="姓名" width="80"></el-table-column>
                    <el-table-column prop="sex" label="性别" width="50"></el-table-column>
                    <el-table-column prop="age" label="年龄"></el-table-column>
                    <el-table-column prop="mobile" label="手机号"></el-table-column>
                    <el-table-column prop="add" label="地址"></el-table-column>

                    <el-table-column prop="lovecar" label="意向车型"></el-table-column>
                    <el-table-column prop="createTime" label="创建时间"></el-table-column>
                    <el-table-column prop="words" label="备注" width="180"></el-table-column>

                </el-table>
            </div>

        </div>
    </div>
</template>

<script>

    import {getCustomerList} from '@/server/index.js';
    import cookies from 'js-cookie';
    import export_json_to_excel from '@/vendor/Export2Excel'
    export default{
        name: "done",

        data(){
            return {
                tableData: []
            }

        },
        mounted(){
            const cook = cookies.get('login');

            if(cook!='1'){
                this.$router.push('/admin');
                return;
            }
            getCustomerList({}).then(res=>{
                if(res.code==200){
                    let arr = [];
                    res.data.map(item=>{
                        arr.push({
                            username:item.username,
                            sex:item.sex==0?'女':'男',
                            age:item.age,
                            mobile:item.mobile,
                            add:item.province+'省,'+ item.city+'市',
                            lovecar:item.lovecar,
                            createTime:item.createTime,
                            words:item.words,
                        })
                    })
                    this.tableData=arr;
                }else{
                    this.$message(res.message)
                }
            })

        },
        methods: {

            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            exportMess() {
                require.ensure([], () => {
                    const tHeader = ['姓名','性别','年龄','手机号','地址','意向车型','创建时间','备注'];
                    const filterVal = ['username', 'sex', 'age', 'mobile','add', 'lovecar', 'createTime', 'words'];
                    const list = this.tableData;
                    const data = this.formatJson(filterVal,list);
                    export_json_to_excel(tHeader, data, '报名列表');
                })
            },

        },

    }
</script>


<style lang="less">
    @import "./index.less";
</style>
