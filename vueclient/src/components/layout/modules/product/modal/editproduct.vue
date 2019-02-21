<template>
  <div id='editmodal'>
    <Modal v-model="modal1" title="修改商品信息" @on-ok="ok" @on-cancel="cancel" >
      <p slot="header" style="color:#2187cf;text-align:left">
        <Icon type="ios-information-circle"></Icon>
        <span>修改商品信息</span>
      </p>
      <Form  ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="商品名称" prop="title">
          <Input v-model="formValidate.title" placeholder="请输入商品名称"></Input>
        </FormItem>
        <FormItem label="商品价格" prop="price">
          <Input v-model="formValidate.price" placeholder="请输入商品价格"></Input>
        </FormItem>
         <FormItem label="商品邮费" prop="fee">
          <Input v-model="formValidate.fee" placeholder="请输入商品邮费"></Input>
        </FormItem>
        <FormItem label="商品图片" prop="pic">
          <Row>
            <Col span="12">
              <Upload
                action="/api/product/fileUpload"
                :format="['jpg','jpeg','png']"
                :on-success='uploadSuccess'
                v-model="formValidate.pic">
                <Button icon="ios-cloud-upload-outline">上传图片</Button>
              </Upload>
            </Col>
            <Col span="12">
              <Button icon="ios-trash-outline" @click.prevent='delImg(formValidate._id,formValidate.pic)'>删除图片</Button>
            </Col>
          </Row>
          <div v-if="file !== null" >Upload file: {{ file.name }}</div>
        </FormItem>
        <FormItem label="商品描述" prop="description">
          <Input v-model="formValidate.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入商品描述"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click.prevent="handleSumbit('formValidate')">提交</Button>
        <Button type="default" @click.prevent="handleReset('formValidate')">重置</Button>
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
  props:{
    linedata:{
      type:Object,
      required:true
    }
  },
  created() {
    console.log(this.linedata);
    let formdata = {
      _id:this.linedata._id,
      title:this.linedata.title,
      pic:this.linedata.pic,
      price:this.linedata.price,
      fee:this.linedata.fee,
      description:this.linedata.description
    }
    this.formValidate = formdata;
  },
  methods: {
    ok () {
      this.$emit('changeModalStatus')
    },
    cancel () {
      this.$emit('changeModalStatus')
    },
    uploadSuccess(res,file,filelist){
      // console.log(res);
      if(res.code == 200){
        this.formValidate.pic = res.imgurl;
        this.$Message.success(res.status);
      }
    },
    handleSumbit(name){
      this.$refs[name].validate((valid) => {
        if(valid){
          console.log(this.formValidate);
          this.$http.post('/product/editproduct',this.formValidate).then(res=>{
            console.log(res)
            if(res.code == 200){
              this.$emit("changeModalStatus");
              this.$Message.success("修改成功！");
              this.$emit('getData')
            }
          })
        }else{
          this.$Message.error("提交失败！")
        }
      })
    },
    handleReset(name){
      this.$refs[name].resetFields();
    },
    delImg(id,Img){
      console.log(id)
      this.$http.post('/product/deleteImg',{
          _id:id,
          img:Img
        }).then(res=>{
          console.log(res)
          if(res.code == 200){
            this.$Message.success(res.status);
            this.formValidate.pic = res.results.pic;
          }
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
