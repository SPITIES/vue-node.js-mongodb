<template>
  <div id='product'>
      <h1 style="margin:10px 0;color:#2d8cf0"><Icon type="md-desktop" />&nbsp;&nbsp;商品列表</h1>
      <hr>
      <div style="margin:10px;">
        <Input v-model="value" placeholder="请输入商品名称" style="width: 150px;margin-right:10px" />
        <Button type="primary" icon="ios-search">查询</Button>
      </div>
      <div class='table'>
        <Table border :columns="tableheader" :data="tabledata"></Table>
        <div style="float:right; margin-top:10px;">
			 	  <Page :total="total" :current="current" show-sizer show-total placement="top" style="font-size:12px;"></Page>
			  </div>
      </div>
      <edit-modal v-if='flag' :linedata='linedata' @changeModalStatus='changeFlag' @getData='getData'></edit-modal>
  </div>
</template>
<script>
import editModal from './../product/modal/editproduct'
export default {
  name:'product',
  data(){
    return {
      value:'',
      flag:false,
      total:0,
      current:1,
      size:10,
      linedata:{},
      tabledata:[],
      tableheader:[
        {
          title:'序号',
          align:'center',
          render:(h,params)=>{
            return h('div', params.index + 1 + (this.current - 1)*this.size)
          }
        },
        {
          title:'图标',
          align:'center',
          key:'pic',
          render:(h,params)=>{
            //这里使用正则表达式将 upload\R_gPT1QHsWBsB4lvusEpwyiE.png里面的 \替换 成 /
            // return console.log(params.row.pic.replace(/\\/g,"/"))
            if(params.row.pic == ""){
                return h('div',[
                  h('img',{
                    domProps:{
                      src:`/vueclient/src/assets/timg.jpg`
                      // src:`/api/${params.row.pic.replace(/\\/g,"/")}`
                      // src:'/api/upload/R_gPT1QHsWBsB4lvusEpwyiE.png '
                    },
                    style:{
                      width:'70px',
                      height:'25px'
                    }
                  })
                ])
            }else{
              return h('div',[
                h('img',{
                  domProps:{
                    src:`/api/${params.row.pic}`
                    // src:`/api/${params.row.pic.replace(/\\/g,"/")}`
                    // src:'/api/upload/R_gPT1QHsWBsB4lvusEpwyiE.png '
                  },
                  style:{
                    width:'70px',
                    height:'25px'
                  }
                })
              ])
            }

          }
        },
        {
          title:'名称',
          align:'center',
          key:'title'
        },
        {
          title:'价格',
          align:'center',
          key:'price'
        },
        {
          title:'邮费',
          align:'center',
          key:'fee'
        },
        {
          title:'操作',
          align:'center',
          render:(h,params)=>{
            return h('div',[
              h('Button',{
                props:{
                  type:'success',
                  size:'small',
                  icon:"ios-create-outline"
                },
                style:{
                  marginRight: "5px",
                  fontSize: "13px",
                  // borderRadius: "50%",
                  // border: 0,
                  color: "white",
                  width: "60px",
                  height: "30px",
                  lineHeight: "26px"
                },
                on: {
                  click: () => {
                    // console.log("修改");
                    this.linedata = params.row;
                    this.changeFlag();
                  }
                }
              },'修改'),
              h('Poptip',{
                props: {
                  confirm: true,
                  title: '是否删除',
                  placement: 'top-end',
                },
                style:{
                  textAlign:'left'
                },
                on: {
                  'on-ok': () => {
                    console.log(params.row._id)
                    this.deleteproduct(params.row._id);
                  },
                  'on-cancel': () => {
                  }
                }
              },[
                h('Button', {
                  props: {
                    type: "error",
                    size: "small",
                    icon: "ios-trash-outline"
                  },
                  style: {
                    fontSize: "13px",
                    // borderRadius: "50%",
                    // border: 0,
                    color: "white",
                    width: "60px",
                    height: "30px",
                    lineHeight: "30px"
                  },
                },'删除'),
              ])
            ])
          }
        },
      ]
    }
  },
  components:{
    'edit-modal': editModal
  },
  created() {
    this.getData();
  },
  methods: {
    getData(){
      this.$http.get('/product').then(res=>{
        console.log(res)
        if(res.code == 200){
          this.tabledata = res.results;
          this.total = res.size;
        }
      })
    },
    changeFlag(){
      this.flag = !this.flag;
    },
    deleteproduct(id){
      this.$http.post('/product/deleteproduct',{ _id:id}).then(res=>{
        console.log(res);
        if(res.code == 200){
          this.$Message.success(res.status);
          this.getData();
        }
      })
    },
  },
}
</script>
<style lang="less" scoped>
.ivu-table-wrapper{
  border:0;
  // /deep/ 是深度作用域
  /deep/.ivu-table {
    border-radius:10px;
    -webkit-box-shadow: 0 0 24px rgba(0, 0, 0, .175);
    box-shadow: 0 0 24px rgba(0, 0, 0, .175);
    th{
      background: #fff;
      // color: #4d95ee;
      text-align: center;
      font-weight: bold;
      font-size:14px;
      border-right: 1px dashed #d6dce9;
    }
    td{
      color: #666;
      font-weight: bold;
      padding: 10px 0;
      text-align: center;
      border-right: 1px solid #d6dce9;
    }
    td:last-child{
      border-right: 0;
    }
    th:last-child{
      border-right: 0;
    }
  }
  /deep/.ivu-table:after{
    width: 0;
  }
  /deep/.ivu-table:before{
    height:0;
  }
}

</style>

