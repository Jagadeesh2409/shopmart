const {OAuth2Client} =require('google-auth-library')

require('dotenv').config()

const client = new OAuth2Client({
    clientId:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    redirectUri:process.env.REDIRECT_URL
}
);

const sessionObj = {
    secret: process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : true, 
}


module.exports = {client,sessionObj};