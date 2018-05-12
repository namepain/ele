<template>
<div>
  <div class="shopcart">
    <div class="content">
      <div class="content-left" @click="toogleList">
        <transition name="cart">
          <div class="logo-wrapper scaleSpring" ref="logoWrapper">
            <div class="logo" :class="{'highlight': totalCount > 0}">
              <i class="icon-shopping_cart" :class="{'highlight': totalCount > 0}"></i>
            </div>
            <div class="num" v-show="totalCount > 0">{{ totalCount }}</div>
          </div>
        </transition>
        <div class="price" :class="{'highlight': totalPrice > 0}">￥{{ totalPrice }}</div>
        <div class="desc">另需配送费￥{{ deliveryPrice }}元</div>
      </div>
      <div class="content-right" @click="pay">
        <div class="pay" :class="[totalPrice >= minPrice ? 'enough' : 'not-enough']">
          {{ payDesc }}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <div v-for="(ball, index) in balls" :key="index">
        <transition name="drop"
                    @before-enter="beforDrop"
                    @enter="dropping"
                    @after-enter="afterDrop"
        >
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
    <transition name="fold" @after-enter="afterEnter">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <scroll class="list-content" :data="selectFoods" ref="listContent">
          <ul>
            <li class="food"
                v-for="(food, index) in selectFoods" :key="index"
            >
              <span class="name">{{ food.name }}</span>
              <div class="price">
                <span>￥{{food.price*food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <control-btn :food="food" @add="addFood"></control-btn>
              </div>
            </li>
          </ul>
        </scroll>
      </div>
    </transition>
  </div>
  <div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="listShow=!listShow"></div>
    </transition>
  </div>
</div>
</template>

<script>
import ControlBtn from 'components/ControlBtn/ControlBtn'
import Scroll from 'base/Scroll/Scroll'

export default {
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [
          {
            price: 0,
            count: 0
          }
        ]
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [],
      fold: true,
      listShow: false
    }
  },
  activated() {
    this.$refs.logoWrapper.style.animationPlayState = ''
  },
  computed: {
    totalPrice() {
      let price = 0
      this.selectFoods.forEach(item => {
        price += item.count * item.price
      })
      return price
    },
    totalCount() {
      let count = 0
      this.selectFoods.forEach(item => {
        count += item.count
      })
      return count
    },
    payDesc() {
      return this.totalPrice >= 20
        ? '去结算'
        : this.totalPrice > 0
          ? `还差￥${this.minPrice - this.totalPrice}元起送`
          : `￥${this.minPrice}元起送`
    }
  },
  methods: {
    afterEnter() {
      this.$refs.listContent.refresh()
    },
    empty() {
      this.selectFoods.forEach(food => {
        food.count = 0
      })
    },
    pay() {
      if (this.totalPrice >= this.minPrice) {
        window.alert('支付' + this.totalPrice + '元')
      }
    },
    toogleList() {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
    },
    addFood(element) {
      this.drop(element)
      this.scaleSpring()
    },
    // https://stackoverflow.com/questions/6268508/restart-animation-in-css3-any-better-way-than-removing-the-element
    // 重新执行动画，将其 animation 设为 'none'， timeout 或 nextTick 后设为 null， 则其 animation 属性会重新继承 css 设置
    scaleSpring() {
      this.$refs.logoWrapper.style.animation = 'none'
      /* eslint-disable */
      // this.$refs.logoWrapper.offsetHeight   // trigger reflow
      // setTimeout(() => {
        //   this.$refs.logoWrapper.style.animation = null
      // }, 20)
      this.$nextTick(() => {
        this.$refs.logoWrapper.style.animation = null
        this.$refs.logoWrapper.style.animationPlayState = 'running'
      })
    },
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforDrop(el) {
      console.log(el)
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect()
          console.log(rect)
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top - 22)
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0,${y}px,0)`
          el.style.transform = `translate3d(0,${y}px,0)`
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    dropping(el, done) {
      console.log(el)
      /* eslint-disable */
      let rf = el.offsetHeight
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)'
        el.style.transform = 'translate3d(0,0,0)'
        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = 'translate3d(0,0,0)'
        inner.style.transform = 'translate3d(0,0,0)'
        el.addEventListener('transitionend', done)
      })
    },
    afterDrop(el) {
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    }
  },
  watch: {
    totalCount() {
      if (!this.totalCount) {
        this.fold = true
      }
    },
    fold() {
      this.listShow = !this.fold
    }
  },
  components: {
    ControlBtn,
    Scroll
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin.styl';

.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;

  .content {
    display: flex;
    background: #141d27;
    font-size: 0;
    color: rgba(255, 255, 255, 0.4);

    .content-left {
      flex: 1;
      font-size: 0;

      .logo-wrapper {
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        background: #141d27;

        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          background: #2b343c;

          &.highlight {
            background: rgb(0, 160, 220);
          }

          .icon-shopping_cart {
            line-height: 44px;
            font-size: 24px;
            color: #80858a;

            &.highlight {
              color: #fff;
            }
          }
        }

        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          color: #fff;
          background: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
      }

      .price {
        display: inline-block;
        box-sizing: border-box;
        margin-top: 12px;
        padding-right: 12px;
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        border-right: 1px solid rgba(255, 255, 255, 0.1);

        &.highlight {
          color: #fff;
        }
      }

      .desc {
        display: inline-block;
        vertical-align: top;
        margin: 12px 0 0 12px;
        line-height: 24px;
        font-size: 10px;
      }
    }

    .content-right {
      flex: 0 0 105px;
      width: 105px;

      .pay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;

        &.not-enough {
          background: #2b333b;
        }

        &.enough {
          background: #00b43c;
          color: #fff;
        }
      }
    }
  }

  .ball-container {
    .ball {
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 200;
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);

      .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: rgb(0, 160, 220);
        transition: all 0.4s linear;
      }
    }
  }

  .shopcart-list {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    transform: translate3d(0, -100%, 0);

    &.fold-enter-active, &.fold-leave-active {
      transition: all 0.5s;
    }

    &.fold-enter, &.fold-leave-active {
      transform: translate3d(0, 0, 0);
    }

    .list-header {
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);

      .title {
        float: left;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }

      .empty {
        float: right;
        font-size: 12px;
        color: rgb(0, 160, 220);
      }
    }

    .list-content {
      padding: 0 18px;
      max-height: 217px;
      overflow: hidden;
      background: #fff;

      .food {
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        border-1px(rgba(7, 17, 27, 0.1));

        .name {
          line-height: 24px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .price {
          position: absolute;
          right: 90px;
          bottom: 12px;
          line-height: 24px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 6px;
        }
      }
    }
  }
}

.list-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  backdrop-filter: blur(10px);
  opacity: 1;
  background: rgba(7, 17, 27, 0.6);

  &.fade-enter-active, &.fade-leave-active {
    transition: all 0.5s;
  }

  &.fade-enter, &.fade-leave-active {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }
}

.scaleSpring {
  -webkit-animation: scale-spring 0.4s;
  animation: scale-spring 0.4s;
  animation-delay: 0.4s;
  -webkit-animation-delay: 0.4s;
  animation-play-state: paused;
  -webkit-animation-play-state: paused;
}

@keyframes scale-spring {
  0% {
    -webkit-transform: scale(0.7);
  }

  40% {
    -webkit-transform: scale(1.3);
  }

  80% {
    -webkit-transform: scale(0.9);
  }

  100% {
    -webkit-transform: scale(1);
  }
}

@keyframes scale-spring {
  0% {
    transform: scale(0.7);
  }

  40% {
    transform: scale(1.3);
  }

  80% {
    transform: scale(0.9);
  }

  100% {
    transform: scale(1);
  }
}
</style>
