const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const itemSchema = mongoose.Schema({
    itemId: {
        type: String,
        default: uuidv4, 
        unique: true 
    },
   
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type:String,

        required:true
    },
},
{ timestamps:true}
);



const Items = mongoose.model("Medicines",itemSchema);


module.exports = Items;


