const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { colors } = require('colors');
require('colors');
const connectDb = require('./config/config.js');
const itemRoutes = require("./routes/itemRoutes");
const billsRoutes = require("./routes/billsRoutes");


dotenv.config();

connectDb();
const app = express();

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(morgan('dev'));



app.use("/api/items",require("./routes/itemRoutes"));
app.use("/api/bills",require("./routes/billsRoutes"));


const PORT = 3001;
//const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`.bgCyan.white);
});
