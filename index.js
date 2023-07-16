const express = require('express');
const mongoose = require('mongoose');
const userRouter = require("./src/routes/UserRoute");
const adminRouter = require('./src/routes/AdminRoute');
const User = require('./src/model/User');
const productRouter = require('./src/routes/ProductRoute');
const cartRouter = require('./src/routes/CartRoute');
const serviceRouter = require('./src/routes/ServiceRoute');


const app = express();
const port = 3000;

app.use(express.json());

//defining routes
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/admin", adminRouter);
app.use("/cart", cartRouter);
app.use("/service", serviceRouter);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

mongoose.connect("mongodb://0.0.0.0:27017/billing").
then(()=>{
    console.log("connection successful")
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
      });

      // const userData = {
      //   name: 'Admin',
      //   email: 'admin@example.com',
      //   password: 'admin123',
      // };
  
      // const newUser = new User (userData);
      // newUser.save()
      //   .then(() => {
      //     console.log('Data inserted successfully');
      //   })
      //   .catch((error) => {
      //     console.error('Error inserting data:', error);
      //   });

}).catch(
    (err)=> console.log(err)
)
