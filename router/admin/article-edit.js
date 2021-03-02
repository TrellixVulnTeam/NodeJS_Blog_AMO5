const { Article } = require('../../model/article');
module.exports = async(req, res) => {

    req.app.locals.currentLink = 'article';
    let { id } = req.query;
    // res.send(id);
    let article = await Article.findOne({ _id: id });
    // res.send(article)
    if (id) {
        res.render('admin/article-edit', {
            article: article,
            button: '修改',
            link: `/admin/article-modify?id=${id}`
        });
    } else {
        res.render('admin/article-edit', {
            button: '提交',
            link: '/admin/article-add'
        });
    }




};