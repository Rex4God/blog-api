"use strict";
const {StatusCodes} = require("http-status-codes")
const blogValidator = require("../validators/BlogValidator")
const blogRepository = require("../repositories/BlogRepository")
const {resolveRequestQueryToMongoDBQuery} = require("../utils/helpers");

exports.createBlog=async(body)=>{
    try{
 const validatorError = await blogValidator.createBlog(body)
 if(validatorError)return{
    statusCode:StatusCodes.UNPROCESSABLE_ENTITY,
    error:validatorError,
 }
 const blog = await blogRepository.create({
        blogTitle:body.blogTitle,
        author:body.author,
        blogDate:body.blogDate,
        featuredImage:body.featuredImage,
        blogContent:body.blogContent
 })
 return{
     data:blog._id.toString(),
     statusCode: StatusCodes.CREATED
 };
    }catch(e){
        console.log("error when creating a  blog", e);
        return {
            error: e.message,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR
        };
    }

};
exports.getBlog = async (blogId) => {
    let blog = await blogRepository.findOne({
        _id: blogId,
    });

    if (!blog) {
        return {
            error: "Oops! We could not find this blog post on this platform.",
            statusCode: StatusCodes.NOT_FOUND
        };
    }
    return {
        data: blog,
        statusCode: StatusCodes.OK
    };
};
exports.getBlogs = async (requestParams) => {
    const {
        filter,
        limit,
        page,
        sort
    } = resolveRequestQueryToMongoDBQuery(requestParams);

    const blogs = await blogRepository.all(filter, sort, page, limit);

    return {
        data: blogs,
        statusCode: StatusCodes.OK
    };
};
exports.updateBlog = async (body, blogId) => {
    try {
        const validatorError = await blogValidator.updateBlog(body);

        if (validatorError) return {
            error: validatorError,
            statusCode: StatusCodes.UNPROCESSABLE_ENTITY
        };

        let blog = await blogRepository.findOne({_id: blogId});

        if (!blog) {
            return {
                error: "Oops! We could not find this blog post on this platform.",
                statusCode: StatusCodes.NOT_FOUND
            };
        }
        const update = {
            blogTitle:body.blogTitle || blog.blogTitle,
            author:body.author       || blog.author,
            blogDate:body.blogDate   || blog.blogDate,
            featuredImage:body.featuredImage ||blog.featuredImage,
            blogContent:body.blogContent ||blog.blogContent
        };

        await blogRepository.update({_id: blogId}, update);

        return {
            data: blogId,
            statusCode: StatusCodes.ACCEPTED
        };
    } catch (e) {
        console.log("Error while trying to update blog", e);

        return {
            error: e.message,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR
        };
    }
};
exports.deleteBlog = async (blogId) => {
    await blogRepository.deleteMany({
        _id: blogId,
    });

    return {
        data: blogId,
        statusCode: StatusCodes.ACCEPTED,
    };
};