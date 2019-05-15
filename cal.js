var http = require('http');

var querystring = require('querystring');

var url = require('url');

http.createServer(function (req, res) {

     res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});  

    var postData = "";

    req.on('data', function (chunk) {

        postData += chunk;

    });

    req.on('end', function () {

        var c="1+1+1";

        var get=url.parse(req.url,true).query;

        var post=querystring.parse(postData);

        if(get.act=="cal"){

            c=post.c;

            //res.write(c+"="+eval(c));//第一种方法

            res.write(c+"=<script>document.write(eval('"+c+"'))</script>");//第二方法

        }

         

        res.write('<form method="post" action="?act=cal" >');

        res.write('式子：<input name="c" type="text" value="'+c+'" />');

        res.write('<input type="submit" value="计算" /></form>');

        res.end();

    });

}).listen(3000, function () {

    console.log("listen on port 3000");

});
