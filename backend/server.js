const express = require("express");
const cors = require("cors");

const db = require('./config/db');

require("dotenv").config();

const authRouters = require('./routes/authRouters');
const recruiterRouter = require('./routes/recruiterRouters');
const recruiterJobRouter = require('./routes/recuiterJobRouter');
const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));


app.use('/recruiter' , recruiterRouter);
app.use('/' , authRouters);
app.use('/recruiter/job', recruiterJobRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});