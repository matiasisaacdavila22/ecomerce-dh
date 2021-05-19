const { render } = require('ejs');
const { validationResult } = require('express-validator');
let jsonDatabaseP = require('../model/jsonDatabase');
let model = jsonDatabaseP('userDataBase')
const bcrypt = require('bcryptjs');

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
		  let userNew = {
			  ...req.body,	
		   condition: 1,
		   password : bcrypt.hashSync(req.body.password, 10)
		  }
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
				userLoguear = model.findemail(req.body.userName);
				if(userLoguear){
					password = req.body.password;
					if(bcrypt.compareSync(password, userLoguear.password)){
						delete userLoguear.password;
						req.session.userLogueado = userLoguear;
						if(req.body.remember != undefined){
							res.cookie('userEmail', userLoguear.email, {maxAge: (100 * 60)*10 })
						}
						return	res.redirect('/product');
					}else{
					let	error = {
					        	msg:'Usuario o passware Incorrecto!!'
					            }						
					return res.render('user/login', {error:error})	
							}					
					}else{
						let	error = {
							msg:'Usuario o passware Incorrecto!!'
							}

						return res.render('user/login', {error:error})
					}
				}
				return res.render('user/login', {errors:errors.mapped()})
		
	},

	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return	res.redirect('/');
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