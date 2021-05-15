const { render } = require('ejs');
const { validationResult } = require('express-validator');
let jsonDatabaseP = require('../model/jsonDatabase');
let model = jsonDatabaseP('userDataBase')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
    create: (req, res) => {
		
        return res.render('user/register');
    },

	store: (req, res) => {	
		let errors = validationResult(req);
		if(errors.isEmpty()){
		  if(!req.body.file){
			req.body.file = 'default.png';
		  }
		  let userNew = req.body;	
		  req.body.condition = 1;
		  model.create(userNew);
		  return res.render('user/login');
		}
		return res.render('user/register', {errors: errors.mapped(), old:req.body});

	},
	login: (req, res) => {
			return	res.render('user/login');
	},
	loguear: (req, res) => {
		let errors = validationResult(req);
		console.log(errors)
			if(errors.isEmpty()){
			return	res.redirect('/product');
			}
		return res.render('user/login', {errors:errors.mapped()})
	},

	list: (req, res) => {
		let users = model.all();
		return res.render('user/userList', {users:users});
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