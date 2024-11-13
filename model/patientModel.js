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
    },
    medicalReports: [{
        type: {
            type: String, // Type of report (e.g., "ECG", "Kidney Function", "Blood Test")
            required: true
        },
        date: {
            type: String, // Date the report was created or added
            required: true
        },
        result: {
            type: String, // Detailed result or description of the report
            required: false
        },
        attachments: [String] // Array of URLs or file paths to report attachments if any
    }]

})

export default mongoose.model("patients", patientSchema);