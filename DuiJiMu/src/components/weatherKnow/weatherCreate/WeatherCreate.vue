<template>
  <div class="weather_create"@click.self="closeSelect">
    <div class="area_box">
        <p v-for="area in areas" @click="chooseArea(area.val)" v-show="area.choose">{{area.name}}</p>
        <i @click="selectMethod">{{selectIcon}}</i>
    </div>
    <div class="gender_info">{{genderInfo}}</div>
    <div class="gender_box">
        <i v-for="gender in genders" @click="chooseGender(gender.val)" :class="{'genderselect':gender.genderselected}"/>
    </div>
    <div class="height_info">{{heightInfo}}</div>
    <div class="height_box">
        <div class="start_height">160CM</div>
        <div class="choose_height">
          <i class="choose_icon" v-drag="heightTip"></i>
        </div>
        <div class="end_height">190CM</div>
    </div>
    <div class="weight_info">{{weightInfo}}</div>
    <div class="weight_box">
      <div class="start_weight">50KG</div>
      <div class="choose_weight">
        <i class="choose_icon" v-drag="weightTip"></i>
      </div>
      <div class="end_weight">80KG</div>
    </div>
    <div class="cloth_info">我现在穿了哪些衣服</div>
    <ul class="cloth_select">
      <li v-for="cloth in cloths" @click="chooseCloth(cloth.val)" :class="{'clothselect':cloth.clothselect}" >{{cloth.name}}</li>
    </ul>
    <button class="public_weather" @click="publicWeather">发布我的天气</button>
    <div class="public_shadow" v-show="ispublic"></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      weatherInfo: {
        weatherTime: '',
        areaSelect: 'dc',
        genderSelect: '',
        heightSelect: 160,
        weightSelect: 50,
        cloths: [ ]
      },
      ispublic: false,
      areas: [
        {name: '我正在东城区', val: 'dc', choose: true},
        {name: '我正在西城区', val: 'xc', choose: false},
        {name: '我正在朝阳区', val: 'cy', choose: false},
        {name: '我正在丰台区', val: 'ft', choose: false},
        {name: '我正在石景山区', val: 'sjs', choose: false},
        {name: '我正在海淀区', val: 'hd', choose: false}
      ],
      isSelectShow: false,
      selectIcon: '▼',
      genders: [
        {val: 'boy', genderselected: false},
        {val: 'girl', genderselected: false},
        {val: 'man', genderselected: false},
        {val: 'women', genderselected: false}
      ],
      genderInfo: '请从以下4个图中选择符合自己性别、年龄的头像',
      heightInfo: '请滑动选择身高',
      weightInfo: '请滑动选择体重',
      cloths: [
        {name: '短袖', val: 'shortSleeve', clothselect: false},
        {name: '长袖', val: 'longSleeve', clothselect: false},
        {name: '短裤', val: 'shorts', clothselect: false},
        {name: '长裤', val: 'trousers', clothselect: false},
        {name: '裙子', val: 'skirt', clothselect: false},
        {name: '毛衣', val: 'Sweater', clothselect: false},
        {name: '羽绒服', val: 'downJacket', clothselect: false},
        {name: '帽子', val: 'hat', clothselect: false}
      ]
    }
  },
  methods: {
    showSelect () {
      for (let i = 0; i < this.areas.length; i++) {
        this.areas[i].choose = true
      }
      this.selectIcon = '▲'
      this.isSelectShow = true
    },
    closeSelect () {
      for (let i = 0; i < this.areas.length; i++) {
        if (this.areas[i].val === this.weatherInfo.areaSelect) {
          this.areas[i].choose = true
        } else {
          this.areas[i].choose = false
        }
      }
      this.selectIcon = '▼'
      this.isSelectShow = false
    },
    selectMethod () {
      if (!this.isSelectShow) {
        this.showSelect()
      } else {
        this.closeSelect()
      }
    },
    chooseArea (val) {
      if (this.isSelectShow === false) {
        this.showSelect()
      } else {
        this.weatherInfo.areaSelect = val
        this.closeSelect()
      }
    },
    chooseGender (val) {
      for (let i = 0; i < this.genders.length; i++) {
        if (val === this.genders[i].val) {
          this.genders[i].genderselected = true
          this.weatherInfo.genderSelect = val
          switch (val) {
            case 'boy':
              this.genderInfo = '我是一个年龄在16岁到36岁之间的男孩'
              break
            case 'girl':
              this.genderInfo = '我是一个年龄在16岁到36岁之间的女孩'
              break
            case 'man':
              this.genderInfo = '我是一个年龄在36岁到56岁之间的男士'
              break
            case 'women':
              this.genderInfo = '我是一个年龄在36岁到56岁之间的女士'
              break
          }
        } else {
          this.genders[i].genderselected = false
        }
      }
    },
    heightTip (pram) {
      var height = parseInt(160 + (pram / 6))
      this.weatherInfo.heightSelect = height
      this.heightInfo = '我的身高是' + height + 'CM'
    },
    weightTip (pram) {
      var weight = parseInt(50 + (pram / 6))
      this.weatherInfo.weightSelect = weight
      this.weightInfo = '我的体重是' + weight + 'KG'
    },
    chooseCloth (val) {
      for (let i = 0; i < this.cloths.length; i++) {
        if (val === this.cloths[i].val) {
          if (this.cloths[i].clothselect) {
            this.cloths[i].clothselect = false
          } else {
            this.cloths[i].clothselect = true
          }
        }
      }
      this.weatherInfo.cloths = []
      for (let i = 0; i < this.cloths.length; i++) {
        if (this.cloths[i].clothselect) {
          this.weatherInfo.cloths.push(val)
        }
      }
    },
    publicWeather () {
      if (this.weatherInfo.areaSelect && this.weatherInfo.genderSelect && this.weatherInfo.heightSelect && this.weatherInfo.weightSelect && (this.weatherInfo.cloths.length > 0)) {
        this.ispublic = true
        var date = new Date()
        var time = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日' + date.getHours() + '时'
        this.weatherInfo.weatherTime = time

        axios.post('/api/weathercreate', this.weatherInfo)
          .then(function (response) {

          })
          .catch(function (error) {
          })
      }
    }
  },
  directives: {
    'drag': {
      bind (el, binding) {
        var heightBtn = el
        heightBtn.addEventListener('touchstart', function (event) {
          var touch = event.targetTouches[0]
          var oldX = touch.clientX
          var oldOffsetleft = heightBtn.offsetLeft
          document.addEventListener('touchmove', function (event) {
            var touch = event.targetTouches[0]
            var newX = touch.clientX
            var finalX = (newX - oldX >= 0) ? (newX - oldX) : (oldX - newX)
            var newOffsetleft = heightBtn.offsetLeft
            if (newOffsetleft >= 0 && newOffsetleft <= 174) {
              if (newX - oldX >= 0) {
                heightBtn.style.left = oldOffsetleft + finalX + 'px'
              } else {
                heightBtn.style.left = oldOffsetleft - finalX + 'px'
              }
              if (newOffsetleft === 174) {
                newOffsetleft = 180
              }
              binding.value(newOffsetleft)
            }
          })
          document.addEventListener('touchend', function (e) {
            document.removeEventListener('touchmove')
            document.removeEventListener('touchend')
          })
        })
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @mixin boxPosition{
    position: absolute;
    left:50%;
    -webkit-tap-highlight-color: transparent;
  }
  @mixin prefix($property, $value){
    -webkit-#{$property}:$value;
    -moz-#{$property}:$value;
    -o-#{$property}:$value;
    #{$property}:$value;
  }
  @mixin shadow($value){
    @include prefix(box-shadow,$value)
  }
  .weather_create{
    position: fixed;
    width: 100%;
    height: 100%;
    background: -webkit-linear-gradient(#D1EEEE, #00C5CD);
    background: -o-linear-gradient(#D1EEEE, #00C5CD);
    background: -moz-linear-gradient(#D1EEEE, #00C5CD);
    background: linear-gradient(#D1EEEE, #00C5CD);
    overflow: auto;
    -webkit-tap-highlight-color: transparent;
  }
  .weather_create .area_box{
    @include boxPosition();
    top:30px;
    margin-left:-130px;
    z-index: 2;
    border-radius: 6px;
    @include shadow(3px 3px 3px #888);
  }
  .weather_create .area_box p{
    width: 240px;
    height: 40px;
    text-align: left;
    line-height: 40px;
    border:4px solid #fff;
    background: #3498db;
    color:#fff;
    padding-left: 20px;
    border-radius: 6px;
    -webkit-tap-highlight-color: transparent;
  }
  .weather_create .area_box i{
    position: absolute;
    top:16px;
    font-size: 20px;
    right:20px;
    color:#fff;
    -webkit-tap-highlight-color: transparent;
  }
  .weather_create .gender_info{
    @include boxPosition();
    top:96px;
    width: 346px;
    height:20px;
    text-align: center;
    line-height: 20px;
    font-size: 14px;
    color:#FF00FF;
    margin-left: -173px;
  }
  .weather_create .gender_box{
    @include boxPosition();
    display: flex;
    top:120px;
    margin-left:-106px;
  }
  .weather_create .gender_box i{
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 50%;
    border:4px solid #fff;
    margin-right: 10px;
    @include shadow(3px 3px 3px #888);
  }
  .weather_create .gender_box .genderselect{
    border:4px solid #FF8C00;
  }
  .weather_create .gender_box i:nth-child(1){
    background: url('source/gender1.png') no-repeat center center;
    background-size: contain;
    background-color:#7ce9e6;
  }
  .weather_create .gender_box i:nth-child(2){
    background: url('source/gender2.png') no-repeat center center;
    background-size: contain;
    background-color:#eaabfc;
  }
  .weather_create .gender_box i:nth-child(3){
    background: url('source/gender3.png') no-repeat center center;
    background-size: contain;
    background-color:#b1f564;
  }
  .weather_create .gender_box i:nth-child(4){
    background: url('source/gender4.png') no-repeat center center;
    background-size: contain;
    background-color:#d4cabe;
  }
  .weather_create .height_info{
    @include boxPosition();
    top:186px;
    width: 346px;
    height:20px;
    text-align: center;
    line-height: 20px;
    font-size: 14px;
    color:#FF00FF;
    margin-left: -173px;
  }
  .weather_create .height_box{
    @include boxPosition();
    top:210px;
    margin-left:-140px;
    display: flex;
  }
  .weather_create .height_box .start_height, .weather_create .height_box .end_height{
    width:50px;
    height:24px;
    text-align: center;
    line-height: 24px;
    color:#fff;
    font-size: 14px;
  }
  .weather_create .height_box .choose_height{
    width:180px;
    height:24px;
    background: #FF8C00;
    border-radius: 3px;
    position: relative;
    @include shadow(3px 3px 3px #888);
  }
  .weather_create .height_box .choose_icon{
    width:6px;
    height:28px;
    position: absolute;
    top:0;
    left: 0;
    background: #fff;
    border: 2px dashed #FF8C00;
  }
  .weather_create .weight_info{
    @include boxPosition();
    top:260px;
    width: 346px;
    height:20px;
    text-align: center;
    line-height: 20px;
    font-size: 14px;
    color:#FF00FF;
    margin-left: -173px;
  }
  .weather_create .weight_box{
    @include boxPosition();
    top:280px;
    margin-left:-140px;
    display: flex;
  }
  .weather_create .weight_box .start_weight, .weather_create .weight_box .end_weight{
    width:50px;
    height:24px;
    text-align: center;
    line-height: 24px;
    color:#fff;
    font-size: 14px;
  }
  .weather_create .weight_box .choose_weight{
    width:180px;
    height:24px;
    background: #B3EE3A;
    border-radius: 3px;
    position: relative;
    @include shadow(3px 3px 3px #888);
  }
  .weather_create .weight_box .choose_icon{
    width:6px;
    height:28px;
    position: absolute;
    top:0;
    left: 0;
    background: #fff;
    border: 2px dashed #B3EE3A;
  }
  .weather_create .cloth_info{
    @include boxPosition();
    top:330px;
    width: 346px;
    height:20px;
    text-align: center;
    line-height: 20px;
    font-size: 14px;
    color:#FF00FF;
    margin-left: -173px;
  }
  .weather_create .cloth_select{
    @include boxPosition();
    top:360px;
    margin-left:-180px;
    display: flex;
    list-style: none;
  }
  .weather_create .cloth_select li{
    width:40px;
    height:30px;
    text-align: center;
    line-height: 30px;
    border-radius: 10px;
    background: #66CDAA;
    font-size: 12px;
    margin-left:5px;
    color: #fff;
    @include shadow(3px 3px 3px #888);
  }
  .weather_create .cloth_select .clothselect{
    background: #EE4000;
  }
  .weather_create .public_weather{
    @include boxPosition();
    top:430px;
    width: 180px;
    height:60px;
    text-align: center;
    line-height: 60px;
    font-size: 20px;
    color:#fff;
    background: #8EE5EE;
    margin-left: -90px;
    border-radius: 50%;
    @include shadow(2px 2px 2px #888);
  }
  .weather_create .public_shadow{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height: 100%;
    background: 0;
    z-index: 10;
  }
</style>
