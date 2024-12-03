const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema ({
    userid:{
        type:String,
        required: true,
    },
    personalDetails:{
        type: String,
        required: [true,'personalDetails is required'],
    },
    income:{
        type: String,
        requires:[true,'income is required'],
    },
    expenses:{
        type: Number,
        requires:[true,'expenses is required'],
    },
    assets:{
        type: String,
    },
    liabilities:{
        type: String,
    },
    date:{
        type: Date,
        required:[true,'data is required'],
    }
},{timestamps:true})

const applicationModel = mongoose.model('applications', applicationSchema);
module.exports =  applicationModel;