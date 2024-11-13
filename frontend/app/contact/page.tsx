'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import React from "react";
import { FaGithub } from "react-icons/fa";


function Contact() {
  // State to hold form data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Prepare the data to send
    const formData = {
      name,
      email,
      phone,
      message,
    };

    try {
      // Send the data to your backend using fetch (or axios)
      const response = await fetch("https://api-voltstore.up.railway.app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful submission (e.g., show a success message)
        console.log("Form submitted successfully!");
      } else {
        // Handle error (e.g., show an error message)
        console.error("Error submitting the form");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          <div className="lg:col-span-2 lg:py-12">
            <p className="max-w-xl text-lg">
              Contact our developers directly for more information.
            </p>

            <div className="mt-8">
              <a href="https://github.com/IbnuJabir" target="_blank" className="text-2xl font-bold text-primary">Kedir Jabir</a>
            </div>
            <div className="mt-8">
              <a href="https://github.com/agbaniongithub" target="_blank" className="text-2xl font-bold text-primary">David Agbaniyaka</a>
            </div>
            <div className="mt-8">
              <a href="https://github.com/OrionDooms" target="_blank" className="text-2xl font-bold text-primary">Orion Dooms</a>
            </div>
            <div className="mt-8">
              <a href="https://github.com/ujiroexotic" target="_blank" className="text-2xl font-bold text-primary">Ujiro Eruteya</a>
            </div>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="sr-only" htmlFor="name">Name</label>
                <input
                  className="w-full rounded-lg border-gray-900 p-3 text-sm"
                  placeholder="Name"
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only" htmlFor="email">Email</label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Email address"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="phone">Phone</label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Phone Number"
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="sr-only" htmlFor="message">Message</label>
                <textarea
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Message"
                  rows={8}
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              <div className="mt-4">
                <Button
                  type="submit"
                  className="inline-block w-full rounded-lg bg-primary px-5 py-3 font-medium text-background sm:w-auto"
                >
                  Send Enquiry
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
