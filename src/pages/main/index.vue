<template>
    <div class="main">
        <div class="page swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide swiper-no-swiping">
                    <img src="../../assets/p1.jpg">
                    <div class="btn1" @click="goPage(1)"><img src="../../assets/up.png"></div>
                </div>
                <div class="swiper-slide swiper-no-swiping">
                    <img src="../../assets/p2.jpg">
                    <div class="btn2" @click="goPage(2)">点击进入</div>
                </div>
                <div class="swiper-slide swiper-no-swiping">
                    <img src="../../assets/p3.jpg">
                    <div class="info">
                        <h3>基本信息</h3>
                        <div>
                            <span>姓&nbsp;&nbsp;&nbsp;&nbsp;名</span>
                            <el-input v-model="username" maxlength="4" size="small"></el-input>
                        </div>
                        <div class="lable2">

                            <span>性&nbsp;&nbsp;&nbsp;&nbsp;别</span>
                            <span><em :class="sex==1?'curr':''" @click="sex=1">男</em> /
                                    <em :class="sex==0?'curr':''" @click="sex=0">女</em></span>

                            <span>年&nbsp;&nbsp;&nbsp;&nbsp;龄</span>
                            <el-input v-model="age" type="number"></el-input>

                        </div>
                        <div>
                            <span>手&nbsp;&nbsp;&nbsp;&nbsp;机</span>
                            <el-input v-model="mobile" maxlength="11" type="number"></el-input>
                        </div>
                        <div id="picker_city">
                            <span>居住城市</span>
                            <div class="select province">
                                <span>{{province}}</span>
                            </div>
                            <div class="select city">
                                <span>{{city}}</span>
                            </div>
                        </div>
                        <div class="lable5">
                            <span>意向车型</span>
                            <div class="select">
                                <select v-model="lovecar">
                                    <option
                                            v-for="(item,id) in cars"
                                            :key="id"
                                            :label="item"
                                            :value="item">
                                    </option>
                                </select>
                            </div>

                        </div>
                    </div>
                    <div class="btn2" @click="goPage(3)">下一步</div>
                </div>
                <div class="swiper-slide swiper-no-swiping">
                    <img src="../../assets/p3.jpg">
                    <div class="info1">
                        <h4>选择照片，并留下您的话语</h4>
                        <el-input v-model="words" type="textarea" placeholder="我的话语..."></el-input>
                        <div class="imgParent"></div>
                        <div class="btn" @click="submitHandle">确认提交</div>
                        <div class="btn2 prev" @click="goPage(2)">上一页</div>
                    </div>

                </div>
                <div class="swiper-slide swiper-no-swiping">
                    <img src="../../assets/p3.jpg">
                    <div class="info1">
                        <h4>请查收您的专属"新名片",与更多人分享吧!</h4>
                        <div class="share">
                            <img src="../../assets/p3.jpg">
                        </div>
                        <p>
                            <span @click="goPage(3)">上一页</span>
                            <span>分&nbsp;&nbsp;享</span>
                        </p>
                    </div>
                    <div class="btn1" @click="goPage(5)"><img src="../../assets/up.png"></div>
                </div>
                <div class="swiper-slide swiper-no-swiping">
                    <img src="../../assets/p5.jpg">
                </div>
            </div>

        </div>


        <div :class="part==3?'img swiper-container animated fadeIn':'img swiper-container'" :style="part==3?'left:0':'left:200%'">
            <div class="swiper-wrapper">
                <div class="swiper-slide"><img src="../../assets/1.jpg"></div>
                <div class="swiper-slide"><img src="../../assets/2.jpg"></div>
                <div class="swiper-slide"><img src="../../assets/3.jpg"></div>
                <div class="swiper-slide"><img src="../../assets/4.jpg"></div>
                <div class="swiper-slide"><img src="../../assets/5.jpg"></div>
            </div>
        </div>


    </div>
</template>

<script>
    import Swiper from 'swiper';
    import 'swiper/swiper.less';
    import city from '../../city';
    import Picker from '../../picker.min';
    import {carSave} from '@/server/index.js';

    export default{
        name: "done",

        data(){
            return {
                sp: null,
                imgSwiper: null,
                cars: ['观致5S', '观致7', 'MILESTONE'],
                part: 0,
                lovecar: '观致5S',//意向车型
                province: "省",//省
                city: "市",//市
                mobile: "",//手机号
                sex: 0,//性别
                age: '',//年龄
                username: "",//姓名
                words: "",//信息
                piccode: "1",//图片索引

                /*
                 createId: "",
                 createTime: "",
                 createUser: "string",
                 id: 0,
                 isDeleted: true,
                 sharepic: "string",
                 updateId: "string",
                 updateTime: "2020-09-23T07:42:36.417Z",
                 updateUser: "string",
                 */
            }

        },
        mounted(){
            var _this = this;
            this.sp = new Swiper('.page', {
                slidesPerView: 1,
                direction: 'vertical',
                loop: false,
                autoplay: false,
            })
            this.imgSwiper = new Swiper('.img', {
                slidesPerView: 1,
                loop: true,
                on: {
                    slideChangeTransitionEnd: function(){
                        //console.log(this);//切换结束时，告诉我现在是第几个slide
                        _this.piccode = this.realIndex+1
                    },
                },
                autoplay: false
            })

            var nameEl = document.getElementById('picker_city');
            var first = [];
            /* 省，直辖市 */
            var second = [];
            /* 市 */
            var third = [];
            /* 镇 */
            var selectedIndex = [0, 0, 0];
            /* 默认选中的地区 */
            var checked = [0, 0, 0];
            /* 已选选项 */
            function creatList(obj, list) {
                obj.forEach(function (item, index, arr) {
                    var temp = new Object();
                    temp.text = item.name;
                    temp.value = index;
                    list.push(temp);
                })
            }

            creatList(city, first);

            if (city[selectedIndex[0]].hasOwnProperty('sub')) {
                creatList(city[selectedIndex[0]].sub, second);
            } else {
                second = [{text: '', value: 0}];
            }

            /*if (city[selectedIndex[0]].sub[selectedIndex[1]].hasOwnProperty('sub')) {
             creatList(city[selectedIndex[0]].sub[selectedIndex[1]].sub, third);
             } else {
             third = [{ text: '', value: 0 }];
             }*/

            var picker = new Picker({
                data: [first, second],
                selectedIndex: selectedIndex,
                title: '地址选择'
            });

            picker.on('picker.select', function (selectedVal, selectedIndex) {
                var text1 = first[selectedIndex[0]].text;
                var text2 = second[selectedIndex[1]].text;
                var text3 = third[selectedIndex[2]] ? third[selectedIndex[2]].text : '';
                _this.province = text1;
                _this.city = text2;
                //nameEl.innerText = text1 + ' ' + text2 + ' ' + text3;
            });

            picker.on('picker.change', function (index, selectedIndex) {
                if (index === 0) {
                    firstChange();
                } else if (index === 1) {
                    secondChange();
                }

                function firstChange() {
                    second = [];
                    third = [];
                    checked[0] = selectedIndex;
                    var firstCity = city[selectedIndex];
                    if (firstCity.hasOwnProperty('sub')) {
                        creatList(firstCity.sub, second);

                        var secondCity = city[selectedIndex].sub[0]
                        if (secondCity.hasOwnProperty('sub')) {
                            creatList(secondCity.sub, third);
                        } else {
                            third = [{text: '', value: 0}];
                            checked[2] = 0;
                        }
                    } else {
                        second = [{text: '', value: 0}];
                        third = [{text: '', value: 0}];
                        checked[1] = 0;
                        checked[2] = 0;
                    }

                    picker.refillColumn(1, second);
                    //picker.refillColumn(2, third);
                    picker.scrollColumn(1, 0)
                    //picker.scrollColumn(2, 0)
                }

                function secondChange() {
                    third = [];
                    checked[1] = selectedIndex;
                    var first_index = checked[0];
                    if (city[first_index].sub[selectedIndex].hasOwnProperty('sub')) {
                        var secondCity = city[first_index].sub[selectedIndex];
                        creatList(secondCity.sub, third);
                        picker.refillColumn(2, third);
                        picker.scrollColumn(2, 0)
                    } else {
                        third = [{text: '', value: 0}];
                        checked[2] = 0;
                        picker.refillColumn(2, third);
                        picker.scrollColumn(2, 0)
                    }
                }

            });

            picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
                var province = city[selectedIndex[0]];
                var cityName = province.sub[selectedIndex[1]];
                var area = cityName.sub !== undefined ? cityName.sub[selectedIndex[2]].name : '';


            });

            nameEl.addEventListener('click', function () {
                picker.show();
            });
        },
        methods: {
            goPage(n){

                this.part = n;
                if (n == 3) {

                    this.sp.slideTo(n)
                } else {
                    this.sp.slideTo(n)
                }

            },
            submitHandle(){
                this.sp.slideTo(4)
                this.part = 4;
                carSave({
                    lovecar: this.lovecar,//意向车型
                    province: this.province,//省
                    city: this.city,//市
                    mobile: this.mobile,//手机号
                    sex: this.sex,//性别
                    age: this.age,//年龄
                    username: this.username,//姓名
                    words: this.words,//信息
                    piccode: this.piccode,//图片索引
                }).then(res=>{

                })
            }
        },

    }
</script>


<style lang="less">
    @import "./index.less";
</style>
