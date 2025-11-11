const db = require('../db/db');
const {ErrorResponse,SucessResponse,response} = require('../utils/response')
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const {client} = require('../config/googleConfig');


const registerUser = async (req,res) => {
    const {username,email,phone_number,password } = req.body;

    try{
        const existingUser = await db('users').where({email}).first();
        if(existingUser){
            ErrorResponse(res, response.ALREADY_REGISTERED, 400);
            return;
        }
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
        const password_hash = await bcrypt.hash(password, saltRounds);
        console.log(password_hash);
        const user = await db('users').insert({username,email,phone_number,password: password_hash});
        const userData = {
            id: user[0],
            username,
            email,
            phone_number
        }
        SucessResponse(res, userData, response.REGISTER_SUCCESS);

    }catch(error){
        console.error('Error registering user:', error);  
        ErrorResponse(res,response.ISE, 500);   
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db('users').where({ email }).first();
        if (!user) {
            return ErrorResponse(res, response.USER_NOT_FOUND, 404);
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return ErrorResponse(res, response.INVALID_LOGIN, 401);
        }
        const token = jwt.sign(
            { id: user.id, email: user.email, is_admin: user.is_admin, status: user.status },
            process.env.JWT_SECRET
        );
        SucessResponse(res, { token }, response.LOGIN_SUCCESS);

    } catch (error) {
        console.error('Error logging in user:', error);
        ErrorResponse(res, response.ISE, 500);
    }
    
};

const googleAuth = async (req,res)=>{
    const code = req.query.code;
    
    try {
        const {tokens} = await client.getToken(code);

        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const playload = ticket.getPayload();

        const exist = await db('users').where({email: playload.email}).first();
        if(!exist){
            const newUser = {
                username: playload.name,
                email: playload.email,
                google_id: playload.sub,
                is_email_verified: playload.email_verified,
                profile_img: playload.picture
            };
            const [id] = await db('users').insert(newUser);

            const data = await db('users').where({id}).first();

            const jwtToken = jwt.sign(
                { email: data.email, is_admin: data.is_admin, status: data.status },
                process.env.JWT_SECRET
            );
             SucessResponse(res, {token: jwtToken}, response.LOGIN_SUCCESS);
            return;
            
        }
        const jwtToken = jwt.sign(
            { email: playload.email, is_admin: exist ? exist.is_admin : false, status: exist.status },
            process.env.JWT_SECRET
        );
        SucessResponse(res, {token: jwtToken}, response.LOGIN_SUCCESS);
        
    } catch (error) {
        console.error(error);
        ErrorResponse(res,response.ISE)
    }
}

const loginWithGoogle = (req,res)=>{
    
    const url = client.generateAuthUrl({
        access_type: 'offline',
        scope: ['profile','email']
    });
    res.send('<a href="'+url+'">Authenticate with Google</a>');
    console.log(url);
}

const profile = async(req,res)=>{
    const id = req.user
    try {
        const user =  await db('users').where({id}).first()
    if(!user){
        ErrorResponse(res,response.PROFILE_GET_FAILED)

    }
    SucessResponse(res,user,response.PROFILE_GET_SUCCESS)
        
    } catch (error) {
        console.log(error.message)
        ErrorResponse(res,response.ISE)
        
    }
}

 
module.exports = {
    registerUser,loginUser,googleAuth,loginWithGoogle,profile
};

