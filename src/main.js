import Vue from 'vue'
import App from './App'
import './uni.promisify.adaptor'
import intereactive from "@/utils/intereactive";
Vue.config.productionTip = false
Vue.use(intereactive)
// 全局混入tabbar
Vue.mixin({
  methods:{
      // setTabBarIndex(index) {
      //     if (typeof this.$mp.page.getTabBar === 'function' &&
      //     this.$mp.page.getTabBar()) {
      //         this.$mp.page.getTabBar().setData({
      //             selected: index
      //         })
      //     }
      // }
      setTabBarIndex(index) {
        if (typeof this.$scope.getTabBar === 'function' &&
            this.$scope.getTabBar()) {
            this.$scope.getTabBar().setData({
                selected: index,
            })
        }
    }
  }
})

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
