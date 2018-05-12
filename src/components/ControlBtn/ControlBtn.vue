<template>
  <div class="control">
    <transition name="fade">
      <div class="decrease" v-show="food.count > 0" @click.stop.prevent="decrease">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="count" v-show="food.count">{{ food.count }}</div>
    <div class="increase icon-add_circle" @click.stop.prevent="addCount"></div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCount(event) {
      // better-scroll，点击事件在手机模式触发一次，但在pc模式会触发两次，需添加
      // if (!event._constructed) {
      //   return
      // }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit('add', event.target)
    },
    decrease(el) {
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .control
    font-size 0
    .decrease
      display inline-block
      padding 6px
      opacity 1
      .inner
        display inline-block
        line-height 24px
        height 24px
        font-size 24px
        color rgb(0, 160, 220)
        transition all .4s linear
      &.fade-enter-active, &.fade-leave-active
        transition all .4s linear
      &.fade-enter, &.fade-leave-to
        opacity 0
        transform translate3d(24px, 0, 0)
        .inner
          transform rotate(180deg)
    .count
      display inline-block
      vertical-align top
      padding 6px
      width 12px
      line-height 24px
      text-align center
      font-size 10px
      color rgb(147, 153, 159)
    .increase
      display inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color rgb(0, 160, 220)
</style>
