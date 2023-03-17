import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
//解决路由重复点击报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new VueRouter({
    mode:'history',
    //配置路由规则:即设置路径对应的组件
    routes:[
        {
            path:'/',
            name:'login',
            component:()=>import('./views/login.vue')

        },
        {
            path:'/register',
            name:'register',
            component:()=>import('./views/register.vue')

        },
        {
            path:'/main',
            name:'main',
            component:()=>import("./views/main.vue"),
            children:[
                {
                    path:'/home',
                    name:'home',
                    component:()=>import('./views/home.vue')
                },
                {
                    path:'/order',
                    name:'order',
                    component:()=>import('./views/order.vue')
                },
                {
                    path:'/user',
                    name:'user',
                    component:()=>import('./views/user.vue')
                },
                {
                    path:'/setup',
                    name:'setup',
                    component:()=>import('./views/setup.vue')
                }
            ]
        }
    ]
})