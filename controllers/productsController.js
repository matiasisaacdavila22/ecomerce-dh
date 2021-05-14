const { render } = require('ejs');
let jsonDatabaseP = require('../model/jsonDatabase');
let model = jsonDatabaseP('productsDataBase');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
     
	index: (req, res) => {
		let products = model.all();
		return res.render('product/listProducts', {products});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let product = model.find(req.params.id);
		return res.render('product/detailProduct', {product: product});
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product/createProduct');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		console.log(req.body)
		if(req.file){
			let productNew = req.body;  
			   model.create(productNew);
			   res.redirect('/product');
		 }else{
			return res.render('product/createProduct');
		 }
	},

	edit: (req, res) => {
		let product = model.find(req.params.id);
		return res.render('product/editProduct', {'product':product});
	},

	update: (req, res) => {
		console.log(req.body)
		let productUpdate = req.body;
        productUpdate.id = req.params.id;
        if(!productUpdate.file){
            productUpdate.file = model.find(req.params.id).file;
        }
        console.log(productUpdate);
        model.update(productUpdate);
        return res.redirect('/product');
	},

	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;