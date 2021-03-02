const { Article } = require('../../model/article');
const pagination = require('mongoose-sex-page');
module.exports = async(req, res) => {
    req.app.locals.sign = 'home_article';
    let { page } = req.query;
    let result = await pagination(Article).find().page(page).size(2).display(5).populate('author').exec();
    result = JSON.parse(JSON.stringify(result));
    res.render('home/default', { result: result });
};