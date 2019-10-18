<template>
  <div class="publish_task_create">
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cells weui-cells_after-title" v-if="checkboxItems.length">
        <checkbox-group @change="checkboxChange">
         <label class="weui-cell weui-check__label">
            <checkbox class="weui-check" :value="checkboxItems[0].value" :checked="checkboxItems[0].checked" />
            <div class="weui-cell__hd weui-check__hd_in-checkbox">
              <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!checkboxItems[0].checked"></icon>
              <icon class="weui-icon-checkbox_success" type="success" size="23" v-if="checkboxItems[0].checked"></icon>
            </div>
            <div class="weui-cell__bd">所有</div>
          </label>
          <template v-if="!checkboxItems[0].checked">
            <label class="weui-cell weui-check__label" v-if="item.name!='所有'" v-for="(item,index) in checkboxItems" :key="index">
              <checkbox class="weui-check" :value="item.value" :checked="item.checked" />
              <div class="weui-cell__hd weui-check__hd_in-checkbox">
                <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!item.checked"></icon>
                <icon class="weui-icon-checkbox_success" type="success" size="23" v-if="item.checked"></icon>
              </div>
              <div class="weui-cell__bd">{{item.name}}</div>
            </label>
          </template>
        </checkbox-group>
      </div>
    </div>
    <div class="sureBth">
      <button class="weui-btn" type="primary" @click="handleSelect">确认选择</button>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post } from "../../utils";
import { mapState, mapMutations } from "vuex";
export default {
  onShow() {
  },
  computed: {
    // ...mapState(["cityName"])
  },
  mounted() {
    // this.getData();
    const data = post(`/agency/employ/queryEmploys?agencyId=${this.$store.state.userInfo.agencyId}`).then((data)=>{
      if(data.success){
        let result = JSON.parse(JSON.stringify(data.result))
        result.forEach(item => {
          item.checked = false
          item.value = item.id
        })
        result.unshift({ name: '所有', value: 'ALL', checked: false })
        this.checkboxItems = result
        console.info('this.checkboxItems',this.checkboxItems)
      }
    });
  },
  data() {
    return {
      checkboxItems: [
        // { name: 'standard is dealt for u.', value: '0', checked: true },
        // { name: 'standard is dealicient for u.', value: '1', checked: false }
      ]
    };
  },
  components: {},
  methods: {
    handleSelect(){
      let ids = this.checkboxItems.map(item => {
         return item.value
      })
      console.info(ids)
      wx.navigateTo({
        url: `/pages/adminPublishTaskCreate/main?id=${ids.join(',')}`
      })
    },
    checkboxChange(e) {
      console.log('checkbox发生change事件，携带value值为：' + e.mp.detail.value);
      var checkboxItems = this.checkboxItems;
      var values = e.mp.detail.value;
      for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
        checkboxItems[i].checked = false;
        for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
          if (String(checkboxItems[i].value) === String(values[j])) {
            checkboxItems[i].checked = true;
            break;
          }
        }
      }
      this.checkboxItems = checkboxItems;
    },
    // bindTimeChange(e) {
    //   this.time = e.mp.detail.value;
    //   console.log(e.mp.detail.value);
    // },
    // ...mapMutations(["update"]),
    // async getData() {
    //   const data = await get("/index/index");
    //   this.banner = data.banner;
    // },
    // topicdetail(id) {
    //   wx.navigateTo({
    //     url: "/pages/topicdetail/main?id=" + id
    //   });
    // },
  },
  created() {

  }
};
</script>

<style lang='scss' scoped>
  @import "./style.scss";
</style>
