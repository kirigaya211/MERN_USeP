const Facility = require("../models/facility");
const Reservation = require("../models/reservation");
const dotenv = require("dotenv");
dotenv.config();

const createReservation = async (req, res, next) => {
  try {
    const { facilityId, reservedDate } = req.body;
    const facility = await Facility.findById(facilityId);
    if (!facility) {
      return res.status(404).json({ error: "Facility not found" });
    }

    const totalAmount = reservedDate.length * facility.price;

    const reservation = new Reservation({
      facilityId,
      reservedDate,
      totalAmount,
      user: req.user.userId,
    });
    await reservation.save();
    res
      .status(201)
      .json({ message: "Reservation created successfully", reservation });
  } catch (error) {
    next(error);
    console.log("Error creating reservation: ", error);
  }
};

const getUserReservation = async (req, res, next) => {
  try {
    const reservations = await Reservation.find({
      user: req.user.userId,
    }).populate("facilityId");
    if (!reservations || reservations.length === 0) {
      return res.status(404).json({ message: "No reservations found" });
    }
    res.status(200).json(reservations);
  } catch (error) {
    next(error);
  }
};

const cancelReservation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    await Reservation.findByIdAndDelete(id);
    res.status(200).json({ message: "Reservation cancelled successfully" });
  } catch (error) {
    next(error);
  }
};

const updateReservation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { facilityId, reservedDateIn, reservedDateOut } = req.body;
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    const numberOfDays = Math.ceil(
      (new Date(reservedDateOut) - new Date(reservedDateIn)) /
        (1000 * 60 * 60 * 24)
    );
    const totalAmount = numberOfDays * facilityId.price;

    reservation.facilityId = facilityId;
    reservation.reservedDateIn = reservedDateIn;
    reservation.reservedDateOut = reservedDateOut;
    reservation.totalAmount = totalAmount;
    await reservation.save();
    res.status(200).json({ message: "Reservation updated successfully" });
  } catch (error) {
    next(error);
  }
};

const getAllFacilityReservations = async (req, res, next) => {
  const { id } = req.params; 
  try {
    const reservations = await Reservation.find({ facilityId: id }).populate("user", "name") 
    .populate("facilityId", "name price");;
    if (!reservations || reservations.length === 0) {
      return res.status(404).json({ message: "No reservations found for this facility" });
    }
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    next(error);
  }
};

const getAllReservations = async (req, res, next) => {
  try {
    const facility = await Reservation.find();
    if (!facility || facility.length === 0) {
      return res.status(404).json({ message: "No reservations found" });
    }
    res.status(200).json(facility);
  } catch (error) {
    next(error);
  }
};

const getReservation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.status(200).json(reservation);
  } catch (error) {
    next(error);
  }
};

const getReservationDates = async(req,res,next)=>{
  try {
    const { facilityId } = req.params;
    const reservations = await Reservation.find({ facilityId });
    if (!reservations) {
      return res.status(404).json({ message: "No reservations found." });
    }
    const reservedDates = reservations
      .map((reservation) => reservation.reservedDate)
      .flat(); 

    res.status(200).json(reservedDates); // R
  }catch(error){
    next(error);
  }
}

module.exports = {
  createReservation,
  getUserReservation,
  cancelReservation,
  updateReservation,
  getAllFacilityReservations,
  getAllReservations,
  getReservation,
  getReservationDates
};
