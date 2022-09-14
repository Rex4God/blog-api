"use strict";
const response = require("../utils/responses");
const blogService = require("../services/BlogService");

exports.createBlog = async (req, res) => {
    const {
        error,
        data,
        statusCode
    } = await blogService.createBlog(req.body);

    if (error) return response.error(res, error, statusCode);

    return response.success(res, data, statusCode);
};
exports.getBlog = async (req, res) => {
    const {
        data,
        error,
        statusCode
    } = await blogService.getBlog(req.params.blogId);

    if (error) return response.error(res, error, statusCode);

    return response.success(res, data, statusCode);
};

exports.getBlogs = async (req, res) => {
    const {
        error,
        data,
        statusCode
    } = await blogService.getBlogs(req.query);

    if (error) return response.error(res, error, statusCode);

    return response.paginated(res, data, statusCode);
};

exports.updateBlog = async (req, res) => {
    const {
        error,
        data,
        statusCode
    } = await blogService.updateBlog(req.body, req.params.blogId);

    if (error) return response.error(res, error, statusCode);

    return response.success(res, data, statusCode);
};
exports.deleteBlog = async (req, res) => {
    const {
        data,
        error,
        statusCode
    } = await blogService.deleteBlog(req.params.blogId);

    if (error) return response.error(res, error, statusCode);

    return response.success(res, data, statusCode);
};
