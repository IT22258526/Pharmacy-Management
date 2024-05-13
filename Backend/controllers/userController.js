const userModel = require('../models/userModel');

const loginController = async (_req, _res) => {
    try {
        const { userId, password } = _req.body;
        const user = await userModel.findOne({ userId, password }); // corrected: ensure both userId and password match
        if (user) {
            _res.status(200).send(user);
        } else {
            _res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.log(error);
        _res.status(500).send('Internal Server Error');
    }
};



const registerController = async (_req, _res) => {
    try {
        const newUser = new userModel({..._req.body,verified: true});
        await newUser.save();
        _res.status(201).send("New User added Successfully");
    } catch (error) {
        console.log(error);
        _res.status(500).send('Internal Server Error');
    }
};

module.exports = { loginController, registerController }; // Export both controllers
