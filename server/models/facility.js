const mongoose = require("mongoose");

const facilitySchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        location:{
            type:String, 
            required:true,
        },
        available:{
            type:Boolean,
            default:true,
        },
        capacity:{
            type:Number,
            required:true,
        },
        price:{
            type:Number,
            required:true,
        },
        image:{
            type: [String],
            required:false,
        },
        reserved:[
            {
                userId:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"User",
                },
                date:{
                    type:Date,
                    required:true,
                },
            },
        ]

    },{timestamps:true},
);

const Facility = mongoose.model("Facility", facilitySchema);

module.exports = Facility;