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


//DELETE request
export const deletePatient = async(req, res) => {
    try{
        const id = req.params.id;
        const patientExists = await patientModel.findOne({_id:id})

        if(!patientExists){
            return res.status(404).json({message:"Patient not found"})
        } 
        await patientModel.findByIdAndUpdate(id)
        res.status(201).json({message: "Patient deleted successfully"})
    }catch(error){

        return res.status(500).json({error: "Internal server error occurred :O"})
    }
}