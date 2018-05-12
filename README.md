# vue_ele

> 仿饿了么外卖界面

使用 vue、vue-router、better-scroll 仿饿了么外卖界面。

基于 better-scroll 插件封装 scroll 组件，解决菜单、食物列表联动滚动及其他页面滚动。基于 vue 提供的动画钩子实现小球抛入购物车动画及购物车弹簧动画。
商品数据使用 promise 异步读取静态 json 文件模拟网络情况。

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
