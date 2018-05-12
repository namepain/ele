<template>
  <div id="app">
    <the-header :seller="seller"></the-header>
    <div class="tab-wrapper border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import TheHeader from 'components/TheHeader/TheHeader'
import { getSeller, ERR_OK } from 'api/api.js'

export default {
  name: 'App',
  data() {
    return {
      seller: {}
    }
  },
  created() {
    getSeller().then((res) => {
      if (res.errno === ERR_OK) {
        this.seller = res.data
      }
    })
  },
  components: {
    TheHeader
  }
}
</script>

<style lang="stylus" scoped>
  @import 'common/stylus/mixin.styl';

  .tab-wrapper
    display flex
    height 40px
    line-height 40px
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align center
      >a
        display block
        font-size 14px
        color rgb(77, 85, 93)
      .active
        color rgb(240, 20, 20)
</style>
