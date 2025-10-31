import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-[#dcfce7] to-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-[#1f2937] mb-4">Get in Touch</h1>
          <p className="text-lg text-[#4b5563]">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-[#1f2937] mb-8">Contact Information</h2>
              
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="bg-[#dcfce7] rounded-lg p-3 flex-shrink-0">
                    <Mail className="text-[#4ade80]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1f2937] mb-1">Email Us</h3>
                    <p className="text-[#4b5563]">support@ayoubstore.com</p>
                    <p className="text-[#4b5563]">info@ayoubstore.com</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="bg-[#dcfce7] rounded-lg p-3 flex-shrink-0">
                    <Phone className="text-[#4ade80]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1f2937] mb-1">Call Us</h3>
                    <p className="text-[#4b5563]">+1 (555) 123-4567</p>
                    <p className="text-[#4b5563]">Mon - Fri: 9AM - 6PM</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="bg-[#dcfce7] rounded-lg p-3 flex-shrink-0">
                    <MapPin className="text-[#4ade80]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1f2937] mb-1">Visit Us</h3>
                    <p className="text-[#4b5563]">1234 Commerce Street</p>
                    <p className="text-[#4b5563]">New York, NY 10001</p>
                    <p className="text-[#4b5563]">United States</p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start space-x-4">
                  <div className="bg-[#dcfce7] rounded-lg p-3 flex-shrink-0">
                    <Clock className="text-[#4ade80]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1f2937] mb-1">Business Hours</h3>
                    <p className="text-[#4b5563]">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-[#4b5563]">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="text-[#4b5563]">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-md border border-[#e5e7eb] p-8">
              <h2 className="text-2xl font-bold text-[#1f2937] mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm text-[#4b5563] mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-[#e5e7eb] rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#4ade80] focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm text-[#4b5563] mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-[#e5e7eb] rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#4ade80] focus:border-transparent"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm text-[#4b5563] mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-[#e5e7eb] rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#4ade80] focus:border-transparent"
                    placeholder="How can we help?"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm text-[#4b5563] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-white border border-[#e5e7eb] rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#4ade80] focus:border-transparent resize-none"
                    placeholder="Your message here..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#4ade80] hover:bg-[#3dd16d] text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center shadow-lg"
                >
                  <Send size={18} className="mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-[#f3f4f6]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#1f2937] mb-8 text-center">Find Us on Map</h2>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="h-96 bg-[#e5e7eb] flex items-center justify-center">
              <div className="text-center">
                <MapPin size={48} className="text-[#9ca3af] mx-auto mb-4" />
                <p className="text-[#4b5563]">1234 Commerce Street, New York, NY 10001</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactUs;