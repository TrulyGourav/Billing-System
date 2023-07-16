const Order = require("../model/Order");

const orders = async(req, res)=>{
    try {
        // Fetch all orders
        const orders = await Order.find();
    
        res.status(200).json(orders);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

module.exports = {orders};