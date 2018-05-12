<template>
<transition name="move">
  <scroll :data="shownRatings" class="food" ref="food" v-show="showFlag">
    <div>
      <div class="image-header">
        <img :src="food.image">
        <div class="back" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="content">
        <h2 class="title">{{ food.name }}</h2>
        <div class="detail">
          <span class="sell-count">月售{{ food.sellCount }}份</span>
          <span class="rating">好评率{{ food.rating }}%</span>
        </div>
        <div class="price">
          <span class="now">￥{{ food.price }}</span>
          <span class="old" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
        </div>
        <div class="control-wrapper">
          <control-btn :food="food" @add="addFood"></control-btn>
        </div>
        <transition name="fade">
          <div class="buy"
              v-show="!food.count || food.count===0"
              @click.stop.prevent="addFirst">
            加入购物车
          </div>
        </transition>
      </div>
      <split v-show="food.info"></split>
      <div class="info" v-if="food.info">
        <h1 class="title">商品信息</h1>
        <p class="text">{{ food.info }}</p>
      </div>
      <split></split>
      <div class="rating">
        <h2 class="title">商品评价</h2>
        <ratingselect @select="selectRating"
                      @toggle="toggleContent"
                      :selectType="selectType"
                      :onlyContent="onlyContent"
                      :desc="desc"
                      :ratings="food.ratings"
        ></ratingselect>
        <div class="rating-wrapper">
          <ul>
            <li class="rating-item border-1px"
                v-for="(rating, index) in shownRatings" :key="index"
            >
              <div class="user">
                <span class="name">{{ rating.username }}</span>
                <img class="avatar" :src="rating.avatar" width="12" height="12">
              </div>
              <div class="time">{{ rating.rateTime | formatDate }}</div>
              <p class="text">
                <span :class="[rating.rateType===0 ? 'icon-thumb_up' : 'icon-thumb_down']"></span>{{ rating.text}}
              </p>
            </li>
          </ul>
          <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
        </div>
      </div>
    </div>
  </scroll>
</transition>
</template>

<script>
import Vue from 'vue'
import ControlBtn from 'components/ControlBtn/ControlBtn'
import ratingselect from 'base/ratingselect/ratingselect'
import Split from 'base/Split/Split'
import Scroll from 'base/Scroll/Scroll'
import { formatDate } from 'common/js/util'

const ALL = 2

export default {
  props: {
    food: {
      type: Object,
      default() {
        return {
          ratings: []
        }
      }
    }
  },
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  computed: {
    shownRatings() {
      return this.food.ratings ? this.food.ratings.filter((rating) => {
        return this.needShow(rating.rateType, rating.text)
      }) : []
    }
  },
  methods: {
    addFood(e) {
      this.$emit('add', e)
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType !== ALL && this.selectType !== type) {
        return false
      }
      return true
    },
    selectRating(type) {
      this.selectType = type
      this.$refs.food.refresh()
    },
    toggleContent() {
      this.onlyContent = !this.onlyContent
      this.$refs.food.refresh()
    },
    hide() {
      this.showFlag = false
    },
    show() {
      this.showFlag = true
      this.selectType = ALL
      this.onlyContent = true
      this.$nextTick(() => {
        this.$refs.food.refresh()
      })
    },
    addFirst(e) {
      Vue.set(this.food, 'count', 1)
      this.$emit('add', e.target)
    }
  },
  filters: {
    formatDate(val) {
      return formatDate(new Date(val), 'yyyy-MM-dd hh:mm')
    }
  },
  components: {
    ControlBtn,
    Split,
    ratingselect,
    Scroll
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #fff
    transform: translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition: all 0.2s linear
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 10px
          font-size: 20px
          color: #fff

    .content
      position: relative
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        height: 10px
        font-size: 0
        .sell-count, .rating
          font-size: 10px
          color: rgb(147, 153, 159)
        .sell-count
          margin-right: 12px
      .price
        font-weight: 700
        line-height: 24px
        .now
          margin-right: 8px
          font-size: 14px
          color: rgb(240, 20, 20)
        .old
          text-decoration: line-through
          font-size: 10px
          color: rgb(147, 153, 159)
      .control-wrapper
        position: absolute
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        border-radius: 12px
        font-size: 10px
        color: #fff
        background: rgb(0, 160, 220)
        opacity: 1
        &.fade-enter-active, &.fade-leave-active
          transition: all 0.2s
        &.fade-enter, &.fade-leave-active
          opacity: 0
          z-index: -1
    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        color: rgb(7, 17, 27)
      .text
        line-height: 24px
        padding: 0 8px
        font-size: 12px
        color: rgb(77, 85, 93)
    .rating
      padding-top: 18px
      .title
        line-height: 14px
        margin-left: 18px
        font-size: 14px
        color: rgb(7, 17, 27)
      .rating-wrapper
        padding: 0 18px
        .rating-item
          position: relative
          padding: 16px 0
          border-1px(rgba(7, 17, 27, 0.1))
          .user
            position: absolute
            right: 0
            top: 16px
            line-height: 12px
            font-size: 0
            .name
              display: inline-block
              margin-right: 6px
              vertical-align: top
              font-size: 10px
              color: rgb(147, 153, 159)
            .avatar
              border-radius: 50%
          .time
            margin-bottom: 6px
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
          .text
            line-height: 16px
            font-size: 12px
            color: rgb(7, 17, 27)
            .icon-thumb_up, .icon-thumb_down
              margin-right: 4px
              line-height: 16px
              font-size: 12px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .icon-thumb_down
              color: rgb(147, 153, 159)

        .no-rating
          padding: 16px 0
          font-size: 12px
          color: rgb(147, 153, 159)
</style>
