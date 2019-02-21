export default [
  { path:'',redirect:'layout'},
  {
    path:'/layout',
    name:'layout',
    component:()=> import('@/components/layout/layout.vue'),
    children:[
      { path:'',redirect:'product'},
      {
        path:'product',
        name:'product',
        component:()=>import('@/components/layout/modules/product/product.vue')
      },
      {
        path:'addproduct',
        name:'addproduct',
        component:()=>import('@/components/layout/modules/product/addproduct.vue')
      },
      {
        path:'user',
        name:'user',
        component:()=>import('@/components/layout/modules/users/user.vue')
      },
      {
        path:'adduser',
        name:'adduser',
        component:()=>import('@/components/layout/modules/users/adduser.vue')
      },
    ]
  }
]
