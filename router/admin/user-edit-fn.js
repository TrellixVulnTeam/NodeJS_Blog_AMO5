const bcrypt = require('bcrypt');
const { nextTick } = require('process');

const { User, validateUser } = require('../../model/user');

module.exports = async(req, res, next) => {

    try {
        await validateUser(req.body);
    } catch (e) {
        // return res.redirect(`/admin/user-edit?message=${e.message}`);
        return next(JSON.stringify({ path: '/admin/user-edit', message: e.message }));
    };

    let user = await User.findOne({ email: req.body.email });

    if (user) {
        // return res.redirect(`/admin/user-edit?message=邮箱地址已近被占用`);
        return next(JSON.stringify({ path: '/admin/user-edit', message: '邮箱地址已近被占用' }));
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    await User.create(req.body);

    res.redirect('/admin/user');
};