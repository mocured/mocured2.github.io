const http = require("http");
const fs = require("fs");
// const uname = require("os").userInfo().username;
const host = require("os").hostname();
const dns = require('dns');
const date = new Date();
  
http.createServer(function(request, response){
    // получаем путь после слеша
    const filePath = request.url.substr(1);
    // смотрим, есть ли такой файл
    fs.access(filePath, fs.constants.R_OK, err => {
        // если произошла ошибка - отправляем статусный код 404
        if(err){
            response.statusCode = 404;
            response.end("Resourse not found!");
        }
        else{
            console.log(`${date.toString()} Запрошенный адрес: ${request.url} (${request.connection.remoteAddress})`);
            fs.createReadStream(filePath).pipe(response);
        }
      });
}).listen(1000, function(){
    console.log(`${date.toString()} Server started at 1000`);
});