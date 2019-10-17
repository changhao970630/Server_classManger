const mongoose = require("mongoose")
const {Schema} = require('mongoose')
mongoose.set('useCreateIndex',true)
const userModal = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    nick_name:{
        type: String,
        required: true,
    },
    password:{
        type:String,
        required:true,
    },
    identity:{
        type:Number,
        required:true,
    },
    create_date:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:Number,
        default: 1
    }
})
module.exports = mongoose.model('user',userModal)
