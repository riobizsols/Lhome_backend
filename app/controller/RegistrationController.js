const User = require('../model/Registrationmodel');
const nodemailer = require('nodemailer');

async function registerUser(req, res) {
  try {
    const { name, number, checkforwhatsapp, email, pincode } = req.body;

    const isNumberExist = await User.findOne({ where: { number } });
    const isEmailExist = await User.findOne({ where: { email } });

    let user;

    if (isNumberExist && isEmailExist && isNumberExist.id === isEmailExist.id) {
      await User.update({ name, checkforwhatsapp, pincode }, { where: { number, email } });
      user = await User.findOne({ where: { number, email } });
    } else if (isNumberExist && isEmailExist && isNumberExist.id !== isEmailExist.id) {
      return res.status(501).json({ error: 'The number or email is already registered. Please check again.' });
    } else if (isNumberExist) {
      await User.update({ name, checkforwhatsapp, pincode, email }, { where: { number } });
      user = await User.findOne({ where: { number } });
    } else if (isEmailExist) {
      await User.update({ name, checkforwhatsapp, pincode, number }, { where: { email } });
      user = await User.findOne({ where: { email } });
    } else {
      user = await User.create({
        name,
        number,
        checkforwhatsapp,
        email,
        pincode,
      });
    }

    if (user) {
      // **Setup Nodemailer**
      const transporter = nodemailer.createTransport({
                  host: 'smtp.gmail.com',
                  port: 587,
                  auth: {
                      user: 'realakashjaiswal@gmail.com',
                      pass: 'nocd tuqh kuim rbun',
                  },
              });

      const mailOptions = {
        from: 'realakashjaiswal@gmail.com',
        to: 'aakashjaiswal0706@gmail.com',
        subject: "New User Registered",
        html: `
          <h2>New User Registration</h2>
          <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Phone Number:</strong> ${user.number}</p>
          <p><strong>Pincode:</strong> ${user.pincode}</p>
          <p><strong>Opted for WhatsApp:</strong> ${user.checkforwhatsapp ? "Yes" : "No"}</p>
        `,
      };

      // **Send Email**
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error("Error sending email to admin:", err);
        } else {
          console.log("Admin email sent:", info.response);
        }
      });

      return res.status(201).json({ user, msg: "User created successfully" });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error });
  }
}

module.exports = { registerUser };
