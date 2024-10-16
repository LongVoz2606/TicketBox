const getHomepage = (req, res) =>{
    // process data
    res.render('index.ejs')
}

module.exports = {
    getHomepage
}