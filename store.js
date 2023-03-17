import Vue from 'vue'
/* 引入Vuex插件 */
import Vuex from 'vuex'
/* use:使用插件 */
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
      //左侧菜单是否折叠,默认不折叠
      isCollapse:true,
      //当前选中的菜单
      currentMenu:null
    },

    mutations:{
      //给左侧菜单折叠状态取相反的状态,如果是开给关闭,如果关闭给打开
      setCollapse(state){
        state.isCollapse = !state.isCollapse;
      },

      //点击左侧菜单栏修改当前选中的菜单
      selectMenu(state,val){
        if(val.name === 'home'){
          state.currentMenu = null;
        }else{
          state.currentMenu = val;
        }
      }
    }
    
})