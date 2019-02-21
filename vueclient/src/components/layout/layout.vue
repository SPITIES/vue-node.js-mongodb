<style scoped lang='less'>
.layout{
    height: 100%;
    display: flex;
    /* border: 1px solid #d7dde4; */
    background: #f5f7f9;
    position: relative;
    /* border-radius: 4px; */
    overflow: hidden;

}
.layout-logo{
    width: 200px;
    height: 50px;
    background: url('./../../assets/node.jpg') center center no-repeat;
    background-size:cover;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 7px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    /* margin: 0 auto; */
    /* margin-right: 0px; */
    float: right;
    .ivu-menu-item{
      position: relative;
      float: right;
    }
}
a {
  color: #495060;
}
</style>
<template>
  <div class="layout">
      <Layout>
          <Header>
              <Menu mode="horizontal" theme="dark" @on-select='loginOut'>
                  <div class="layout-logo"></div>
                  <div class="layout-nav">
                      <MenuItem name="1">
                          <Icon type="md-power"></Icon>
                          安全退出
                      </MenuItem>
                  </div>
              </Menu>
          </Header>
          <Layout>
              <Sider hide-trigger :style="{background: '#fff'}">
                  <Menu theme="light" width="auto" :accordion="true" :open-names="['1']">
                      <Submenu name="1">
                          <template slot="title">
                              <Icon type="ios-list-box"></Icon>
                              商品管理
                          </template>
                          <router-link to="/layout/product">
                            <MenuItem name="1-1">商品列表</MenuItem>
                          </router-link>
                          <router-link to="/layout/addproduct">
                            <MenuItem name="1-2">增加商品</MenuItem>
                          </router-link>
                      </Submenu>
                      <Submenu name="2">
                          <template slot="title">
                              <Icon type="md-contacts"></Icon>
                              用户管理
                          </template>
                          <router-link to="/layout/user">
                            <MenuItem name="2-1">用户列表</MenuItem>
                          </router-link>
                          <router-link to="/layout/adduser">
                            <MenuItem name="2-2">增加用户</MenuItem>
                          </router-link>
                      </Submenu>
                  </Menu>
              </Sider>
              <Layout :style="{padding:'24px'}">
                  <Content :style="{padding: '24px', background: '#fff'}">
                      <router-view></router-view>
                  </Content>
              </Layout>
          </Layout>
      </Layout>
  </div>
</template>
<script>
    export default {
        name:'layout',
        methods: {
          loginOut(){
            console.log('安全退出');
            this.$router.push({ path:'/login'});
          }
        },
    }
</script>

