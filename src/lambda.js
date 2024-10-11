const AWS = require("aws-sdk");
const ses = new AWS.SES({ region: "eu-central-1" }); // e.g., us-east-1

exports.handler = async (event) => {
  const { name, email, message } = JSON.parse(event.body);

  if (!name || !email || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "All fields are required." }),
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Please enter a valid email address." }),
    };
  }

  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Text: { Data: `Message from ${name} (${email}):\n\n${message}` },
      },
      Subject: { Data: "Contact Form Submission" },
    },
    Source: "putradefx@gmail.com",
  };

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
