const Facility = require("../models/facility");
const Reservation = require("../models/reservation");
const dotenv = require("dotenv");
dotenv.config();

const createReservation = async(req,res,next)=>{
    try{
        const {facilityId, reservedDateIn, reservedDateOut}= req.body;
        const facility = await Facility.findById(facilityId);
        if(!facility){
            return res.status(404).json({error:"Facility not found"});
        }
        const numberOfDays = Math.ceil(
            (new Date(reservedDateOut) - new Date(reservedDateIn))/(1000*60*60*24)

        );
        const totalAmount = numberOfDays * facility.price;

        const reservation = new Reservation({
            facilityId,
            reservedDateIn,
            reservedDateOut,
            totalAmount,
            user:req.userId
        });
        await reservation.save();
        res.status(201).json({message:"Reservation created successfully", reservation});
     }catch(error){
        next(error);
     }
    };

    const getUserReservation = async(req,res,next)=>{
        try{
            const reservations = await Reservation.find({user:req.userId}).populate("facilityId");
            if(!reservations||reservations.length===0){
                return res.status(404).json({message:"No reservations found"});
            }
            res.status(200).json(reservations);
        }catch(error){
            next(error);
        }
    };

    const cancelReservation = async(req,res,next)=>{
        try{
            const {id}= req.params;
            const reservation = await Reservation.findById(id);
            if(!reservation){
                return res.status(404).json({message:"Reservation not founf"});
            }
            reservation.findByIdAndDelete(id);
            res.status(200).json({message:"Reservation cancelled successfully"});
        }catch(error){
            next(error);
        }
    }

    const updateReservation = async(req, res, next)=>{
        try{
            const {id}=req.params;
            const {facilityId, reservedDateIn, reservedDateOut}= req.body;
            const reservation = await Reservation.findById(id);
            if(!reservation){
                return res.status(404).json({message:"Reservation not found"});
            }
            const numberOfDays = Math.ceil(
                (new Date(reservedDateOut) - new Date(reservedDateIn))/(1000*60*60*24)
    
            );
            const totalAmount = numberOfDays * facilityId.price;

            reservation.facilityId = facilityId;
            reservation.reservedDateIn = reservedDateIn;
            reservation.reservedDateOut = reservedDateOut;
            reservation.totalAmount = totalAmount;
            await reservation.save();
            res.status(200).json({message:"Reservation updated successfully"});
        }catch(error){
            next(error);
        }
    };

    const getAllFacilityReservations = async(req,res,next)=>{
        try{
            const reservations = await Reservation.find().populate("facilityId");
            if(!reservations||reservations.length===0){
                return res.status(404).json({message:"No reservations founf"});
            }
            res.status(200).json(reservations);
        }catch(error){
            next(error);
        }
    };

    const getAllReservations = async(req,res,next)=>{
        try{
            const facility = await Reservation.find();
            if(!facility||facility.length===0){
                return res.status(404).json({message:"No reservations found"});
            }
            res.status(200).json(facility);
        }catch(error){
            next(error);
        }
    };



    module.exports = {createReservation, getUserReservation, cancelReservation, updateReservation, getAllFacilityReservations, getAllReservations};
