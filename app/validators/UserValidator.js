"use strict";
const Joi = require("joi");
const {validate} = require("../utils/helpers")
const {STATUS} = require("../utils/constants")

exports.create =async(body)=>{

    let schema ={
        username:Joi.string().required(),
        password:Joi.string().required(),
        status:Joi.string()
        .valid(STATUS.ACTIVE,
            STATUS.INACTIVE)
            .default(STATUS.ACTIVE)    
    }
return validate(schema, body)
}