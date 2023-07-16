// const create = async(req, res)=>{
//     res.send("created product text.....")
// }

// module.exports = {create};

const Product = require('../model/Product');

// Add a new product
const add = async (req, res) => {
  try {
    const { name, price } = req.body;

    // Creating a new product document
    const newProduct = new Product({
      name,
      price
    });

    // Saving the product
    await newProduct.save();

    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a product
const remove = async (req, res) => {
  try {
    // Get the product ID from the URL parameters
    const productId = req.params.id;

    // Find the product by ID and delete it
    const deletedProduct = await Product.findByIdAndRemove(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const allProducts = async(req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const get = async(req, res)=>{
  try {
    const productId = req.params.id;

    // Find the product by ID 
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports ={add, remove, get, allProducts};
