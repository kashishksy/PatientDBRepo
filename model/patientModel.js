import mongoose from 'mongoose'
const patientSchema = new mongoose.Schema({


    name: {
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    dateOfAdmission:{
        type:String,
        required:true
    },
    dateOfDischarge:{
        type:String,
        required: false
    },
    age:{
        type:String,
        required: true
    },
    photo: {
        type: String,  // Stores URL or Base64 string of the photo
        required: false  // Optional field
    }

})

export default mongoose.model("patients", patientSchema);