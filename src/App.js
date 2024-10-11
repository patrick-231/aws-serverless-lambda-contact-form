import React, { useState } from "react";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    // Basic email format validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset feedback
    setFeedback("");
    setLoading(true);

    // Validate input
    if (!name || !email || !message) {
      setFeedback("All fields are required.");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setFeedback("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://jzcubeph8e.execute-api.eu-central-1.amazonaws.com/dev/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, message }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setFeedback("Your message has been sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setFeedback(
          result.message || "Something went wrong. Please try again later."
        );
      }
    } catch (error) {
      setFeedback(
        "An error occurred while sending your message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Contact Us</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
        ></textarea>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 text-white font-bold rounded ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          {loading ? "Sending..." : "Send"}
        </button>
        {feedback && <p className="text-center text-red-500">{feedback}</p>}
      </form>
    </div>
  );
};

export default ContactForm;
