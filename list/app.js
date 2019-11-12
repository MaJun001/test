const Koa = require('koa');

const app = new Koa();

const static = require('koa-static');

const path = require('path');

const bodyparser = require('koa-bodyparser');

const router = require('koa-router')();

const query = require('./db/query');

app.use(static(path.join(process.cwd(),'public')));

app.use(bodyparser());

app.use(router.routes());

app.use(router.allowedMethods());

/**
 * 查询
 */
router.get('/api/list',async ctx => {
    let data = await query('select * from list');
    if(data.msg === 'error'){
        ctx.body = {
            code:0,
            msg:error
        }
    }else{
        ctx.body = {
            code:1,
            data
        }
    } 
})

router.post('/api/add',async ctx => {
    let {remark,type} = ctx.request.body;
    if(remark && type){
        let userData = await query('select * from list where remark=?',[remark]);
        if(userData.data.length){
            ctx.body = {
                code:3,
                msg:'已存在'
            }
        }else{
            let create_time = new Date();
            try{
                await query('insert into list (remark,type,create_time) values (?,?,?)',[remark,type,create_time])
                ctx.body = {
                    code:1,
                    msg:'添加成功'
                }
            }catch(e){
                ctx.body = {
                    code:0,
                    msg:e.error
                }
            }
        }
    }else{
        ctx.body = {
            code:2,
            msg:'参数丢失'
        }
    }    
})


/**
 * 删除
 */
router.get('/api/del',async ctx => {
    let {id} = ctx.query;
    if(id || id === 0){
        try{
            await query('delete from list where id=?',[id]);
            ctx.body = {
                code:1,
                msg:'删除成功'
            }
        }catch(e){
            ctx.body = {
                code:0,
                msg:e.error
            }
        }
    }else{
        ctx.body = {
            code:2,
            msg:'参数丢失'
        }
    }
})

/**
 * 修改
 */
router.post('/api/edit',async ctx => {
    let {remark,type,id} = ctx.request.body;
    if(remark && type && id){
        try{
            let create_time = new Date();
            await query('update list set remark=?,type=?,create_time=? where id=?',[remark,type,create_time,id])
            ctx.body = {
                code:1,
                msg:'修改成功'
            }
        }catch(e){
            ctx.body = {
                code:0,
                msg:e.error
            }
        }
    }else{
        ctx.body = {
            code:2,
            mgs:'参数丢失'
        }
    }
})


app.listen(process.env.PORT || 3000,() => {
    console.log("服务器启动成功")
}) 