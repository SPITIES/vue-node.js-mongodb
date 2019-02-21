import http from './http.js'

/**
 * 将 axios 封装成 vue-resource 一样可以直接在vue中全局使用
 * this.$http
*/
const install = function(Vue){
  if(install.installed) return
  install.installed = true
  Object.defineProperties(Vue.prototype,{
    $http:{
      get(){
        return http
      }
    }
  })
}

export default install
