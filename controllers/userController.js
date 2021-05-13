const { render } = require('ejs');
let jsonDatabaseP = require('../model/jsonDatabase');
let model = jsonDatabaseP('productsDataBase')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
    create: (req, res) => {
        return res.render('register');
    },

	store: (req, res) => {

		let userNew = req.body;	
		model.create(userNew);
		return res.render('user/login');

	},
	login: (req, res) => {
		return	res.render('user/login');
	},

	list: (req, res) => {
		return	res.send('list de user');
	},

	search: (req, res) => {
		return res.send('search de user');
	},
	
	
	edit: (req, res) => {
		let userSearch = model.find(req.params.id);
	   return res.render('userEdit',{userSearch: userSearch});
	},

	update: (req, res) => {

		let userUpdate = req.body;
        userUpdate.id = req.params.id;
        if(!userUpdate.image){
            userUpdate.image = model.find(req.params.id).image;
        }
        console.log(userUpdate);
        model.update(userUpdate);
        return res.redirect('home');
	},

	delete : (req, res) => {

	}
};

module.exports = controller;