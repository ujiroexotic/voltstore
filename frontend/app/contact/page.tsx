"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import React from "react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = { name, email, phone, message };

    try {
      const response = await fetch("https://api-voltstore.up.railway.app/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Your message was sent successfully!");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        alert("There was a problem submitting the form. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          {/* Developer Contact Info */}
          <div className="lg:col-span-2 lg:py-12">
            <p className="max-w-xl text-lg">
              Contact our developers directly for more information.
            </p>

            <div className="mt-8 space-y-4 text-primary font-bold text-2xl">
              <a href="https://github.com/IbnuJabir" target="_blank" rel="noopener noreferrer">
                Kedir Jabir
              </a>
              <a href="https://github.com/agbaniongithub" target="_blank" rel="noopener noreferrer">
                David Agbaniyaka
              </a>
              <a href="https://github.com/OrionDooms" target="_blank" rel="noopener noreferrer">
                Orion Dooms
              </a>
              <a href="https://github.com/ujiroexotic" target="_blank" rel="noopener noreferrer">
                Ujiro Eruteya
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="sr-only" htmlFor="name">Name</label>
                <input
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm"
                  placeholder="Name"
                  type="text"
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only" htmlFor="email">Email</label>
                  <input
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm"
                    placeholder="Email address"
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="phone">Phone</label>
                  <input
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm"
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
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm"
                  placeholder="Your message"
                  rows={8}
                  id="message"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <Button
                  type="submit"
                  className="inline-block w-full rounded-lg bg-primary px-5 py-3 font-medium text-white sm:w-auto"
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
