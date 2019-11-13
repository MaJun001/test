<template>
  <div>
    <input type="text" v-model="val" @change="change">

    <el-button type="text" @click="btn">添加</el-button>
      <el-dialog :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="名字" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.pwd" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="form.address" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="身份证" :label-width="formLabelWidth">
            <el-input v-model="form.idCard" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="form.phone" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="close">取 消</el-button>
          <el-button type="primary" @click="sure">确 定</el-button>
        </div>
      </el-dialog>

    <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="名字"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.username }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="密码"
      width="180">
      <template slot-scope="scope">
        <span>{{ scope.row.password }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="地址"
      width="180">
      <template slot-scope="scope">
        <span>{{ scope.row.address }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="身份证"
      width="180">
      <template slot-scope="scope">
        <span>{{ scope.row.idCard }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="电话"
      width="180">
      <template slot-scope="scope">
        <span>{{ scope.row.phone }}</span>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">修改</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>

      </template>
    </el-table-column>
  </el-table>

  <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-size="limit"
      :page-sizes="[2, 4, 6, 8]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
  </el-pagination> -->
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      list:'',
      tableData: [],
      val:'',
      limit:4,
      pageNum:1,
      total:0,
      dialogFormVisible: false,
      form: {
        name: '',
        pwd:'',
        address:'',
        idCard:'',
        phone:'',
        delivery: false,
      },
      formLabelWidth: '100px',
      changeFont:"",
      id:''
    }
  },
  methods:{
    //add
    btn(){
      this.dialogFormVisible = true;
      this.changeFont = "add";
    },
    sure(){
      this.dialogFormVisible = false;
      if(this.changeFont==="add"){
        let username = this.form.name;
        let password = this.form.pwd;
        let address = this.form.address;
        let idCard = this.form.idCard;
        let phone = this.form.phone;
        axios.post('/api/add',{username,password,address,idCard,phone}).then(res=>{
          if(res.data.code == 1){
            this.listreq()
            this.form.name = ''
            this.form.pwd = ''
            this.form.address = ''
            this.form.idCard = ''
            this.form.phone = ''
          }
      })
      }else if(this.changeFont === "change"){
        let username = this.form.name;
        let password = this.form.pwd;
        let address = this.form.address;
        let idCard = this.form.idCard;
        let phone = this.form.phone;
        axios.post('/api/edit',{id:this.id,username,password,address,idCard,phone}).then(res=>{
          console.log(res)
          if(res.data.code == 1){
            alert('修改成功')
            this.listreq()
          }
        })
      }
    },
    handleEdit($index,row){
      this.dialogFormVisible = true;
      this.changeFont = "change";
      this.id = row.id;
    },
    //取消
    close(){
      this.dialogFormVisible = false;
      this.changeFont = "";
    },
    /**
     * 删除
     */
    handleDelete($index,row){
      axios.get('/api/del',{params:{id:row.id}}).then(res=>{
        if(res.data.code == 1){
          alert('删除成功')
          this.listreq() 
        }
      })
    },
    handleAdd(){
      this.dialogFormVisible=true
    },
    /**
     * 模糊搜索
     */
    change(){
      axios.post('/api/search',{username:this.val}).then(res=>{
      this.tableData = res.data;
    })
    },
    /**
     * 分页器
     */
    listreq(){
        axios.get('/api/list').then(res=>{
          this.tableData = res.data.data.data
        })
    },
    handleSizeChange(val) {
        this.limit = val;
        this.pageNum = 1;
        this.listreq()
      },
    handleCurrentChange(val) {
        this.pageNum = val;
        this.listreq()
    }
  },
  mounted(){
    this.listreq()
  }
}
</script>
