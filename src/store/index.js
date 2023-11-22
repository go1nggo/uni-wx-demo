import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

//自动化导入模块
let context = require.context('./modules',false,/\.js$/);
let modulesStores = {};
context.keys().forEach(key => {
    let fileName = key.slice(2,-3);
    let fileModule = context(key).default;
    modulesStores[fileName] = {
        ...fileModule
    }
});

export default new Vuex.Store(
    {
        modules:{
            ...modulesStores
        }
    }
)