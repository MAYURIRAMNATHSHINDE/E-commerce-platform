const express=require("express")
const { ConnectToDB } = require("./config/mongo.config")
const router = require("./routes/user.routes")
const { productRoutes } = require("./routes/product.routes")
const cartRoutes = require("./routes/cart.routes")
const paymentRoutes = require("./routes/payment.routes")
require("dotenv").config()


app=express()

app.use(express.static('frontend'));
app.use(express.json())
app.use("/user",router)
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/payment', paymentRoutes);

// app.use(express.urlencoded({ extended: true }));
// app.use(session({ secret: 'secretKey', resave: false, saveUninitialized: true }));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/index.html');
});

PORT=process.env.PORT

app.listen(PORT,()=>{
    ConnectToDB()
    console.log("server is running on port 3000")
})