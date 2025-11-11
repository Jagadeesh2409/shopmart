const SucessResponse = (res, data, message = "Success") => {
  return res.status(200).json({ message, data });
};
const ErrorResponse = (res, error, statusCode = 500) => {
  return res.status(statusCode).json({ error });
};

const response = {

    ISE:"",

    ALREADY_REGISTERED:"",
    REGISTER_SUCCESS:"",

    USER_NOT_FOUND:"",
    INVALID_LOGIN:"",
    LOGIN_SUCCESS:"",
    
    PROFILE_GET_SUCCESS:"",
    PROFILE_GET_FAILED:"",



};

module.exports = { SucessResponse, ErrorResponse, response };
