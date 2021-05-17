const { render } = require('ejs');
let jsonDatabaseP = require('../model/jsonDatabase');
let model = jsonDatabaseP('productsDataBase');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const {validationResult} = require('express-validator')

const controller = {
     
	index: (req, res) => {
		let products = model.all();
		return res.render('product/listProducts', {products});
	},

	detail: (req, res) => {
		let product = model.find(req.params.id);
		return res.render('product/detailProduct', {product: product});
	},

	create: (req, res) => {
		res.render('product/createProduct');
	},
	
	store: (req, res) => {
		let errors = validationResult(req);
		if(errors.isEmpty()){
			req.body.condition = 1;
			let productNew = req.body; 	
		     model.create(productNew);
			return res.redirect('/product');
		}
		return res.render('product/createProduct', {errors: errors.mapped(), old:req.body});
    },

	edit: (req, res) => {
		let product = model.find(req.params.id);
		return res.render('product/editProduct', {'product':product});
	},

	update: (req, res) => {
		let errors = validationResult(req);
		let productUpdate = {
			category: req.body.category,
			name: req.body.name,
			description: req.body.description,
			stock:req.body.stock,
			price: req.body.price,
			id: req.params.id
		}
		if(req.file){
		 productUpdate.file = req.file.filename;
		}
		if(!req.file){
			productUpdate.file = model.find(req.params.id).file;
		}
	
		console.log(productUpdate)
		if(errors.isEmpty()){
			model.update(productUpdate);
			return res.redirect('/product');
		}	
		console.log(errors)
			return res.render(`product/editProduct`, {errors: errors.mapped(), 'product':productUpdate});	
 
	},

	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;