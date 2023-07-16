const Cart = require("../model/Cart");
const Order = require("../model/Order");
const User = require("../model/User");

const confirmOrder = async (req, res)=>{
    try {
        const { userId } = req.params;
    
        // Find the user's cart and populate the items
        const cart = await Cart.findOne({ user: userId });
    
        if (!cart) {
          return res.status(404).json({ error: 'Cart not found' });
        }
    
        if (cart.items.length === 0) {
          return res.status(400).json({ error: 'Cart is empty. Cannot confirm an empty order.' });
        }
    
        // Get total cartPrice
        let cartPrice = 0;
        cart.items.forEach((item) => {
            let taxPercentage = 0;
            let flatTax = 0;            
      
            if (item.itemType === 'Product') {
              flatTax = 200;
              
              if (item.price > 1000 && item.price <= 5000) {
                taxPercentage = 0.12;
                const taxAmount = item.price * taxPercentage;
                const totalValue = item.price + taxAmount + flatTax;
                cartPrice += totalValue;
                return {
                  item: item,
                  price: item.price,
                  quantity: 1, 
                  PA: taxAmount,
                  PC: flatTax,
                  totalValue: totalValue,
                };
              } else if (item.price > 5000) {
                taxPercentage = 0.18;
                const taxAmount = item.price * taxPercentage;
                const totalValue = item.price + taxAmount + flatTax;
                cartPrice += totalValue;
                return {
                  item: item,
                  price: item.price,
                  quantity: 1, 
                  PB: taxAmount,
                  PC: flatTax,
                  totalValue: totalValue,
                };
              } else {
                taxPercentage = 0;
                const taxAmount = item.price * taxPercentage;
                const totalValue = item.price + taxAmount + flatTax;
                cartPrice += totalValue;
                return {
                  item: item,
                  price: item.price,
                  quantity: 1, 
                  PC: flatTax,
                  totalValue: totalValue,
                };
              }
            //if item is a service  
            } else if (item.itemType === 'Service') {
              flatTax = 100;
              if (item.price > 1000 && item.price <= 8000) {
                taxPercentage = 0.1;
                const taxAmount = item.price * taxPercentage;
                const totalValue = item.price + taxAmount + flatTax;
                cartPrice += totalValue;
                return {
                  item: item,
                  price: item.price,
                  quantity: 1, 
                  SA: taxAmount,
                  SC: flatTax,
                  totalValue: totalValue,
                };
              } else if (item.price > 8000) {
                taxPercentage = 0.15;
                const taxAmount = item.price * taxPercentage;
                const totalValue = item.price + taxAmount + flatTax;
                cartPrice += totalValue;
                return {
                  item: item,
                  price: item.price,
                  quantity: 1, 
                  SB: taxAmount,
                  SC: flatTax,
                  totalValue: totalValue,
                };
              } else {
                taxPercentage = 0;
                const taxAmount = item.price * taxPercentage;
                const totalValue = item.price + taxAmount + flatTax;
                cartPrice += totalValue;
                return {
                  item: item,
                  price: item.price,
                  quantity: 1, 
                  SC: flatTax,
                  totalValue: totalValue,
                };
              }
            }
        });
    
        // Confirm the order
        const order = new Order({
          totalPrice: cartPrice,
          items: cart.items,
        });

        // Save the new order
        await order.save();
    
        // Add the order to the User's orders field as a subdocument
        const user = await User.findById(userId);
        user.orders.push(order);
        await user.save();
    
        // Clear the cart items
        cart.items = [];
    
        // Save the updated cart
        await cart.save();
    
        res.status(200).json({ message: 'Order confirmed', order });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

module.exports = {confirmOrder};