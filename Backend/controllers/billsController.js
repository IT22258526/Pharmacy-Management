const Bills = require('../models/billsModel');

const addBillsController = async (req, res) => {
  try {
    const { invoiceNumber, date, totalAmount, tax, paymentMethod, billItems } = req.body;

    
    if (!invoiceNumber || !date || !totalAmount || !tax || !paymentMethod || !billItems || billItems.length === 0) {
      return res.status(400).send('All fields are required');
    }

    // Create a new bill
    const newBill = new Bills({
      invoiceNumber,
      date,
      totalAmount,
      tax,
      paymentMethod,
      billItems
    });

    await newBill.save();
    res.status(201).send("Bill created Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


//get bills data
const getBillsController =async(_req, _res) =>{
    try{
        const bills = await Bills.find(); 
        _res.status(200).send(bills);

    }catch(error){
        console.log(error)
        _res.status(500).send('Internal Server Error');
    }
};

module.exports = { addBillsController, getBillsController };
