var fs = require("fs");

var readerStream = fs.createReadStream('./1.jpg');

var writerStream = fs.createWriteStream('./2.jpg');

readerStream.pipe(writerStream);