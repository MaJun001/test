const http = require('http');

const fs = require('fs');

let type = {
    '/json':'application/json',
    '/txt':'text/plain',
    '/jpg':'image/jpeg'
}

const server = http.createServer((req,res) => {
    res.writeHead(200,{'Content-Type':type[req.url]});
    if(req.url === '/json'){
        res.end(JSON.stringify({code:1,list:[1,2,3]}))
    }else if(req.url === '/txt'){
        res.end('txt')
    }else if(req.url === '/jpg'){
        let img = fs.readFileSync('./1.jpg');
        res.end(img)
    }else{
        res.end("ok")
    }
})

server.listen(process.env.PORT || 3000, () => {
    console.log('服务启动成功')
})