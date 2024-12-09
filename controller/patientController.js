import patientModel from "../model/patientModel.js"

//POST function
export const create = async(req, res) => {

    try{

        const patientData = new patientModel(req.body)
        const {name} = patientData
        const patientExists = await patientModel.findOne({name})

        if(patientExists){
            return res.status(400).json({message: "Patient already exists"})
        }

        const savedPatient = await patientData.save()
        res.status(200).json(savedPatient)
        //console.log(savedPatient)
    }catch(error){

        return res.status(500).json({error: "Internal server error occurred :O"})

    }

}

//GET request
export const fetch = async(req, res) => {

    try{

       const patients = await patientModel.find();
       if(patients.length === 0 ){
        return res.status(400).json({message: "Patient not found"})
       }

       return res.status(200).json(patients)

    }catch(error){

        return res.status(500).json({error: "Internal server error occurred :O"})

    }

}


// GET request to fetch patient by name
export const fetchPatientByName = async (req, res) => {
    try {
      const { name } = req.query;  // Get the 'name' from the query string
  
      if (!name) {
        return res.status(400).json({ message: "Please provide a patient name to search." });
      }
  
      // Search for patients with the provided name (case-insensitive)
      const patients = await patientModel.find({ name: { $regex: name, $options: 'i' } });
  
      if (patients.length === 0) {
        return res.status(404).json({ message: "No patients found with that name." });
      }
  
      return res.status(200).json(patients);
  
    } catch (error) {
      return res.status(500).json({ error: "Internal server error occurred :O" });
    }
  };

  // fetch patient by ID
export const fetchPatientById = async (req, res) => {
    try {
      const { id } = req.params; // Get the 'id' from the URL parameters
  
      const patient = await patientModel.findOne({ _id: id });  // Find by _id; // Find the patient by ID
      
      if (!patient) {
        return res.status(404).json({ message: "Patient not found." });
      }
      
      return res.status(200).json(patient); // Send the patient data as response
    } catch (error) {
      return res.status(500).json({ error: "Internal server error occurred" });
    }
  };
  
  
  

//PUT request
export const update = async(req,res) => {
    try{
        const id = req.params.id;
        const patientExists = await patientModel.findOne({_id:id});
        if(!patientExists){
            return res.status(404).json({message:"Patient not found"})
        } 
        const updatePatient = await patientModel.findByIdAndUpdate(id,
            req.body, {new:true}
        )
        res.status(201).json(updatePatient)
    }catch(error) {
        return res.status(500).json({error: "Internal server error occurred :O"})
    }
}


//DELETE a patient request
export const deletePatient = async(req, res) => {
    try{
        const id = req.params.id;
        const patientExists = await patientModel.findOne({_id:id})

        if(!patientExists){
            return res.status(404).json({message:"Patient not found"})
        } 
        await patientModel.findByIdAndDelete(id)
        res.status(200).json({message: "Patient deleted successfully"})
    }catch(error){

        return res.status(500).json({error: "Internal server error occurred :O"})
    }
}

// DELETE a medical report request
export const deleteReport = async (req, res) => {
  try {
    const { patientId, reportId } = req.params;

    // Check if the patient exists
    const patientExists = await patientModel.findById(patientId);
    if (!patientExists) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Find the report by its ID within the medicalReports array
    const reportIndex = patientExists.medicalReports.findIndex(report => report._id.toString() === reportId);
    if (reportIndex === -1) {
      return res.status(404).json({ message: "Report not found" });
    }

    // Remove the report from the medicalReports array using splice
    patientExists.medicalReports.splice(reportIndex, 1);

    // Save the updated patient data with the report removed
    await patientExists.save();

    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error occurred :O" });
  }
};

// POST a new medical report request
export const addReport = async (req, res) => {
  try {
      const patientId = req.params.id;  // Get patient ID from URL params
      const { type, date, result, attachments } = req.body;  // Extract report details from request body

      // Check if patient exists
      const patient = await patientModel.findById(patientId);
      if (!patient) {
          return res.status(404).json({ message: "Patient not found" });
      }

      // Create the new report object
      const newReport = {
          type,
          date,
          result,
          attachments,
      };

      // Add the report to the patient's medicalReports array
      patient.medicalReports.push(newReport);

      // Save the updated patient document
      await patient.save();

      // Return a success message
      res.status(201).json({ message: "Report added successfully", patient });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error occurred :O" });
  }
};
