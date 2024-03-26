const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	auth: {
		user: process.env.USERNAME_EMAIL,
		pass: process.env.PASSWORD_EMAIL,
	},
});

const handleSendMail = async (email) => {
    try {
		await transporter.sendMail(email);

		return 'OK';
	} catch (error) {
		return error;
	}
  };
  
  const verification = asyncHandler(async (req, res) => {
    const { email } = req.body;

	const verificationCode = Math.round(1000 + Math.random() * 9000);

	try {
		const data = {
			from: `"Support EventHub Appplication" <${process.env.USERNAME_EMAIL}>`,
			to: email,
			subject: 'Verification email code',
			text: 'Your code to verification email',
			html: `<h1>${verificationCode}</h1>`,
		};

		await handleSendMail(data);

		res.status(200).json({
			message: 'Send verification code successfully!!!',
			data: {
				code: verificationCode,
			},
		});
	} catch (error) {
		res.status(401);
		throw new Error('Can not send email');
	}
  });
  

const getJsonWebToken = (email, id) => {
    const payload = {
        email,
        id
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

};


const register = asyncHandler(async (req, res) => {
    const { fullname, email, password,photoUrl } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        return res.status(401).json({ message: 'Email đã tồn tại' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new UserModel({
        fullname,
        email,
        photoUrl,
        password: hashedPassword
    });

    await newUser.save();
    res.status(200).json({
        message: 'Đăng ký thành công',
        data:{
            id: newUser._id,
            fullname: newUser.fullname,
            email: newUser.email,
            photoUrl: newUser.photoUrl,
            accesstoken: getJsonWebToken(fullname, email, photoUrl, newUser._id)
        }
    })
});

const login = asyncHandler(async (req, res) => {
	const { email, password, fullname, photoUrl } = req.body;

	const existingUser = await UserModel.findOne({ email });

	if (!existingUser) {
		res.status(403);
		throw new Error('User not found!!!');
	}

	const isMatchPassword = await bcrypt.compare(password, existingUser.password);

	if (!isMatchPassword) {
		res.status(401);
		throw new Error('Email or Password is not correct!');
	}

	res.status(200).json({
		message: 'Login successfully',
		data: {
			id: existingUser.id,
			email: existingUser.email,
			fullname: existingUser.fullname,
			photoUrl: existingUser.photoUrl,
			accesstoken: await getJsonWebToken(email, existingUser.id, fullname, photoUrl),
		},
	});
});


module.exports = {
    register, login, verification
};