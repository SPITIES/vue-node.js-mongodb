import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login'
import LayoutRouter from '@/components/layout/layoutRouter.js'
Vue.use(Router)

var router = new Router({
  routes: [
    { path:'/', redirect:'login'},
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    ...LayoutRouter
  ]
})
// router.beforeEach((to, from, next) => {
//   // ...
//   if(to.path !== '/login'){
//     router.push({path:'login'})
//   }else{
//     next();
//   }
// })
export default router
