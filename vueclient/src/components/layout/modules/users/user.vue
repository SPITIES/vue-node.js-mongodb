<template>
  <div id='user'>
    <h1 style="margin:10px 0;color:#2d8cf0"><Icon type="md-desktop" />&nbsp;&nbsp;用户列表</h1>
    <hr>
    <div style="margin:10px;">
      <Input v-model="value" placeholder="请输入用户名" style="width: 150px;margin-right:10px" />
      <Button type="primary" icon="ios-search">查询</Button>
    </div>
    <div class='table'>
      <Table border :columns="tableheader" :data="tabledata"></Table>
      <div style="float:right; margin-top:10px;">
        <Page :total="total" :current="current" show-sizer show-total placement="top" style="font-size:12px;"></Page>
      </div>
    </div>
    <edit-modal v-if='flag' :linedata='linedata'  @changeModalStatus='changeFlag' @getData='getData'></edit-modal>
  </div>
</template>
<script>
import editModal from './../users/modal/edituser'
export default {
  name:'user',
  components:{
    'edit-modal':editModal
  },
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
          title:'用户名',
          align:'center',
          key:'name'
        },
        {
          title:'密码',
          align:'center',
          key:'password'
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
                    this.delete(params.row._id)
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
  created(){
    this.getData();
  },
  methods: {
    getData(){
      this.$http.get('/users').then(res=>{
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
    delete(id){
      this.$http.post('/users/deleteuser',{_id:id}).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.getData();
          this.$Message.success(res.status);
        }
      })
    }
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
