const { User } = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports = async(req, res) => {

    const { email, password } = req.body;

    if (email.trim().length == 0 || password.trim().length == 0) {
        res.status(400).render('admin/error', { msg: '邮件地址或密码错误' });
    }
    let user = await User.findOne({ email: email });
    if (user) {
        // console.log(password);
        // console.log(user.password);
        let isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            req.session.username = user.username;
            // 将用户角色存储在session对象中
            req.session.role = user.role;
            // res.send('用户登录成功');
            // '用户登录成功后将用户信息存储到app.locals这个对象下面
            // 便于后面使用
            req.app.locals.userInfo = user;
            if (user.role == 'admin') {
                // 重定向到用户列表页面
                res.redirect('/admin/user');
            } else {
                // 重定向到博客首页
                res.redirect('/home/');
            }
        } else {
            res.status(400).render('admin/error', { msg: '邮件地址或密码错误' });
        }

    } else {
        res.status(400).render('admin/error', { msg: '邮件地址或密码错误' });
    }

}