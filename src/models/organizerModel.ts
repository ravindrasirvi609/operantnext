import mongoose from "mongoose";

const organizerSchema = new mongoose.Schema({

});

const Organizer = mongoose.models.Organizer || mongoose.model("Organizer", organizerSchema);

export default Organizer;
