const Facility = require("../models/facility");
const dotenv = require("dotenv");
dotenv.config();

const addFacility = async (req, res, next) => {
  try {
    const { name, description, location, capacity, price } = req.body;
    const existFacility = await Facility.findOne({ name });
    if (existFacility) {
      return res.status(400).json({ error: "Facility already exists" });
    }
    const facility = new Facility({
      name,
      description,
      location,
      capacity,
      price,
    });
    await facility.save();
    res.status(201).json({ message: "Facility added successfully" });
  } catch (error) {
    next(error);
  }
};

const getFacilities = async (req, res, next) => {
  try {
    const facilities = await Facility.find();
    if (!facilities) {
      return res.status(404).json({ message: "No facilities found" });
    }
    res.status(200).json({ facilities });
  } catch (error) {
    next(error);
  }
};

const deleteFacility = async (req, res, next) => {
  try {
    const { id } = req.params;
    const facility = await Facility.findById(id);
    if (!facility) {
      return res.status(404).json({ message: "Facility not found" });
    }
    await Facility.findByIdAndDelete(id);
    res.status(200).json({ message: "Facility deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const updateFacility = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, location, capacity, price } = req.body;
    const facility = await Facility.findById(id);
    if (!facility) {
      return res.status(404).json({ message: "Facility not found" });
    }
    facility.name = name;
    facility.description = description;
    facility.location = location;
    facility.capacity = capacity;
    facility.price = price;
    await facility.save();
    res.status(200).json({ message: "Facility updated successfully" });
  } catch (error) {
    next(error);
  }
};



module.exports = {
  addFacility,
  getFacilities,
  deleteFacility,
  updateFacility,
};
