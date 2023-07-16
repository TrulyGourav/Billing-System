const Config = require('../config/Config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../model/User');
const Cart = require('../model/Cart');

const signup = async (req, res) => {

  try {
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user based on if role is present or not
    let newUser;
    if(req.body.role){
      newUser = new User({ name, email, password: hashedPassword, role: req.body.role,  });
    }else{
      newUser = new User({ name, email, password: hashedPassword });
    }

    //initializing the cart for new user saving it
    let cart = new Cart({ user: newUser._id });
    newUser.cart=cart._id;
    await cart.save();
    await newUser.save();

    // Create and sign a JWT token
    const token = jwt.sign({ email: newUser.email, userId: newUser._id }, Config.SECRET_KEY, {
      expiresIn: '1h',
    });

    return res.status(201).json({ message: 'Signup successful', token });
  } 
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

const signin = async(req, res)=>{
  const { email, password } = req.body;
  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ error: 'User not found' });
    }

    const matchedPass = await bcrypt.compare(password, existingUser.password)
    if(!matchedPass){
      return res.status(400).json({ error: 'Wrong Password' });
    }
    const token = jwt.sign({ email: existingUser.email, userId: existingUser._id }, Config.SECRET_KEY);
    return res.status(201).json({ message: 'Signin successful. Sign in ho gya bhaii.............', token });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
}

const deleteUser = async (req, res)=>{
  try {
    const { userId } = req.params;

    // Find the user and their associated cart
    const user = await User.findById(userId).populate('cart');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // If the user has a cart, delete it
    if (user.cart) {
      await Cart.findByIdAndDelete(user.cart._id);
    }

    // Delete the user
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {signup, signin, deleteUser};