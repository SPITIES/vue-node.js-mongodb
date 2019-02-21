<template>
  <div id='adduser'>
    <h1 style="margin:10px 0;color:#2d8cf0"><Icon type="md-desktop" />&nbsp;&nbsp;增加用户</h1>
    <hr>
    <Form  ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" style="margin-top:20px;width:50%">
      <FormItem label="用户名" prop="name">
        <Input v-model="formValidate.name" placeholder="请输入用户名"></Input>
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input v-model="formValidate.password" placeholder="请输入密码"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click.prevent="handleSumbit('formValidate')">提交</Button>
        <Button type="default" @click.prevent="handleReset('formValidate')" style="margin-left:50px;">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  name:'adduser',
  data(){
    return {
      file: null,
      formValidate:{
        name:'',
        password:''
      },
      ruleValidate:{
        name:[ { required:true,trigger:'blur',message:'用户名不能为空'}],
        password:[ { required:true,trigger:'blur',message:'密码不能为空'}],
      }
    }
  },
  methods: {
    handleSumbit(name){
      this.$refs[name].validate((valid) => {
        if(valid){
          this.adduser()
        }else{
          this.$Message.error("提交失败！")
        }
      })
    },
    handleReset(name){
      this.$refs[name].resetFields();
    },
    adduser(){
      this.$http.post('/users/adduser',this.formValidate).then(res=>{
        console.log(res)
        if(res.code == 200){
           this.$Message.success("提交成功！");
           this.$router.push({ path:'/layout/user'})
        }
      })
    }
  },

}
</script>
<style lang="less" scoped>
</style>

