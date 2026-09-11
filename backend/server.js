const express = require("express");
const cors = require("cors");

const db = require('./config/db');

require("dotenv").config();

const authRouters = require('./routes/authRouters');

const app = express();

app.use(cors());
app.use(express.json());



app.use('/' , authRouters);

const PORT = process.env.PORT ;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});