const child_process = require('child_process')

let child  = child_process.exec('node child.js',(error,stdout,stderr) => {
    if(error){
        throw error
    }
    console.log(stdout)
    console.log(stderr)
})

let child2 = child_process.spawn('node',['child.js'])

child2.stdout.on('data',(data) => {
    console.log(data)
})

const fs = require('fs');
for (var i = 0; i < 3; i++) {
 var childProcess = child_process.exec('node child.js '+i,
 function (error, stdout, stderr) {
  if (error) {
  console.log(error.stack);
  console.log('Error code: ' + error.code);
  console.log('Signal received: ' + error.signal);
  }
  console.log('stdout: ' + stdout);
  console.log('stderr: ' + stderr);
 });
 childProcess.on('exit', function (code) {
 console.log('子进程已退出，退出码 ' + code);
 });
}