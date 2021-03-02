const { User } = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports = async(req, res, next) => {
    const { password, email, username, role, state } = req.body;
    const { id } = req.query;

    let user = await User.findOne({ _id: id });
    const isValidate = await bcrypt.compare(password, user.password);
    // console.log(isValidate);

    if (isValidate) {
        await User.updateOne({ _id: id }, {
            username,
            email,
            role,
            state
        });
        res.redirect('/admin/user');
    } else {

        next(JSON.stringify({ path: '/admin/user-edit', message: '密码比对失败不能进行用户信息的修改', id: id }));
        // res.send('密码比对失败');
    }

};