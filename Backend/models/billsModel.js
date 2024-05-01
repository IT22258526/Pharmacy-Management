const mongoose = require('mongoose');


const billSchema = mongoose.Schema({
   
    invoiceNumber:{
        type:String,
        required:true
    },
    date:{
        type:Number,
        required:true
    },
    totalAmount:{
        type:Number,
        required:true
    },
    tax:{
        type:Number,
        required:true
    },
    paymentMethod:{
        type:String,
        required:true
    },
    billItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]

    
},
{ timestamps:true}
);



const Bills = mongoose.model("bills",billSchema);


module.exports = Bills;


