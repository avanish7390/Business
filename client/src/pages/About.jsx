import React from 'react';

const AboutPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      {/* About Us Section */}
      <div className="bg-white p-8 rounded shadow-md w-full max-w-screen-lg">
        <h1 className="text-4xl font-bold mb-6 text-center text-purple-500">About Us</h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Welcome to <span className="font-semibold text-purple-500">Our Business Directory</span>, your go-to platform for finding and discovering amazing businesses in your area. We aim to connect people with the best services, products, and businesses, making it easier for everyone to find what they need.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Our mission is to create a platform that empowers both consumers and businesses by providing a user-friendly directory where customers can find and interact with local businesses. We believe in building strong relationships between local businesses and their communities.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Our Vision</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          We envision a world where every business has the opportunity to grow, and every consumer can easily access the services and products they need. Our platform bridges the gap, fostering a vibrant, interconnected business community.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {/* Team Member 1 */}
          <div className="bg-gray-50 p-4 rounded shadow-lg text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member 1"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-bold mb-2">John Doe</h3>
            <p className="text-gray-600">CEO & Founder</p>
          </div>

          {/* Team Member 2 */}
          <div className="bg-gray-50 p-4 rounded shadow-lg text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member 2"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Jane Smith</h3>
            <p className="text-gray-600">Head of Marketing</p>
          </div>

          {/* Team Member 3 */}
          <div className="bg-gray-50 p-4 rounded shadow-lg text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member 3"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Mark Johnson</h3>
            <p className="text-gray-600">Lead Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
