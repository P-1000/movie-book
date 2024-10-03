import nodemailer from "nodemailer";

export const sendEmail = async ({ to, name, qrCode, movieTitle, theaterName, screenName, showtime, date, tickets }) => {
  console.log("Sending email to:", to);
  console.log("Movie title:", movieTitle);
  console.log("Number of tickets:", tickets);
  console.log("QR code:", qrCode);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Booking confirmation for Igris Show",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #fff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
    }
    .header img {
      width: 50px;
      height: 50px;
    }
    .header h2 {
      margin: 10px 0;
      font-size: 24px;
    }
    .content {
      margin-bottom: 20px;
    }
    .content p {
      margin: 0 0 5px;
      font-size: 14px;
    }
    .booking-details {
      margin: 20px 0;
    }
    .booking-details p {
      margin: 0;
      font-size: 16px;
      font-weight: bold;
    }
    .qr-code {
      text-align: center;
      margin-top: 20px;
    }
    .qr-code img {
      width: 150px;
      height: 150px;
    }
    .footer {
      text-align: center;
      font-size: 14px;
      color: #888;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://via.placeholder.com/50" alt="Igris Show Logo">
      <h2>Booking Confirmation</h2>
    </div>
    <div class="content">
      <p>Hi ${name},</p>
      <p>Your booking for the movie <strong>${movieTitle}</strong> has been confirmed!</p>
    </div>
    <div class="booking-details">
      <p>Theater: ${theaterName}</p>
      <p>Screen: ${screenName}</p>
      <p>Showtime: ${showtime}</p>
      <p>Date: ${date}</p>
      <p>Number of Tickets: ${tickets}</p>
    </div>
    <div class="qr-code">
      <p>Scan this QR code for your booking details:</p>
      <img src="${qrCode}" alt="QR Code">
    </div>
    <div class="footer">
      <p>Thank you for booking with Igris Show!</p>
    </div>
  </div>
</body>
</html>
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
