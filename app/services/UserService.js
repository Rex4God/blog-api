"use strict";
const {StatusCodes} = require("http-status-codes")
const userRepository = require("../repositories/UserRepository")
const userValidator = require("../validators/UserValidator")
const { BadRequestError, UnauthenticatedError } = require('../errors')
const {resolveRequestQueryToMongoDBQuery} = require("../utils/helpers");
const {STATUS} = require("../utils/constants")

exports.create =async(body)=>{
    try{
        const{username} =body
        const alreadyExistsUser = await userRepository.findOne( { username } ).catch(
            (err) => {
              console.log("Error: ",err);
            }
          );
        
          if (alreadyExistsUser) {
            return{
             error: "Admin Already exist in the database" 
          }
        }
        const validatorErrors = await userValidator.create(body);
        if(validatorErrors)return{
            statusCode:StatusCodes.UNPROCESSABLE_ENTITY,
            error:validatorErrors,
        };
        const user = await userRepository.create({ 
            username:body.username,
            password:body.password,
            status:body.status
         })
        const token = user.createJWT()
        return{
            data:{
                user:{
                 username:user.username,
                 status:user.status
                },
                token,
                data:user._id.toString()
            },
            statusCode:StatusCodes.CREATED
        };
    }catch(e){
        console.log("error when creating a  user", e);
        return {
            error: e.message,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR
        };
    }
};

exports.login =async(body)=>{
        const{username, password} =body
        if (!username || !password) {
            throw new BadRequestError('Please provide username and password')
        }
        const user = await userRepository.findOne({ username })
        if (!user) {
            throw new UnauthenticatedError('Admin not found in the Database')
        }
        const isPasswordCorrect = await user.comparePassword(password)
        if (!isPasswordCorrect) {
            throw new UnauthenticatedError('Invalid Credentials')
        }
        // compare password
        const token = user.createJWT()
        return{
            data:{
                user:{
                username:user.username,
                status:user.status,
                },
                token,
                data:user._id.toString()
            
            },
            statusCode:StatusCodes.CREATED
        };

        };

        exports.getAdmin =async(adminId)=>{
            let admin = await userRepository.findOne({
                _id: adminId
            })
            if(!admin) 
                return {
                    error: "Oops! We could not find this admin user on this platform.",
                    statusCode: StatusCodes.NOT_FOUND
                };
                return{
                    data: admin,
                    statusCode:StatusCodes.OK
                }
            };
        
        exports.fetchAdmins =async(requestParams)=>{
            const {
                filter,
                limit,
                page,
                sort
            } = resolveRequestQueryToMongoDBQuery(requestParams);
        
            const admins = await userRepository.all(filter, sort, page, limit);
        
            return {
                data: admins ,
                statusCode: StatusCodes.OK
            }
        };
        
        exports.updateAdmin = async(body,adminId)=>{
            try{
            await userRepository.update({
                _id:adminId,
                status:{$ne:STATUS.INACTIVE},
                 },
                {status:STATUS.INACTIVE});
        
                if(body.status===STATUS.ACTIVE){
                     await userRepository.update({
                        _id:adminId,
                     },
                     {status:STATUS.ACTIVE}
                     )    
                };
        
              return{
                data:adminId,
                statusCode: StatusCodes.OK
              }
             
            }catch(e){
                console.log("Error while trying to update admin status", e)
                return{
                error: e.message,
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR
                };
            }
        };

        exports.deleteAdmin = async (adminId) => {
            await userRepository.deleteMany({
                _id: adminId,
            });

            return {
                data: adminId,
                statusCode: StatusCodes.ACCEPTED
            };
        };




