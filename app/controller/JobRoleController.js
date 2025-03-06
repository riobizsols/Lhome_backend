const Jobrole = require('../model/Joinusjobmodel');

async function PostJobrole(req, res) {
    try {
        const { role, location, department, joblocation, Job_Description, Position_Title, Experience, Qualification, Job_type, Salary } = req.body;

        const newJobrole = await Jobrole.create({
            role,
            location,
            department,
            joblocation,
            Job_Description,
            Position_Title, 
            Experience,
            Qualification,
            Job_type,
            Salary
        });
        
        const responseData = {
            id : newJobrole.id ,
            role : newJobrole.role,
            location : newJobrole.location,
            department : newJobrole.department,
            details:{
                joblocation : newJobrole.joblocation,
                Job_Description : newJobrole.Job_Description,
            },
            Job_Requirement : {
            Position_Title:newJobrole.Position_Title,
            Experience:newJobrole.Experience,
            Qualification:newJobrole.Qualification,
            Job_type:newJobrole.Job_type,
            Salary:newJobrole.Salary
        }
        }

        res.status(201).json({ jobrole: responseData, msg: 'Jobrole created successfully' });
    } catch (error) {
        console.error('Error jobrole Details:', error);
        res.status(500).json({ error });
    }
}
async function getJobRoleList(req , res){
    try{
        const JobroleList = await Jobrole.findAll();
        res.status(200).json({msg : "Jobrole list fetched successfully" ,data : JobroleList})
    }catch(err){
        console.log("error occured ", err);
        res.status(400).json({msg : 'errors occured'})
    }
}
const getJobRoleById = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await Jobrole.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'Joblist not found' });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

const deleteJobRole = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Jobrole.destroy({ where: { id } });

        if (deleted) {
            res.json({ message: 'Job role deleted successfully' });
        } else {
            res.status(404).json({ error: 'Job role not found' });
        }
    } catch (error) {
        console.error('Error deleting job role:', error);
        res.status(500).json({ error: 'Failed to delete job role' });
    }
};
    //to check job roles
const checkJobRoles = async (req, res) => {
    try {
        const jobRoles = await Jobrole.findAll();

        if (jobRoles.length > 0) {
            res.status(200).json({ message: "Job roles found", data: jobRoles });
        } else {
            res.status(404).json({ message: "No job roles found" });
        }
    } catch (error) {
        console.error("Error fetching job roles:", error);
        res.status(500).json({ error: "Failed to fetch job roles" });
    }
};

module.exports = { PostJobrole, getJobRoleList, getJobRoleById, deleteJobRole, checkJobRoles };