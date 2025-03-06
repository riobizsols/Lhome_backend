const nodemailer = require("nodemailer");

const sendIssueClosedEmail = async (req, res) => {
    try {
        console.log("Received email request:", req.body);

        const { email, issue } = req.body;  

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

        const mailOptions = {
            from: "realakashjaiswal@gmail.com",
            to: email, 
            subject: "Issue Closed Notification",
            text: `Dear Customer,\n\nYour reported issue: "${issue}" has been successfully closed.\n\nThank you for reaching out!`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("Email sending error:", error.message, error.stack);
        res.status(500).json({ error: "Failed to send email.", details: error.message });
    }
};



module.exports = { sendIssueClosedEmail }; 
