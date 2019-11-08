/**
 * 引入模块
 */
const Koa = require('koa')

const child_process = require('child_process')

let app = new Koa()

app.use(__dirname,process)

/**
 * 创建子进程
 */
let child = child_process.exec('node child.js',(req,res)=>{
    console.log(res)

    /**
     * 判断方法
     */
    if(res.data){
        this.$router.push('/child.js')
    }else{
        console.log('错误')
    }
    if(list == username&&password){
        this.$router.push('/child.js')
    }else{
        console.log('信息错误')
    }
})