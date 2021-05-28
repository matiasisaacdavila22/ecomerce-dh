const products = require('../data/productsDataBase.json')
const controller = {

    index: (req, res) => {
        console.log('home')
        return res.render('home', { 'products': products });
    }
}

module.exports = controller;