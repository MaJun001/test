const mysql = require('mysql');

const connection = mysql.createConnection({
    user:'root',
    password:'root',
    host:'localhost',
    port:'3306',
    database:'yuekao_1029'
})

connection.connect((error) => {
    if(error){
        console.log("链接失败")
    }else{
        console.log("链接成功")
    }
})

module.exports = connection