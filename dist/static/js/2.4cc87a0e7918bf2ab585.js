webpackJsonp([2],{cGud:function(t,e){},g6Xh:function(t,e){},"l/G4":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("1P5+"),n=s("EVwS"),i=s("65a4"),r=s("lzQb"),c=s("P9l9"),l=s("hhm8"),o={props:{seller:{type:Object}},data:function(){return{ratings:[],selectType:2,onlyContent:!0,desc:{all:"全部",positive:"满意",negative:"不满意"}}},created:function(){var t=this;Object(c.c)().then(function(e){e.errno===c.a&&(t.ratings=e.data)})},computed:{showRatings:function(){var t=this;return this.ratings.filter(function(e){return t.needShow(e.rateType,e.text)})}},methods:{selectRating:function(t){this.selectType=t,this.$refs.rating.refresh()},toggleContent:function(){this.onlyContent=!this.onlyContent,this.$refs.rating.refresh()},needShow:function(t,e){return!(this.onlyContent&&!e)&&(2===this.selectType||this.selectType===t)}},filters:{formatDate:function(t){return Object(l.b)(new Date(t),"yyyy-MM-dd hh:mm")}},components:{Scroll:a.a,Split:n.a,Star:i.a,Ratingselect:r.a}},v={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("scroll",{ref:"rating",staticClass:"rating-container"},[s("div",{staticClass:"ratings"},[s("div",{staticClass:"overview"},[s("div",{staticClass:"overview-left"},[s("h2",{staticClass:"score"},[t._v(t._s(t.seller.score))]),t._v(" "),s("p",{staticClass:"title"},[t._v("综合评分")]),t._v(" "),s("p",{staticClass:"rank"},[t._v("高于周边商家"+t._s(t.seller.rankRate)+"%")])]),t._v(" "),s("div",{staticClass:"overview-right"},[s("div",{staticClass:"score-wrapper"},[s("span",{staticClass:"title"},[t._v("服务态度")]),t._v(" "),s("star",{attrs:{size:36,score:t.seller.serviceScore}}),t._v(" "),s("span",{staticClass:"score"},[t._v(t._s(t.seller.serviceScore))])],1),t._v(" "),s("div",{staticClass:"score-wrapper"},[s("span",{staticClass:"title"},[t._v("商品评分")]),t._v(" "),s("star",{attrs:{size:36,score:t.seller.foodScore}}),t._v(" "),s("span",{staticClass:"score"},[t._v(t._s(t.seller.foodScore))])],1),t._v(" "),s("div",{staticClass:"delivery-wrapper"},[s("span",{staticClass:"title"},[t._v("送达时间")]),t._v(" "),s("span",{staticClass:"delivery"},[t._v(t._s(t.seller.deliveryTime)+"分钟")])])])]),t._v(" "),s("split"),t._v(" "),s("ratingselect",{attrs:{selectType:t.selectType,onlyContent:t.onlyContent,desc:t.desc,ratings:t.ratings},on:{select:t.selectRating,toggle:t.toggleContent}}),t._v(" "),s("div",{staticClass:"rating-wrapper"},[s("ul",t._l(t.showRatings,function(e,a){return s("li",{key:a,staticClass:"rating-item"},[s("div",{staticClass:"avatar"},[s("img",{attrs:{width:"28",height:"28",src:e.avatar}})]),t._v(" "),s("div",{staticClass:"content"},[s("h1",{staticClass:"name"},[t._v(t._s(e.username))]),t._v(" "),s("div",{staticClass:"star-wrapper"},[s("star",{attrs:{size:24,score:e.score}}),t._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:e.deliveryTime,expression:"rating.deliveryTime"}],staticClass:"delivery"},[t._v(t._s(e.deliveryTime))])],1),t._v(" "),s("p",{staticClass:"text"},[t._v(t._s(e.text))]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.recommend&&e.recommend.length,expression:"rating.recommend && rating.recommend.length"}],staticClass:"recommend"},[s("span",{staticClass:"icon-thumb_up"}),t._v(" "),t._l(e.recommend,function(e,a){return s("span",{key:a,staticClass:"item"},[t._v(t._s(e))])})],2),t._v(" "),s("div",{staticClass:"time"},[t._v("\n              "+t._s(t._f("formatDate")(e.rateTime))+"\n            ")])])])}))])],1)])},staticRenderFns:[]};var p=s("VU/8")(o,v,!1,function(t){s("cGud")},null,null);e.default=p.exports},lzQb:function(t,e,s){"use strict";var a={props:{selectType:{type:Number,default:2},onlyContent:{type:Boolean,default:!1},desc:{type:Object,default:function(){return{all:"全部",positive:"满意",negative:"不满意"}}},ratings:{type:Array,default:function(){return[]}}},computed:{positives:function(){return this.ratings.filter(function(t){return 0===t.rateType})},negatives:function(){return this.ratings.filter(function(t){return 1===t.rateType})}},methods:{select:function(t){this.$emit("select",t)},toggleContent:function(){this.$emit("toggle")}}},n={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"ratingselect"},[s("div",{staticClass:"rating-type border-1px"},[s("span",{staticClass:"block positive",class:{active:2===t.selectType},on:{click:function(e){t.select(2)}}},[t._v(t._s(t.desc.all)),s("span",{staticClass:"count"},[t._v(t._s(t.ratings.length))])]),t._v(" "),s("span",{staticClass:"block positive",class:{active:0===t.selectType},on:{click:function(e){t.select(0)}}},[t._v(t._s(t.desc.positive)),s("span",{staticClass:"count"},[t._v(t._s(t.positives.length))])]),t._v(" "),s("span",{staticClass:"block negative",class:{active:1===t.selectType},on:{click:function(e){t.select(1)}}},[t._v(t._s(t.desc.negative)),s("span",{staticClass:"count"},[t._v(t._s(t.negatives.length))])])]),t._v(" "),s("div",{staticClass:"toggleContent",class:{on:t.onlyContent},on:{click:t.toggleContent}},[s("span",{staticClass:"icon-check_circle"}),t._v(" "),s("span",{staticClass:"text"},[t._v("只看有内容的评论")])])])},staticRenderFns:[]};var i=s("VU/8")(a,n,!1,function(t){s("g6Xh")},null,null);e.a=i.exports}});
//# sourceMappingURL=2.4cc87a0e7918bf2ab585.js.map