const Service = require('../model/Service');

// Add a new service
const add = async (req, res) => {
    try {
      const { name, price } = req.body;
  
      // Create a new service
      const service = new Service({
        name,
        price,
      });
  
      // Save the service to the database
      await service.save();
  
      res.status(201).json({ message: 'Service added successfully'});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
 // Remove a service
const remove = async (req, res) => {
    try {
      const { serviceId } = req.params;
  
      // Find the service by ID and remove it
      await Service.findByIdAndRemove(serviceId);
  
      res.status(200).json({ message: 'Service removed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
 // Get all services
const all = async (req, res) => {
    try {
      // Fetch all services from the database
      const services = await Service.find();
  
      res.status(200).json({ services });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
// Get a single service by ID
const get = async (req, res) => {
    try {
      const { serviceId } = req.params;
  
      // Find the service by ID
      const service = await Service.findById(serviceId);
  
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }
  
      res.status(200).json({ service });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
};
  
module.exports = { add, remove, all, get}; 

