"use strict";
const mongoose = require("mongoose")
const mongoosePaginate =  require("mongoose-paginate")
const dayjs = require("dayjs")


const schema = new mongoose.Schema({
    blogTitle:{
        type:String,
        trim: true,
        required: true
    },
    author:{
     type:String,
     trim: true,
     required: true
    },
    blogDate:{
        type:String,
        trim: true,
        required: true
    },
    featuredImage:{
        type: [Object],
        required: true
    },
    blogContent:{
        type: String,
        trim: true,
        required: true

    }
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id.toString();
            ret.createdAt = dayjs(ret.createdAt)
                .unix();
            ret.updatedAt = dayjs(ret.updatedAt)
                .unix();
            delete ret.__v;
            delete ret._id;
        }
    },
    strict: false,
    timestamps: true


})

schema.plugin(mongoosePaginate);
module.exports = mongoose.model("Blog", schema);
