const { Article } = require('../../model/article');
const formidable = require('formidable');
const path = require('path');
module.exports = (req, res) => {
    const { id } = req.query;
    // 1.创建表单解析对象
    const form = new formidable.IncomingForm();
    // 2.配置上传文件的存放位置
    form.uploadDir = path.join(__dirname, '../../public/uploads');
    // 3.保留上传文件的后缀
    form.keepExtensions = true;
    // 4.解析表单
    form.parse(req, async(err, fields, files) => {
        const { title, publishDate, content } = fields;
        const cover = files.cover.path.split('public')[1];
        await Article.updateOne({ _id: id }, {
            title,
            publishDate,
            content,
            cover
        })
    });
    res.redirect('/admin/article');
}