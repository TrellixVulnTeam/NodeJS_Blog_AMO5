const express = require('express');
const path = require('path');

// 导入art-tempate模板引擎
const template = require('art-template');
// 导入dateformat第三方模块
const dateFormat = require('dateformat');
// 导入morgan这个第三方模块
const morgan = require('morgan');
// 导入config模块
const config = require('config');

const app = express();

const bodyParser = require('body-parser');

const session = require('express-session');


require('./model/connect');
// require('./model/user')

app.use(session({ secret: 'secret key' }));

app.use(bodyParser.urlencoded({ extended: false }));

app.engine('art', require('express-art-template'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');
template.defaults.imports.dateFormat = dateFormat;

app.use(express.static(path.join(__dirname, 'public')));

console.log(config.get('title'))

// 获取系统环境变量 返回值是对象 
if (process.env.NODE_ENV == 'development') {
    // 当前是开发环境
    console.log('当前是开发环境')
        // 在开发环境中 将客户端发送到服务器端的请求信息打印到控制台中
    app.use(morgan('dev'))
} else {
    // 当前是生产环境
    console.log('当前是生产环境')
}

const home = require('./router/home');
const admin = require('./router/admin');

app.use('/admin', require('./middleware/loginGuard'));

app.use('/home', home);
app.use('/admin', admin);

app.use((err, req, res, next) => {
    const result = JSON.parse(err);
    let params = [];
    for (let arr in result) {
        if (arr != 'path') {
            params.push(arr + '=' + result[arr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
});


app.listen(80);

console.log('服务器启动成功，监听80端口号');