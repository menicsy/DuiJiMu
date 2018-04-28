var fs = require('fs');

// home.html 主页
function a(res) {

    // 读取home.html文件
    var content = fs.readFileSync('/duijimu/A.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(content);
    res.end();
}

// about.html 关于页面
function b(res) {

    // 读取home.html文件
    var content = fs.readFileSync('/duijimu/B.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(content);
    res.end();
}

// 导出页面处理函数
exports.a = a;
exports.b = b;