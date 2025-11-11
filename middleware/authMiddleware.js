const {ErrorResponse,SucessResponse,response} = require('../utils/response')
const jwt = require('jsonwebtoken');
require('dotenv').config();


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return ErrorResponse(res, response.MISSING_TOKEN, 401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return ErrorResponse(res, response.UNAUTHORIZED, 403);
        }
        if(user.status == 'BLOCKED'){
            return ErrorResponse(res,response.BLOCK, 403);
        }
        req.user = user;
        next();
    });
};


const adminAuthenticate = (req, res, next) => {
    if (!req.user || !req.user.is_admin) {
        return ErrorResponse(res, response.UNAUTHORIZED, 403);
    }
    next();
};



module.exports = { authenticateToken,adminAuthenticate };


