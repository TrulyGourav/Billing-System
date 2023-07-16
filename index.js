const express = require('express');
const mongoose = require('mongoose');
const userRouter = require("./src/routes/UserRoute");
const adminRouter = require('./src/routes/AdminRoute');
const User = require('./src/model/User');
const productRouter = require('./src/routes/ProductRoute');
const cartRouter = require('./src/routes/CartRoute');
const serviceRouter = require('./src/routes/ServiceRoute');
const orderRouter = require('./src/routes/OrderRoute')


const app = express();
const port = 3000;

app.use(express.json());

//defining routes
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/admin", adminRouter);
app.use("/cart", cartRouter);
app.use("/service", serviceRouter);
app.use("/order", orderRouter);

app.get('/', (req, res) => {
  res.send("<center></br></br><h2>Billing System Backend Using Nodejs </br></br> ~Intern Selection Task~</h2></br></br></center>");
});

try{
  mongoose.connect("mongodb://0.0.0.0:27017/billing").
  then(()=>{
      console.log("connection successful")
      app.listen(port, () => {
          console.log(`Server listening on port ${port}`);
        });
  })
}catch(error){
  console.log(error);
}
