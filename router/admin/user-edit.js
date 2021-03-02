const { User } = require('../../model/user');
module.exports = async(req, res) => {

    req.app.locals.currentLink = 'user';

    const { message, id } = req.query;
    let user = await User.findOne({ _id: id });
    if (id) {
        res.render('admin/user-edit', {
            message: message,
            user: user,
            button: '修改',
            link: `/admin/user-modify?id=${id}`
        });
    } else {
        res.render('admin/user-edit', {
            message: message,
            button: '提交',
            link: '/admin/user-edit'
        });
    }

};