"use strict";
const Joi = require("joi")
const{validate} = require("../utils/helpers")

exports.createBlog =async(body)=>{
    let schema={
        blogTitle:Joi.string().required(),
        author:Joi.string(). required(),
        blogDate:Joi.string().required(),
        featuredImage:Joi.array().items(Joi.object({
            image: Joi.string().uri().required()
        })),
        blogContent:Joi.string().required()
    }
    return validate(schema, body)
}

exports.updateBlog=async(body)=>{
    let schema={
        blogTitle:Joi.string().required(),
        author:Joi.string(). required(),
        blogDate:Joi.string().required(),
        featuredImage:Joi.array().items(Joi.object({
            image: Joi.string().uri().required()
        })),
        blogContent:Joi.string().required()
    }
    return validate(schema, body)

}