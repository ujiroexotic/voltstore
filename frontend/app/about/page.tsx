import React from "react";

function About() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-3xl p-8 text-center bg-white shadow-sm rounded-lg">
        <h1 className="text-4xl font-bold text-indigo-600 mb-4">About Us</h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Our Journey
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Welcome to our portfolio project! This project reflects our
            dedication, collaboration, and the valuable skills we&apos;ve developed
            through ALX Africa&apos;s learning journey.
            <br />
            Together, we&apos;ve built an e-commerce platform that showcases not
            only our technical growth but also our commitment to applying the
            knowledge we&apos;ve gained throughout the ALX program.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Our mission is to create an accessible, reliable, impactful, and
            enjoyable online shopping experience. We strive to deliver a range
            of high-quality products, secure transactions, and exceptional
            customer service.
            <br />
            This project represents our passion for technology and our ambition
            to innovate.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Looking Ahead
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            This project marks just the beginning of our journey. We&apos;re
            committed to continuous learning, growth, and contributing to the
            tech community.
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;
