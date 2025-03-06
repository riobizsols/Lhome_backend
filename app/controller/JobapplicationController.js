const JobApplication = require('../model/Jobapplicationmodel'); // Import your Sequelize model
const nodemailer = require("nodemailer");
const fs = require("fs"); // Import file system module
const path = require("path");

// Controller functions
const PostJobApplication = async (req, res) => {
  try {
    const { firstname, lastname, email, phno, currentctc, expectedctc, location, nperiod } = req.body;
    const { portfolio, resume } = req.files;
    let Portfolio;

    if( Array.isArray(portfolio) && portfolio[0].filename){
      Portfolio = portfolio[0].filename;
    }else{
      Portfolio = null
    }

    const newApplication = await JobApplication.create({
      firstname,
      lastname,
      email,
      phno,
      currentctc,
      expectedctc,
      location,
      nperiod,
      Portfolio,
      resume: resume[0].filename,
    });
    return res.status(201).json({ message: 'JobApplication posted Successfully', newApplication });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const GetAllJobApplications = async (req, res) => {
  try {
    const JobApplicationList = await JobApplication.findAll();
    if (!JobApplicationList) {
      return res.status(404).json({ message: 'JobApplication not found' });
    }
    return res.status(200).json({ msg: "JobApplication list fetched successfully", JobApplicationList: JobApplicationList });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const jobApplicationEmail = async (req, res) => {
  try {
    console.log("📩 Received job application email request:");
    console.log("Body:", req.body);
    console.log("Files:", req.files);

    const { firstname, lastname, email, phno, currentctc, expectedctc, location, nperiod } = req.body;

    // Check if files exist
    const Portfolio = req.files?.portfolio?.[0] || null;
    const Resume = req.files?.resume?.[0] || null;

    console.log("📂 Uploaded Files - Portfolio:", Portfolio, "Resume:", Resume);

    if (!email) {
      return res.status(400).json({ error: "Email is required!" });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "realakashjaiswal@gmail.com",
        pass: "nocd tuqh kuim rbun",
      },
    });
    const attachments = [];
    if (Portfolio) {
      const portfolioPath = path.resolve(Portfolio.path);
      if (fs.existsSync(portfolioPath)) {
        attachments.push({
          filename: Portfolio.originalname,
          content: fs.readFileSync(portfolioPath), // Read file content
        });
      } else {
        console.log("Portfolio file not found at:", portfolioPath);
      }
    }

    if (Resume) {
      const resumePath = path.resolve(Resume.path);
      if (fs.existsSync(resumePath)) {
        attachments.push({
          filename: Resume.originalname,
          content: fs.readFileSync(resumePath), // Read file content
        });
      } else {
        console.log("Resume file not found at:", resumePath);
      }
    }

    const mailOptions = {
      from: "realakashjaiswal@gmail.com",
      to: "aakashjaiswal0706@gmail.com",
      subject: `New Job Application - ${firstname} ${lastname}`,
      html: `
        <h3>New Job Application Submitted</h3>
        <p><strong>Name:</strong> ${firstname} ${lastname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phno}</p>
        <p><strong>Current CTC:</strong> ${currentctc} LPA</p>
        <p><strong>Expected CTC:</strong> ${expectedctc} LPA</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Notice Period:</strong> ${nperiod}</p>
      `,
      attachments,
    };

    await transporter.sendMail(mailOptions);
    console.log("Job application email sent successfully");

    res.status(200).json({ message: "Job application submitted successfully!" });
  } catch (error) {
    console.error("❌ Email sending error:", error.message);
    res.status(500).json({ error: "Failed to send email.", details: error.message });
  }
};



// Export controller functions
module.exports = { PostJobApplication, GetAllJobApplications, jobApplicationEmail };
