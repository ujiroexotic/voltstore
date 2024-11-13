import React from 'react';

function About() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className='max-w-3xl p-8 text-center gb-white shadow-sm rounded-lg'>
        <h1 className='text-4xl font-bold text-indigo-600 mb-4'>
          About Us</h1>

        <section className='mb-10'>
          <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
            Our Journey  </h2>
          <p className='text-gray-700 text-lg leading-relaxed mb-6'>
            Welcome to our Portfolio project! This project is our dedication,
            collaboration, and the valuable skills we,ve developed through ALX Africa's
            learning journey.
          <br/>
            Together we've built an e-commerce platform that not only reflects
            our technical growth but also our commitment to apply the knowledge
            we gained throughout the ALX program. 
          </p>
          </section>

          <section className='mb-10'>
          <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
            Our Mission</h2>
          <p className='text-gray-700 text-lg leading-relaxed mb-6'>
            Our mission is to create accessible, reliable, impactful and enjoyable online
            shopping experience. We strive to deliver a range of high-quality products, 
            secure transactions, and exeptional customers service.
            This project represents our passion for technology and our ambition to innovate.            
          </p>
          </section>

          <section className='mb-10'>
          <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
            Looking Ahead</h2>
          <p className='text-gray-700 text-lg leading-relaxed mb-6'>
            This project represents just the beginning of our journey. We're
            committed to continuous learning, growth, and contributing to the tech 
            community.
          </p>
          </section>
      </div>
    </div>
  );
};

export default About