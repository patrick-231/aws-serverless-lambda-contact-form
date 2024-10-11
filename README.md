# Serverless Contact Form

This is a modern serverless contact form built using **AWS Lambda**, **Amazon SES (Simple Email Service)**, **React**, and **Tailwind CSS**. The form allows users to send messages directly from a web interface, and emails are delivered to the specified recipient email address using AWS SES. The backend logic is fully serverless, powered by AWS Lambda, making it highly scalable and cost-efficient.

## Features

- Serverless architecture using AWS Lambda
- Email sending functionality using Amazon SES
- Input validation for name, email, and message
- Modern UI design using React and Tailwind CSS
- Completely free to run using AWS Free Tier (within limits)

## Table of Contents

- [Getting Started](#getting-started)
- [Architecture Overview](#architecture-overview)
- [Setup and Deployment](#setup-and-deployment)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Getting Started

These instructions will help you set up and deploy the project on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure that you have the following installed:

- **Node.js** (v14 or higher)
- **AWS CLI** (configured with your AWS credentials)
- **AWS Account** (with SES verified email addresses)
- **VS Code** (or your preferred IDE)

### Installing

1. Clone the repository:

```bash
git clone https://github.com/patrick-231/aws-serverless-lambda-contact-form.git
```

2. Navigate to the project directory:

```bash
cd serverless-contact-form-app
```

3. Install dependencies:

```bash
npm install
```

4. Configure AWS SDK in your project and ensure your Lambda function is set up to use AWS SES for sending emails.

### Architecture Overview

This project is a serverless contact form with the following architecture:

- **Frontend:** React + Tailwind CSS for building the user interface.
- **Backend:** AWS Lambda function handles form submissions and email sending.
- **Email Service:** AWS SES for sending emails to the form owner's email address.

### Setup and Deployment

1. AWS SES Configuration
   Before deploying the application, configure SES for sending emails:
