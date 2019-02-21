<template>
  <div id='login'>
    <div class="container">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
        <h1 style="text-align:center;margin:20px 0 20px 0;">用户登录</h1>
        <FormItem prop="name">
          <Input type="text" v-model="formValidate.name" placeholder="请输入用户名">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formValidate.password" placeholder="请输入密码">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
            <Button @click.prevent="handleReset('formValidate')">重置</Button>
            <Button type="primary" @click.prevent="handleSubmit('formValidate')">登录</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  name:'login',
  data(){
    return{
      formValidate:{
        name:'',
        password:''
      },
      ruleValidate:{
        name:[
          { required:true,message:'用户名不能为空！',trigger:'blur'},
        ],
        password:[
          { required:true,message:'密码不能为空！',trigger:'blur'}
        ]
      }
    }
  },
  created() {
    // this.$http.get('/users').then(res=>{
    //   console.log(res);
    // })
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$http.post('/login',{
            name:this.formValidate.name,
            password:this.formValidate.password
          }).then(res =>{
            console.log(res)
            if(res.code == 200){
              this.$router.push({path:'/layout'});
              this.$Message.success('登录成功!');
            }else{
              this.$Message.error('登录失败，请检查信息！');
            }
          })
        } else {
          this.$Message.error('登录失败，请检查信息！');
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    }
  }
}
</script>
<style lang="less" scoped>
  #login{
    width: 100%;
    height: 100%;
    background: #00b4ef;
    position: fixed;
    top:0;
    left:0;
  }
  .container{
    width:450px;
    height: 250px;

    margin: 0 auto;

    border: 1px solid whitesmoke;
    border-radius: 5%;
    background: white;

    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
  }
  .ivu-form{
    text-align: center;
  }
  .ivu-input-wrapper{
    width:350px;
    margin:0 auto;
  }
  .ivu-form-item{
    /deep/ .ivu-form-item-error-tip{
      left:18%;
    }
  }
  .ivu-btn-default{
    width:100px;
  }
  .ivu-btn-primary{
    width:100px;
    margin-left:50px;
  }

</style>

