require('dotenv').config()

const mongoose = require('mongoose');
const express = require('express');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

//Middlewares
app.use(bodyparser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
const authRoutes = require("./routes/auth");
const userRoute = require("./routes/user");
const categoryRoute = require("./routes/category");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const stripeRoutes = require("./routes/stripepayment");
const paymentBRoutes = require("./routes/paymentBRoutes");

//Database Connection
mongoose.connect(process.env.DATABASE,
 {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true,
    useFindAndModify: false 
 }).then(() => {
     console.log("DB CONNECTED")
 }); 

//My Routes
app.use("/api",authRoutes);
app.use("/api",userRoute);
app.use("/api",categoryRoute);
app.use("/api",productRoute);
app.use("/api",orderRoute);
app.use("/api",stripeRoutes);
app.use("/api",paymentBRoutes);


//Port
const port = process.env.PORT || 8000;

//Starting Server
app.listen(port, () => console.log(`App is running at ${port}`))