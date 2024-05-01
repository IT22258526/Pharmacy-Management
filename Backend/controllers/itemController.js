const itemModel = require('../models/itemModel');

// Get all items
 const getItemController =  async (_req,_res) =>{
    try{
        const items = await itemModel.find();
        _res.status(200).send(items);
    }catch(error){
        console.log(error)
        _res.status(500).send('Internal Server Error');
    }
};

// Add a new item
const addItemController = async (_req, _res) => {
    try {
        
        if ( !_req.body.name || !_req.body.price || !_req.body.category || !_req.body.image) {
            return _res.status(400).send('All fields are required');
        }

        const newItem = new itemModel(_req.body);
        await newItem.save();
        _res.status(201).send("Item created Successfully");
    } catch (error) {
        console.error(error);
        _res.status(500).send("Internal Server Error");
    }
};




//update item 
const editItemController = async (_req, _res) => {
    try {
        console.log('Request body:', _req.body);
        const updatedItem = await itemModel.findOneAndUpdate({ _id: _req.body.itemId }, _req.body, { new: true });
        console.log('Updated item:', updatedItem);
        _res.status(201).send("Item updated Successfully");
    } catch (error) {
        console.log('Error:', error);
        _res.status(500).send('Internal Server Error');
    }
};


//delete item
const deleteItemController = async (_req, _res) => {
    try {
        const {itemId} = _req.body;
        await itemModel.findOneAndDelete({ _id:itemId });
        
        _res.status(200).send("Item Deleted Successfully");
    } catch (error) {
        console.log('Error:', error);
        _res.status(500).send('Internal Server Error');
    }
};

module.exports = {getItemController,addItemController,editItemController,deleteItemController};