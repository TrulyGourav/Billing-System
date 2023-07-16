
const User = require('../model/User');
const Product = require('../model/Product');
const Service = require("../model/Service");
const Cart = require("../model/Cart");

const allCartItems = async (req, res)=>{
  try {
    const { userId } = req.params;

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.status(200).json({ items: cart.items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const addProduct = async (req, res)=>{
  try {
    const { userId, productId } = req.body;

    // Find the user's cart or create a new cart if it doesn't exist
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId });
    }

    // Create a new product
    const item = await Product.findById(productId);
    if (!item) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Add the item to the cart
    cart.items.push(item);
    await cart.save();

    return res.status(200).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const addService = async (req, res)=>{
  try {
    const { userId, serviceId } = req.body;

    // Find the user's cart or create a new cart if it doesn't exist
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId });
    }

    // Create a new Service
    const item = await Service.findById(serviceId);
    if (!item) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Add the item to the cart
    cart.items.push(item);
    await cart.save();

    return res.status(200).json({ message: 'Service added to cart successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Find the index of the product in the cart's items array
    const productIndex = cart.items.findIndex((item) => item._id.equals(productId));

    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }

    // Remove the product from the cart's items array
    cart.items.splice(productIndex, 1);
    await cart.save();

    return res.status(200).json({ message: 'Product removed from cart successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteService = async (req, res) => {
  try {
    const { userId, serviceId } = req.params;

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Find the index of the service in the cart's items array
    const serviceIndex = cart.items.findIndex((item) => item._id.equals(serviceId));

    if (serviceIndex === -1) {
      return res.status(404).json({ error: 'Service not found in cart' });
    }

    // Remove the service from the cart's items array
    cart.items.splice(serviceIndex, 1);
    await cart.save();

    return res.status(200).json({ message: 'Service removed from cart successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const clearCart = async (req, res)=>{
  try {
    const { userId } = req.params;

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Delete all cart items
    cart.items = [];
    await cart.save();

    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const viewTotalBill = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    let cartPrice = 0;

    // Calculate tax and total value for each item in the cart
    const itemsWithBillDetails = cart.items.map((item) => {
      let totalPrice = 0;
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
    
    return res.status(200).json({
      items: itemsWithBillDetails,
      CartPrice: cartPrice,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {allCartItems, addProduct, addService, deleteProduct, deleteService, clearCart, viewTotalBill};