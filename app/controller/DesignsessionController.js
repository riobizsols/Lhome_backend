const Designsession = require('../model/Designsessionmodel');
const nodemailer = require('nodemailer');

const DesignsessionBooking = async (req, res) => {
  try {
    const { own, floorplan, location, planning, looking, budget, Possession, nearestcentre, meetingdate, meetingtime } = req.body;

    const userDesign = await Designsession.create({
      own,
      floorplan,
      location,
      planning,
      looking,
      budget,
      Possession,
      nearestcentre,
      meetingdate,
      meetingtime
    });

    if (!userDesign) {
      return res.status(400).json({ msg: 'Missing required fields' });
    }

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
      subject: 'New Design Session Booking',
      text: `
                A new design session has been booked:

                - Own: ${own}
                - Floor Plan: ${floorplan}
                - Location: ${location}
                - Planning: ${planning}
                - Looking For: ${looking}
                - Budget: ${budget}
                - Possession: ${Possession}
                - Nearest Centre: ${nearestcentre}
                - Meeting Date: ${meetingdate}
                - Meeting Time: ${meetingtime}
            `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ msg: 'Your design session was created successfully, and an email was sent to the admin.', userDesign });

  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error });
  }
};

module.exports = { DesignsessionBooking };
