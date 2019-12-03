<template>
  <div class="page">
    <div class="page__bd" style="position: fixed; top: 0; left: 0; width: 100%; z-index: 10;">
      <div class="weui-search-bar">
        <div class="weui-search-bar__form">
          <div class="weui-search-bar__box">
            <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
            <input type="text" class="weui-search-bar__input" placeholder="搜索" v-model="inputVal" :focus="inputShowed" @input="inputTyping" />
            <div class="weui-icon-clear" v-if="inputVal.length > 0" @click="clearInput">
              <icon type="clear" size="14"></icon>
            </div>
          </div>
          <!-- <label class="weui-search-bar__label" :hidden="inputShowed" @click="showInput">
            <icon class="weui-icon-search" type="search" size="14"></icon>
            <div class="weui-search-bar__text">搜索</div>
          </label> -->
        </div>
        <!-- <div class="weui-search-bar__cancel-btn" :hidden="!inputShowed" @click="hideInput">取消</div> -->
      </div>
      <!-- <div class="weui-cells searchbar-result" v-if="inputVal.length > 0">
        <navigator url="/pages/my-score-action-detail/main" class="weui-cell" hover-class="weui-cell_active">
          <div class="weui-cell__bd">
            <div>实时搜索文本</div>
          </div>
        </navigator>
        <navigator url="/pages/my-score-action-detail/main" class="weui-cell" hover-class="weui-cell_active">
          <div class="weui-cell__bd">
            <div>实时搜索文本</div>
          </div>
        </navigator>
        <navigator url="/pages/my-score-action-detail/main" class="weui-cell" hover-class="weui-cell_active">
          <div class="weui-cell__bd">
            <div>实时搜索文本</div>
          </div>
        </navigator>
        <navigator url="/pages/my-score-action-detail/main" class="weui-cell" hover-class="weui-cell_active">
          <div class="weui-cell__bd">
            <div>实时搜索文本</div>
          </div>
        </navigator>
      </div> -->
    </div>

    <!-- <div class="weui-panel weui-panel_access no-t" style="margin-top: 0;">
      <div class="weui-panel__bd">

        <div class="weui-media-box weui-media-box_text" @click="handleDetail(1)">
          <div class="weui-media-box__title weui-media-box__title_in-text">
            李本山（<span style="color:#0BB20C;">奖励</span>）<span style="float:right; color: #ccc; font-size: 14px;">2019-10-21</span>
          </div>
          <div class="weui-media-box__desc">
            由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。
          </div>
        </div>

        <div class="weui-media-box weui-media-box_text">
          <div class="weui-media-box__title weui-media-box__title_in-text">
            李本山（<span style="color:#FF0000;">扣减</span>）<span style="float:right; color: #ccc; font-size: 14px;">2019-10-21</span>
          </div>
          <div class="weui-media-box__desc">
            不打扫卫生。
          </div>
        </div>

        <div class="weui-media-box weui-media-box_text">
          <div class="weui-media-box__title weui-media-box__title_in-text">
            李德华（<span style="color:#0BB20C;">奖励</span>）<span style="float:right; color: #ccc; font-size: 14px;">2019-10-21</span>
          </div>
          <div class="weui-media-box__desc">
            由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。
          </div>
        </div>

        <div class="weui-media-box weui-media-box_text">
          <div class="weui-media-box__title weui-media-box__title_in-text">
            李本山（<span style="color:#FF0000;">扣减</span>）<span style="float:right; color: #ccc; font-size: 14px;">2019-10-21</span>
          </div>
          <div class="weui-media-box__desc">
            不打扫卫生。
          </div>
        </div>

        <div class="weui-media-box weui-media-box_text">
          <div class="weui-media-box__title weui-media-box__title_in-text">
            李德华（<span style="color:#0BB20C;">奖励</span>）<span style="float:right; color: #ccc;">2019-10-21</span>
          </div>
          <div class="weui-media-box__desc">
            由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。
          </div>
        </div>

        <div class="weui-media-box weui-media-box_text">
          <div class="weui-media-box__title weui-media-box__title_in-text">
            李本山（<span style="color:#FF0000;">扣减</span>）<span style="float:right; color: #ccc; font-size: 14px;">2019-10-21</span>
          </div>
          <div class="weui-media-box__desc">
            不打扫卫生。
          </div>
        </div>

        <div class="weui-media-box weui-media-box_text">
          <div class="weui-media-box__title weui-media-box__title_in-text">
            李德华（<span style="color:#0BB20C;">奖励</span>）<span style="float:right; color: #ccc;">2019-10-21</span>
          </div>
          <div class="weui-media-box__desc">
            由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。
          </div>
        </div>

        <div class="weui-media-box weui-media-box_text">
          <div class="weui-media-box__title weui-media-box__title_in-text">
            李本山（<span style="color:#FF0000;">扣减</span>）<span style="float:right; color: #ccc;">2019-10-21</span>
          </div>
          <div class="weui-media-box__desc">
            不打扫卫生。
          </div>
        </div>

        <div class="weui-media-box weui-media-box_text">
          <div class="weui-media-box__title weui-media-box__title_in-text">
            李德华（<span style="color:#0BB20C;">奖励</span>）<span style="float:right; color: #ccc;">2019-10-21</span>
          </div>
          <div class="weui-media-box__desc">
            由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。
          </div>
        </div>

        <div class="weui-media-box weui-media-box_text">
          <div class="weui-media-box__title weui-media-box__title_in-text">
            李德华（<span style="color:#FF0000;">扣减</span>）<span style="float:right; color: #ccc;">2019-10-21</span>
          </div>
          <div class="weui-media-box__desc">
            不打扫卫生。
          </div>
        </div>

      </div>
    </div> -->


    <template v-if="list.length">
      <div class="weui-panel weui-panel_access no-t" style="margin-top: 0; padding-top: 46px;">
        <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_text" v-for="(item, index) in list" :key="index">
            <div class="weui-media-box__title weui-media-box__title_in-text">
              {{item.empName}}（<span style="color:#0BB20C;">{{item.rewardDesc}}</span>）<span style="float:right; color: #ccc;">{{item.date}}</span>
            </div>
            <div class="weui-media-box__desc">
              {{item.content}}
            </div>
          </div>
          <div style="padding-bottom: 10rpx; position: relative; top: -20px;" class="no-more" v-if="list.length >= totalCount">没有更多了</div>
        </div>
      </div>
    </template>
    <no-data v-else></no-data>


  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post, queryParams } from "../../utils";
// import { mapState, mapMutations } from "vuex";
export default {
  onShow() {
    this.getData()
  },
  components: {

  },
  data() {
    return {
      inputShowed: false,
      inputVal: '',

      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      list: [],
    }
  },

  watch: {
    inputVal(){
      this.getData()
    }
  },

  //上拉加载
  onReachBottom() {
    if(this.list.length < this.totalCount) {
      this.getData(true)
    }
  },
  // 下拉刷新
  onPullDownRefresh () {
    wx.stopPullDownRefresh()
    this.getData()
  },

  methods: {

    async getData(append) {
      if(append){
        this.currentPage++
      }else{
        this.currentPage = 1
      }
      let params = {
        "currentPage": this.currentPage,
        "pageSize": this.pageSize,
        "empNo": this.$store.state.userInfo.shopEmployee.id,
        contentLike: this.inputVal
      }
      console.info(append,this.currentPage,'12812812')
      const data = await post(`/award/deduction/queryAwardDeduction?${queryParams(params)}`);
      if(data.success){
        this.totalCount = data.total
        this.list = append ? this.list.concat((data.result) || []) : (data.result || [])
      }
    },

    showInput() {
      this.inputShowed = true;
    },
    hideInput() {
      this.inputVal = '';
      this.inputShowed = false;
    },
    clearInput() {
      this.inputVal = '';
    },
    inputTyping(e) {
      console.log(e);
      this.inputVal = e.mp.detail.value;
      console.log('输入信息为：'+e.mp.detail.value);
    },
    handleDetail(id) {
      wx.navigateTo({
        url: "/pages/my-score-action-detail/main?id=" + id
      });
    }
  }
}
</script>

<style lang='scss' scoped>
  .searchbar-result {
    margin-top: 0;
    font-size: 14px;
  }
  .searchbar-result:before {
    display: none;
  }
  .weui-cell {
    padding: 12px 15px 12px 35px;
  }
  @import "./style.scss";
</style>
