const { User } = require('../../model/user');
module.exports = async(req, res) => {
    const { id } = req.query;
    await User.findOneAndDelete({ _id: id });
    res.redirect('/admin/user');

    // res.send('ok');
};