
const User = require('../model/User');
const Product = require('../model/Product');
const Service = require("../model/Service");
const Cart = require("../model/Cart");

/*
// Add a product to the cart
const add = async (req, res) => {
    try {
        const { userId, itemId, itemType } = req.body;
    
        // Find the user by ID
        const user = await User.findById(userId);
    
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        // Add the item to the cart based on the item type
        if (itemType === 'Product') {
          user.cart.push(itemId);
        } else if (itemType === 'Service') {
          user.cart.push(itemId);
        } else {
          return res.status(400).json({ error: 'Invalid item type' });
        }
    
        // Save the updated user document
        await user.save();
    
        res.status(200).json({ message: 'Item added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete an item from the cart
const remove = async (req, res) => {
    try {
        const { userId, itemId } = req.params;
    
        // Find the user by ID
        const user = await User.findById(userId);
    
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        // Check if the item exists in the cart
        const itemIndex = user.cart.findIndex((item) => item.toString() === itemId);
    
        if (itemIndex === -1) {
          return res.status(404).json({ error: 'Item not found in cart' });
        }
    
        // Remove the item from the cart
        user.cart.splice(itemIndex, 1);
    
        // Save the updated user document
        await user.save();
    
        res.status(200).json({ message: 'Item removed from cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all items in the cart
const allCartItems = async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Find the user by ID
      const user = await User.findById(userId).populate('cart');
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Retrieve all items from the cart
      const cartItems = user.cart;
  
      res.status(200).json({ cartItems });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
}

// Get the total price of the cart
const total = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user by ID
    const user = await User.findById(userId).lean().select('cart').populate('cart.product');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let totalAmount = 0;
    const cartItems = [];

    // Iterate through each item in the cart
for (const item of user.cart) {
  const { product, quantity } = item;

  // Fetch the corresponding product or service separately
  let itemDetails;
  if (product.itemType === 'Product') {
    itemDetails = await Product.findById(product._id).lean();
  } else if (product.itemType === 'Service') {
    itemDetails = await Service.findById(product._id).lean();
  }

  if (!itemDetails) {
    continue; // Skip to the next item if the product or service is not found
  }

  const itemPrice = itemDetails.price * quantity;
  let taxPercentage = 0;
  let itemTax = 0;

  // Calculate tax based on the item's price range
  if (product.itemType === 'Product') {
    if (itemDetails.price > 5000) {
      taxPercentage = 0.18;
    } else if (itemDetails.price > 1000) {
      taxPercentage = 0.12;
    }
    itemTax = itemPrice * taxPercentage + 200;
  } else if (product.itemType === 'Service') {
    if (itemDetails.price > 8000) {
      taxPercentage = 0.15;
    } else if (itemDetails.price > 1000) {
      taxPercentage = 0.10;
    }
    itemTax = itemPrice * taxPercentage + 100;
  }

  const itemTotal = itemPrice + itemTax;

  // Build the cart item object
  const cartItem = {
    product: itemDetails,
    quantity,
    price: itemPrice,
    tax: itemTax,
    total: itemTotal,
  };

  cartItems.push(cartItem);
  totalAmount += itemTotal;
}

    const response = {
      cartItems,
      totalAmount,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


module.exports = {add, remove, allCartItems, total};
*/

const allCartItems = async (req, res)=>{
  try {
    const { userId } = req.params;

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Return the cart items as JSON
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

    return res.status(200).json({ message: 'Item added to cart successfully' });
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

    return res.status(200).json({ message: 'Item added to cart successfully' });
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
            quantity: 1, // Assuming quantity is always 1 for this example
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
            quantity: 1, // Assuming quantity is always 1 for this example
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
            quantity: 1, // Assuming quantity is always 1 for this example
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
            quantity: 1, // Assuming quantity is always 1 for this example
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
            quantity: 1, // Assuming quantity is always 1 for this example
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
            quantity: 1, // Assuming quantity is always 1 for this example
            SC: flatTax,
            totalValue: totalValue,
          };
        }
      }

      

      // return {
      //   item: item,
      //   price: item.price,
      //   quantity: 1, // Assuming quantity is always 1 for this example
      //   taxPercentage: taxPercentage,
      //   taxAmount: taxAmount,
      //   totalValue: totalValue,
      // };
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