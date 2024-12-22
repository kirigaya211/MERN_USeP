const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
    facilityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Facility",
        required: true,
    },
    reservedDate: {
        type: [Date],
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, { timestamps: true });


module.exports = mongoose.model("Reservation", reservationSchema);