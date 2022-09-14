"use strict";
const mongoose =  require("mongoose");
const mongoosePaginate = require("mongoose-paginate")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dayjs = require("dayjs")
require("dotenv").config()
const {STATUS} = require("../utils/constants")


const schema = new mongoose.Schema({

      username:{
          type:String,
          trim:true,
          required:[true,'Please provide your username']
      },
      password:{
        type: String,
        required:[true, 'Please provide your password'],
        minlength: 6,
      },
      status:{
        type:String,
        enum:[ STATUS.ACTIVE, STATUS.INACTIVE],
        default: STATUS.ACTIVE
      }
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id.toString();
            delete ret.__v;
            delete ret._id;
        }
    },
    timestamps: true,
    strict: false,

});
schema.pre('save',async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

schema.methods.createJWT = function () {
    return jwt.sign(
      { userId: this._id, name: this.name },
      process.env.JWT_SECRET,
      {
        expiresIn:dayjs().add(12, "hour").unix()
      }
    )
  }
  schema.methods.comparePassword =async function(candidatePassword){
   const isMatch = await bcrypt.compare(candidatePassword, this.password)
   return isMatch
  }

schema.plugin(mongoosePaginate);
module.exports = mongoose.model("User", schema);
