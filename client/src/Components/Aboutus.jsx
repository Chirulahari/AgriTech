// src/components/AboutUs.jsx
import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">About Us</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Welcome to Agro Tech
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Agro Tech is dedicated to revolutionizing the agricultural industry through innovative technology solutions.
          </p>
        </div>
        
        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                  {/* Icon can go here */}
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Our Mission</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Our mission is to enhance productivity and sustainability in agriculture through cutting-edge technology and data-driven solutions.
              </dd>
            </div>
            
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                  {/* Icon can go here */}
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5V4H2v16h5m10 0h-6m2 0v-6m-2 0h6" />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Our Vision</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Our vision is to be a global leader in providing innovative agricultural technologies that empower farmers and agribusinesses to thrive.
              </dd>
            </div>
            
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                  {/* Icon can go here */}
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h6l-1.5-1.5L12 4l1.5 1.5L16 10h6M6 20h6m6-12h2v6h-2zM4 14h2v6H4v-6z" />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Our Values</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                We value innovation, sustainability, and collaboration. We are committed to creating solutions that benefit farmers, consumers, and the environment.
              </dd>
            </div>
            
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                  {/* Icon can go here */}
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7 20h10M9 4h6m-6 4h6" />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Our Impact</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Our solutions have improved crop yields, reduced resource usage, and enhanced the livelihoods of countless farmers worldwide.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
