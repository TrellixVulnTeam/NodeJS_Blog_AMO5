const { Article } = require('../../model/article');
// 导入评论集合构造函数
const { Comment } = require('../../model/comment');
module.exports = async(req, res) => {

    req.app.locals.sign = 'home_article';

    const { id } = req.query;
    // res.send(id);

    let article = JSON.parse(JSON.stringify(await Article.findOne({ _id: id }).populate('author')));
    // res.send(article);
    // 查询当前文章所对应的评论信息
    let comments = JSON.parse(JSON.stringify(await Comment.find({ aid: id }).populate('uid')));;
    // res.send(comments);

    res.render('home/article', {
        article: article,
        comments: comments
    });

};