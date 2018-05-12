<template>
  <div class="star" :class="starSize">
    <span class="star-item"
          v-for="(item, index) in items" :key="index"
          :class="item"></span>
  </div>
</template>

<script>
const LEN = 5
const ON = 'on'
const OFF = 'off'
const HALF = 'half'

export default {
  props: {
    size: {
      type: Number,
      default: 24
    },
    score: {
      type: Number,
      default: 0
    }
  },
  computed: {
    starSize() {
      return 'star-' + this.size
    },
    items() {
      let res = []
      let integer = Math.floor(this.score)
      let decimal = this.score % 1 >= 0.5
      while (integer--) {
        res.push(ON)
      }
      decimal && res.push(HALF)
      while (res.length < LEN) {
        res.push(OFF)
      }
      return res
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin.styl'

  .star
    font-size: 0
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 6px
        background-size: 15px 15px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')
</style>
