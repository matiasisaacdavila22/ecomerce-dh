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
			req.body.condition = 1;
		  if(!req.file){
			req.body.file = 'default.png';
		  }
		  if(req.file){
			req.body.file = req.file.filename;
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
		let errors = validationResult(req);
		let userUpdate = req.body;
        userUpdate.id = req.params.id;
		if(req.file){
			userUpdate.file = req.file.filename;
		}
        if(!req.file){
            userUpdate.file = model.find(req.params.id).file;
        }
        console.log(userUpdate);
		if(errors.isEmpty()){
			model.update(userUpdate);
			return res.redirect('home');
		}
		console.log(errors)
			return res.render(`user/editUser`, {errors: errors.mapped(), 'user':userUpdate});	
	},

	delete : (req, res) => {

	}
};

module.exports = controller;