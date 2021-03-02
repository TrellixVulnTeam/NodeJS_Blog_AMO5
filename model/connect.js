const mongoose = require('mongoose');
const config = require('config');
// console.log(config.get('db.pwd'));
mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => { console.log('数据库连接成功') })
    .catch(() => { console.log('数据库连接失败') })