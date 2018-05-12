import Vue from 'vue'
import Router from 'vue-router'

const Goods = (resole) => {
  import('components/TheGoods/TheGoods').then((module) => {
    resole(module)
  })
}
const Ratings = (resole) => {
  import('components/TheRatings/TheRatings').then((module) => {
    resole(module)
  })
}
const Seller = (resole) => {
  import('components/TheSeller/TheSeller').then((module) => {
    resole(module)
  })
}

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/ratings',
      component: Ratings
    },
    {
      path: '/seller',
      component: Seller
    }
  ]
})
