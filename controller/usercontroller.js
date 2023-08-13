const {Model, where} = require("sequelize");
const model = require("../models");
const bcrypt = require("bcryptjs");
const {v4: uuidv4} = require("uuid");
const addUsers = model.users;
const Renters = model.renters;

var generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//Registering user API
const addUser = async (req, res) => {
	let repassword = req.body.repassword;
	let info = {
		landlord_id: uuidv4(),
		username: req.body.username,
		email: req.body.email,
		phoneNumber: req.body.phonenumber,
		password: req.body.password,
	};
	console.log(info);
	if (
		info.email.length &&
		info.username.length &&
		info.password.length &&
		info.phoneNumber.length
	) {
		if (info.password == repassword) {
			addUsers
				.findOne({
					where: {
						email: info.email,
					},
				})
				.then(function (user) {
					if (user) {
						res.status(300).json({Message: "Email is already in use"});
					} else {
						info.password = generateHash(info.password);
						const user = addUsers.create(info);
						res.status(200).json(user.landlord_id);
					}
				});
		} else {
			res.status(400).json({Message: "rePassword does not match"});
		}
	} else {
		res.status(300).json({Message: "Empty Field"});
	}
};

//Login API
const loginUser = function (req, res) {
	let info = {
		email: req.body.email,
		password: req.body.password,
	};

	const validateUser = function (password, userpassword) {
		return bcrypt.compareSync(password, userpassword);
	};

	if (info.email && info.password) {
		addUsers
			.findOne({
				where: {
					email: info.email,
				},
			})
			.then(function (user) {
				if (!user) {
					res.status(400).json({Message: "Invalid Email"});
				} else if (!validateUser(info.password, user.password)) {
					res.status(400).json({Message: "Password wrong"});
				} else {
					res.status(200).json(user.landlord_id);
				}
			});
	} else {
		res.status(300).json({Message: "Empty Field"});
	}
};

//add renters
const addRenters = function (req, res) {
	let info = {
		renter_id: uuidv4(),
		name: req.body.renter_name,
		email: req.body.email,
		phonenumber: req.body.phonenumber,
		houseId: req.body.houseId,
		landlordId: req.body.landlord_id,
		rent: req.body.rent,
		EBCharge: req.body.EBcharge,
		currentReading: req.body.currentReading,
		lastReading: req.body.currentReading,
		miscellaneousAmount: req.body.miscellaneous,
	};
	if (!info.landlordId) {
		res.status.json({Message: "no landlordId is recieved"});
	}
	if (
		info.name.length &&
		info.email.length &&
		info.phonenumber.length &&
		info.houseId.length &&
		info.landlordId.length &&
		info.rent.length &&
		info.EBCharge.length &&
		info.currentReading.length
	) {
		Renters.findOne({
			where: {
				houseId: info.houseId,
			},
		}).then((user) => {
			if (user) {
				res.status(400).json({Message: "renter Already registered"});
			} else {
				const addRenter = Renters.create(info);
				res.status(200).json({Message: "Successfully renter added"});
			}
		});
	} else {
		res.status(400).json({
			Message: "Provide all the fields",
		});
	}
};

const deleteUser = async function (req, res) {
	const info = {
		landlordId: req.body.landlordId,
		renter_id: req.body.renterId,
	};
	console.log(info.landlordId, info.renter_id);
	if (info.landlordId && info.renter_id) {
		Renters.findOne({
			where: {
				landlordId: info.landlordId,
				renter_id: info.renter_id,
			},
		}).then(async (user) => {
			if (!user) {
				res.status(300).json({Message: "No such user found"});
			} else {
				await user.destroy();
				res.status(200).json({Message: "Successfully deleted the user"});
			}
		});
	} else {
		res.status(400).json({Message: "data not found"});
	}
};

//homescreen
const homescreen = async function (req, res) {
	const renters = await Renters.findAll();
	res.status(200).json(renters);
};

//Generate Bill
const generateBill = function () {
	let info = {
		renterId: req.body.renterId,
		landlordId: req.body.landlordId,
		currentReading: req.body.currentReading,
	};
	if (
		info.renterId.length &&
		info.landlordId.length &&
		info.currentReading.length
	) {
		Renters.findOne({
			where: {
				renter_id: info.renterId,
				landlordId: info.landlordId,
			},
		}).then(async (user) => {
			if (!user) {
				res.status(400).json({Message: "No user found"});
			} else {
				try {
					await user.update({
						currentReading: info.currentReading,
					});
					await user.save();
					res.status(200).json({Message: "Updated"});
				} catch (e) {
					res.status(501).json({Message: "something went wrong"});
				}
			}
		});
	}
};

module.exports = {
	addUser,
	loginUser,
	addRenters,
	deleteUser,
	homescreen,
	generateBill,
};
