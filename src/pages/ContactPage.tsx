import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const ContactPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Thank you for your message. We will get back to you soon!');
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Contact Us</h1>
            <p className="mt-1 text-gray-600">We'd love to hear from you. Please fill out this form or use our contact information below.</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Get in Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-900 font-medium">Office Address</p>
                      <p className="mt-1 text-gray-600">
                        123 Victoria Island<br />
                        Lagos, Nigeria
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-900 font-medium">Phone</p>
                      <p className="mt-1 text-gray-600">+234 812 345 6789</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-900 font-medium">Email</p>
                      <p className="mt-1 text-gray-600">support@tradeyard.com</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h2>
                  <div className="space-y-3 text-gray-600">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Send us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Full Name"
                    type="text"
                    required
                    placeholder="John Doe"
                  />
                  
                  <Input
                    label="Email Address"
                    type="email"
                    required
                    placeholder="you@example.com"
                  />
                  
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="+234 800 000 0000"
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    loading={isSubmitting}
                    icon={<Send size={18} />}
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;