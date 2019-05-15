var http = require('http');

var querystring = require('querystring');

var url = require('url');

http.createServer(function (req, res) {

     res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});  

    var postData = "";

    req.on('data', function (chunk) {    //接收数据（表单里面的）

        postData += chunk;
		
    });

    req.on('end', function () {

        var c="1+1+1";

        var get=url.parse(req.url,true).query;  //解析url并返回对象及属性

        var post=querystring.parse(postData);

        if(get.act=="cal"){

            c=post.c;

            res.write(c+"="+eval(c));

        }
  
        res.write('<form method="post" action="?act=cal" >');   //使用表单

        res.write('式子：<input name="c" type="text" value="'+c+'" />');

        res.write('<input type="submit" value="计算" /></form>');

        res.end();

    });

}).listen(3000);
