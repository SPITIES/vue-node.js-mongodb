<template>
  <div id='addproduct'>
    <h1 style="margin:10px 0;color:#2d8cf0"><Icon type="md-desktop" />&nbsp;&nbsp;增加商品</h1>
    <hr>
    <Form  ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" style="margin-top:20px;width:50%">
      <FormItem label="商品名称" prop="title">
        <Input v-model="formValidate.title" placeholder="请输入商品名称"></Input>
      </FormItem>
      <FormItem label="商品图片" prop="pic">
        <Upload
          action='/api/product/fileUpload'
          :format="['jpg','jpeg','png']"
          :on-success='uploadSuccess'>
          <Button icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
      </FormItem>
      <FormItem label="商品价格" prop="price">
        <Input v-model="formValidate.price" placeholder="请输入商品价格"></Input>
      </FormItem>
        <FormItem label="商品邮费" prop="fee">
        <Input v-model="formValidate.fee" placeholder="请输入商品邮费"></Input>
      </FormItem>
      <FormItem label="商品描述" prop="description">
        <Input v-model="formValidate.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入商品描述"></Input>
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
  name:'addproduct',
  data(){
    return {
      formValidate:{
        title:'',
        pic:'',
        price:'',
        fee:'',
        description:''
      },
      ruleValidate:{
        title:[ { required:true,trigger:'blur',message:'商品名称不能为空'}],
        price:[ { required:true,trigger:'blur',message:'商品价格不能为空'}],
        fee:[ { required:true,trigger:'blur',message:'商品邮费不能为空'}],
      }
    }
  },
  methods: {
    uploadSuccess(res,file,filelist){
      // console.log('OK')
      // console.log(file)
      // console.log(res)
      if(res.code == 200){
        this.formValidate.pic = res.imgurl;
        this.$Message.success(res.status);
      }
    },
    handleSumbit(name){
      this.$refs[name].validate((valid) => {
        if(valid){
          // console.log(this.formValidate)
          this.$http.post('/product/addproduct',this.formValidate).then(res=>{
            console.log(res)
            if(res.code == 200){
              this.$Message.success(res.status);
              this.$router.push({ path:'/layout/product'})
            }
          })
        }else{
          this.$Message.error("提交失败！")
        }
      })
    },
    handleReset(name){
      this.$refs[name].resetFields();
    }
  }
}
</script>
<style lang="less" scoped>
</style>
