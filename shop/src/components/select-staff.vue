<template>
  <div class="select-staff" v-if="show">

    <div class="weui-search-bar__box">
      <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
      <input type="text" class="weui-search-bar__input" placeholder="搜索" v-model="searchText" />
      <div class="weui-icon-clear" v-if="searchText.length > 0" @click="clearSearchText">
        <icon type="clear" size="14"></icon>
      </div>
    </div>


    <div class="weui-cells weui-cells_after-title" v-if="checkboxItems.length">
      <div v-if="multiple">
        <div class="weui-cells weui-cells_after-title" >
          <checkbox-group @change="checkboxChange">
           <!-- <label class="weui-cell weui-check__label">
              <checkbox class="weui-check" :value="checkboxItems[0].value" :checked="checkboxItems[0].checked" />
              <div class="weui-cell__hd weui-check__hd_in-checkbox">
                <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!checkboxItems[0].checked"></icon>
                <icon class="weui-icon-checkbox_success" type="success" size="23" v-if="checkboxItems[0].checked"></icon>
              </div>
              <div class="weui-cell__bd">所有</div>
            </label> -->
            <!-- <template v-if="!checkboxItems[0].checked"> -->
              <label class="weui-cell weui-check__label" v-for="(item,index) in checkboxItems" :key="index" v-if="item.show">
                <checkbox class="weui-check" :value="item.value" :checked="item.checked" />
                <div class="weui-cell__hd weui-check__hd_in-checkbox">
                  <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!item.checked"></icon>
                  <icon class="weui-icon-checkbox_success" type="success" size="23" v-if="item.checked"></icon>
                </div>
                <div class="weui-cell__bd">{{item.name}}</div>
              </label>
            <!-- </template> -->
          </checkbox-group>
        </div>
      </div>
      <div v-else>
        <!-- <radio-group @change="radioChange">
          <label class="weui-cell weui-check__label" v-for="(item,index) in checkboxItems" :key="index" v-if="item.show">
            <radio class="weui-check" :value="item.value" :checked="item.checked" />
            <div class="weui-cell__bd">{{item.name}}</div>
            <div class="weui-cell__ft weui-cell__ft_in-radio" v-if="item.checked">
              <icon class="weui-icon-radio" type="success_no_circle" size="16"></icon>
            </div>
          </label>
        </radio-group> -->

        <radio-group @change="radioChange">
          <label class="weui-cell weui-check__label" v-for="(item,index) in checkboxItems" :key="index" v-if="item.show">
            <radio class="weui-check" :value="item.value" :checked="item.checked" />
            <div class="weui-cell__bd">{{item.name}}</div>
            <div class="weui-cell__ft weui-cell__ft_in-radio" v-if="item.checked">
              <icon class="weui-icon-radio" type="success_no_circle" size="16"></icon>
            </div>
          </label>
        </radio-group>
      </div>


    </div>

    <div v-if="noData" class="search-no-data">
      搜索无数据
    </div>


    <!-- <div class="sureBth">
      <button class="weui-btn" type="primary" @click="handleSelect">确认选择</button>
    </div> -->
    <div class="sureBth">
      <div class="weui-flex">
        <div class="weui-flex__item" style="padding-right: 10rpx;">
          <button class="weui-btn" type="default" @click="handleCancel" style="border: 1px solid #ccc;">取消选择</button>
        </div>
        <div class="weui-flex__item" style="padding-left: 10rpx;">
          <button class="weui-btn" type="primary" :disabled="noData" @click="handleSelect">确认选择</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post } from "../utils";
export default {
  computed: {
    noData(){
      return this.checkboxItems.every(item => {
        return item.show == false
      })
    }
  },
  mounted() {
    // this.copyItemsList = JSON.parse(JSON.stringify(this.checkboxItems))

  },
  props: {
    multiple: {
      default: false
    },
    visible: {
      default: false
    },
    hasSelect: {
      default: []
    }
  },
  data() {
    return {
      searchText: '',
      checkboxItems: [
        // { name: '1', value: '1', checked: false, show: true},
        // { name: '2', value: '2', checked: false, show: true},
        // { name: '3', value: '3', checked: false, show: true },
        // { name: '4', value: '4', checked: false, show: true },
        // { name: '44', value: '44', checked: false, show: true },
        // { name: '5', value: '5', checked: false, show: true },
        // { name: '55', value: '55', checked: false, show: true },
        // { name: '6', value: '6', checked: false, show: true },
        // { name: '66', value: '66', checked: false, show: true }
      ],
      hasSearchTextSelect: '',
      noSearchTextSelect: '',
      show: false
      // copyItemsList: []
    };
  },
  watch:{
    visible(val){
      this.show = val
      if(this.show){
        this.getData``
      }
    },
    searchText(val){
      this.noSearchTextSelect = [ ...this.noSearchTextSelect , ...this.hasSearchTextSelect ]
      if(val){
        // console.info(val)
        // let result = this.checkboxItems.filter(item => {
        //   // console.info(item.name,item.name.indexOf(val)>-1)
        //   return item.name.indexOf(val) > -1
        // })
        // console.info(result)
        // this.checkboxItems = result

        this.checkboxItems.forEach(item => {
          if(item.name.indexOf(val)>-1){
            item.show = true
          }else{
            item.show = false
          }
        })
      }else{


        this.checkboxItems.forEach(item => {
          item.show = true
        })
        this.noSearchTextSelect.forEach(item => {
          this.checkboxItems.forEach(it => {
            if(it.value == item){
               it.checked = true
            }
          })
        })

        // this.checkboxItems = this.copyItemsList
      }
    }
  },
  created() {

  },
  components: {},
  methods: {
    handleCancel(){
      this.show = false
      this.$emit("update:visible", false)
    },
    clearSearchText(){
      this.searchText = ''
    },
    handleSelect(){
      let data = this.checkboxItems.filter(item => {
        return item.checked
      })
      this.$emit('selectStaff', data)
      this.searchText = ''
      this.show = false
      this.$emit("update:visible", false)
    },
    async getData(){
      const data = await post(`/employee/queryEmpOfShop?shopNo=${this.$store.state.userInfo.shopEmployee.shopNo}`);
      // console.info(data)
      if(data.success){
        let d = JSON.parse(JSON.stringify(data.result))
        d.forEach(item => {
          item.show = true
          item.checked = false
          item.value = item.id
        })
        this.checkboxItems = JSON.parse(JSON.stringify(d))
        this.hasSelect.forEach(item => {
          this.checkboxItems.forEach(it => {
            if(it.id == item.id){
              it.checked = true
            }
          })
        })
        this.hasSearchTextSelect = this.hasSelect.map(item => {
          return item.id
        })
      }
    },
    bindShopChange(e) {
      this.shopIndex = e.mp.detail.value;
      this.shopNo = this.shopList[this.shopIndex].shopNo
    },

    radioChange(e) {
      console.log('radio发生change事件，携带value值为：' + e.mp.detail.value);
      let checkboxItems = this.checkboxItems;
      for (let i = 0; i < checkboxItems.length; ++i) {
        checkboxItems[i].checked = checkboxItems[i].value == e.mp.detail.value;
      }
      this.checkboxItems = checkboxItems;
    },

    checkboxChange(e) {
      console.log('checkbox发生change事件，携带value值为：' + e.mp.detail.value);
      if(this.searchText){
        this.hasSearchTextSelect = e.mp.detail.value
      }else{
        this.noSearchTextSelect = e.mp.detail.value
      }
      var checkboxItems = this.checkboxItems;
      var values = e.mp.detail.value;
      for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
        checkboxItems[i].checked = false;
        for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
          if (String(checkboxItems[i].value) == String(values[j])) {
            checkboxItems[i].checked = true;
            break;
          }
        }
      }
      this.checkboxItems = checkboxItems;
    }
  }
};
</script>

<style lang='scss' scoped>
  .select-staff{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    background-color: #fff;
    padding-bottom: 120rpx;
    .sureBth{
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 20rpx;
      background-color: #fff;
      border-top: 1px solid #ccc;
    }
  }
  .search-no-data{
    text-align: center;
    padding: 50rpx 0;
  }
</style>
