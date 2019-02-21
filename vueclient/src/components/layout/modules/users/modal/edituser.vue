<template>
  <div id='editmodal'>
    <Modal v-model="modal1" title="修改用户信息" @on-ok="ok" @on-cancel="cancel" >
      <p slot="header" style="color:#2187cf;text-align:left">
        <Icon type="ios-information-circle"></Icon>
        <span>修改用户信息</span>
      </p>
      <Form  ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="用户名" prop="name">
          <Input v-model="formValidate.name" placeholder="请输入用户名"></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input v-model="formValidate.password" placeholder="请输入密码"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click.prevent="handleSumbit('formValidate')">提交</Button>
        <Button type="default" @click.prevent="cancel">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name:'editmodal',
  data () {
    return {
      modal1: true,
      file: null,
      formValidate:{
        id:'',
        name:'',
        password:''
      },
      ruleValidate:{
        name:[ { required:true,trigger:'blur',message:'用户名不能为空'}],
        password:[ { required:true,trigger:'blur',message:'密码不能为空'}],
      }
    }
  },
  props:{
    linedata:{
      type:Object,
      required:true
    }
  },
  created() {
    console.log(this.linedata)
    let formdata = {
      _id:this.linedata._id,
      name:this.linedata.name,
      password:this.linedata.password,
    }
    this.formValidate = formdata;
  },
  methods: {
    ok () {
      this.$emit('changeModalStatus')
    },
    cancel () {
      this.$emit('changeModalStatus');
      this.$Message.success("取消修改！")
    },
    handleSumbit(name){
      this.$refs[name].validate((valid) => {
        if(valid){
          // console.log(this.formValidate)
          this.$http.post('/users/edituser',this.formValidate).then(res=>{
            console.log(res);
            if(res.code == 200){
              this.$emit("changeModalStatus");
              this.$Message.success(res.status);
              this.$emit('getData');
            }
          })
        }else{
          this.$Message.error("提交失败！")
        }
      })
    },
    // handleReset(name){
    //   this.$refs[name].resetFields();
    // }
  }
}
</script>
<style lang="less" scoped>
</style>
