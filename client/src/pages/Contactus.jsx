import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa';

import { AiOutlineGithub, AiFillYoutube } from 'react-icons/ai';

const Contactus = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[10vh] flex justify-center items-center text-purple-500 px-4 sm:px-8">
        <div className="absolute inset-0  opacity-40"></div>
        <h1 className="text-3xl sm:text-4xl font-bold z-10 animate__animated animate__fadeIn">Contact Us</h1>
      </section>


      {/* Contact Details Section */}
      <section className="py-16 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row bg-gradient-to-r from-indigo-300 to-blue-300 p-8 rounded-lg shadow-lg space-y-8 lg:space-y-0 lg:space-x-8">
          
          {/* Left Section: Contact Information */}
          <div className="lg:w-1/2 space-y-8 animate__animated animate__fadeIn animate__delay-1s">
            <h2 className="text-3xl font-semibold text-center lg:text-left text-gray-800">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 group">
                <div className="p-3 rounded-full bg-blue-100 text-blue-500 group-hover:bg-blue-200 transition duration-300">
                  <FaPhoneAlt size={20} />
                </div>
                <p className="text-lg font-medium text-gray-700 transition-transform transform group-hover:scale-105">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="p-3 rounded-full bg-blue-100 text-blue-500 group-hover:bg-blue-200 transition duration-300">
                  <FaEnvelope size={20} />
                </div>
                <p className="text-lg font-medium text-gray-700 transition-transform transform group-hover:scale-105">info@example.com</p>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="p-3 rounded-full bg-blue-100 text-blue-500 group-hover:bg-blue-200 transition duration-300">
                  <FaMapMarkerAlt size={20} />
                </div>
                <p className="text-lg font-medium text-gray-700 transition-transform transform group-hover:scale-105">123 Main Street, City, Country</p>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex justify-center lg:justify-start space-x-6 mt-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition duration-300" aria-label="Facebook">
                <FaFacebookF size={28} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 transition duration-300" aria-label="Twitter">
                <FaTwitter size={28} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 transition duration-300" aria-label="LinkedIn">
                <FaLinkedinIn size={28} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700 transition duration-300" aria-label="Instagram">
                <FaInstagram size={28} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600 transition duration-300" aria-label="GitHub">
                <AiOutlineGithub size={28} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 transition duration-300" aria-label="YouTube">
                <AiFillYoutube size={28} />
              </a>
            </div>
          </div>

          {/* Right Section: Map */}
          <div className="lg:w-1/2 animate__animated animate__fadeIn animate__delay-2s">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Our Location</h2>
            {/* Embedded Google Map */}
            <div className="overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 animate__animated animate__slideInRight">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093746!2d144.9537363155049!3d-37.8162797797517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf57741be02c5f0f6!2s123%20Main%20St%2C%20Melbourne%20VIC%203001%2C%20Australia!5e0!3m2!1sen!2sus!4v1616103323920!5m2!1sen!2sus"
                width="100%"
                height="250"
                loading="lazy"
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
                title="Our Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contactus;
