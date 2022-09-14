"use strict";
const userService= require("../services/UserService");
const response = require("../utils/responses");

exports.create = async (req, res) => {
    const {
        error,
        statusCode,
        data
    } = await userService.create(req.body);

    if (error) return response.error(res, error, statusCode);

    return response.success(res, data, statusCode);
};

exports.login =async(req, res)=>{
    const{
        error,
        statusCode,
        data
    } = await userService.login(req.body)

    if(error) return response.error(res, error, statusCode);

    return response.success(res, data, statusCode)
}

exports.fetchAdmins =async(req, res)=>{
    const{
    error,
    data,
    statusCode
    } = await userService.fetchAdmins(req. query)

    if(error) return response.error(res, error, statusCode)

    return response.paginated(res, data, statusCode)

};
exports.updateAdmin =async(req, res)=>{
    const{
        error,
        data,
        statusCode
         } = await userService.updateAdmin(req.body, req.params.adminId)

         if(error) return response.error(res, error, statusCode)
         
         return response.success(res, data, statusCode)
}
exports.getAdmin =async(req, res)=>{
const{
    error,
    data,
    statusCode
    } = await userService.getAdmin(req.params.adminId)

    if(error) return response.error(res, error, statusCode)

    return response.success(res,data, statusCode )
}
exports.deleteAdmin = async (req, res) => {
    const {
        data,
        error,
        statusCode
    } = await userService.deleteAdmin(req.params.adminId);

    if (error) return response.error(res, error, statusCode);

    return response.success(res, data, statusCode);
};
