<template>
<div>
  <div class="goods">
    <scroll class="menu"
            :data="goods"
            ref="menuScroll"
    >
      <ul>
        <li class="menu-item"
            v-for="(menu, index) in goods" :key="index"
            :class="{'current':currentIndex===index}"
            ref="menuItem"
            @click="selectMenu(index)"
        >
          <p class="text border-1px">
            <span class="icon"
                  v-if="menu.type > 0"
                  :class="clsArr[menu.type]">
            </span>{{ menu.name }}
          </p>
        </li>
      </ul>
    </scroll>
    <scroll class="goods-list"
            ref="foodScroll"
            :data="goods"
            :listenScroll="true"
            :probeType="3"
            @scroll="foodListScroll"
    >
      <ul>
        <li class="food-list"
            v-for="(item, index) in goods" :key="index"
            ref="foodList"
        >
          <h1 class="title">{{ item.name }}</h1>
          <ul>
            <li class="food-item border-1px"
                v-for="(food, index1) in item.foods" :key="index1"
                @click="selectFood(food, $event)"
            >
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span class="old"
                                                                v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <control-btn :food="food" @add="addFood"></control-btn>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
    <shop-cart :deliveryPrice="seller.deliveryPrice"
               :minPrice="seller.minPrice"
               :selectFoods="selectFoods"
               ref="shopCart"
    ></shop-cart>
  </div>
  <food @add="addFood" :food="selectedFood" ref="food"></food>
</div>
</template>

<script>
import Scroll from 'base/Scroll/Scroll'
import ShopCart from 'components/ShopCart/ShopCart'
import ControlBtn from 'components/ControlBtn/ControlBtn'
import Food from 'components/Food/Food'
import { getGoods, ERR_OK } from 'api/api'
import { debounce } from 'common/js/util'

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    }
  },
  created() {
    this.clsArr = ['decrease', 'discount', 'special', 'invoice', 'guarantee']

    getGoods().then((res) => {
      if (res.errno === ERR_OK) {
        this.goods = res.data
        this.$nextTick(() => {
          this._calcHeight()
        })
      }
    })
  },
  methods: {
    selectFood(food, ev) {
      console.log(food, ev)
      this.selectedFood = food
      this.$refs.food.show()
    },
    addFood(element) {
      this.$nextTick(() => {
        this.$refs.shopCart.drop(element)
        this.$refs.shopCart.scaleSpring()
      })
    },
    selectMenu(index) {
      let height = this.listHeight[index]
      console.log(height)
      this._scrollToFood(index)
    },
    foodListScroll(pos) {
      this.scrollY = pos.y
    },
    _calcHeight() {
      let height = 0
      let oList = this.$refs.foodList
      console.log(oList)
      this.listHeight.push(height)
      for (let i = 0; i < oList.length; i++) {
        this.listHeight.push(height += oList[i].clientHeight)
      }
    },
    _scrollToFood: function(index) {
      this.$refs.foodScroll.scrollToElement(this.$refs.foodList[index], 300)
    },
    _scrollToMenu: debounce(function(index) {
      this.$refs.menuScroll.scrollToElement(this.$refs.menuItem[index], 300, 0, true)
    }, 40)
  },
  activated() {
    this.$refs.foodScroll.refresh()
  },
  computed: {
    currentIndex() {
      if (this.scrollY >= 0) return 0
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (-this.scrollY >= height1 && -this.scrollY < height2)) {
          this._scrollToMenu(i)
          console.log(i, this.scrollY)
          return i
        }
      }
      return 0
    },
    selectFoods() {
      let foodArr = []
      this.goods.forEach((good) => {
        good.foods.forEach((item) => {
          item.count && foodArr.push(item)
        })
      })
      return foodArr
    }
  },
  components: {
    Scroll,
    ShopCart,
    ControlBtn,
    Food
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/mixin.styl';

  .goods
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    display flex
    .menu
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-none()
        .text
          display table-cell
          vertical-align middle
          width 56px
          font-size 12px
          border-1px(rgba(7, 17, 27, 0.1))
        .icon
          display inline-block
          vertical-align top
          width 12px
          height 12px
          margin-right 2px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
    .goods-list
      flex 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
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
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
