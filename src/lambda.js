const AWS = require("aws-sdk");
const ses = new AWS.SES({ region: "eu-central-1" });
require("dotenv").config(); // Load environment variables from .env

exports.handler = async (event) => {
  const { name, email, message } = JSON.parse(event.body);

  // Input validation
  if (!name || !email || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "All fields are required." }),
    };
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Please enter a valid email address." }),
    };
  }

  // SES email parameters
  const params = {
    Destination: {
      ToAddresses: [email], // Use the user's email here
    },
    Message: {
      Body: {
        Text: { Data: `Message from ${name} (${email}):\n\n${message}` },
      },
      Subject: { Data: "Contact Form Submission" },
    },
    Source: process.env.SOURCE_EMAIL, // Use the source email from the .env file
  };

  // Send email using AWS SES
  try {
    await ses.sendEmail(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to send email. Please try again later.",
      }),
    };
  }
};
