"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useRef, useEffect } from "react";
import { useRegisterUserMutation } from "@/redux/slices/userApiSlice";
import { FiAlertCircle } from "react-icons/fi";
import { BiLoaderAlt } from "react-icons/bi";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  // Initialize the mutation hook
  const [registerUser, { isLoading, isError, error }] =
    useRegisterUserMutation();
  const firstErrorRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(""); // Reset message before submission

    // Password strength validation
    if (formData.password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      setMessageType("error");
      if (firstErrorRef.current) firstErrorRef.current.focus();
      return;
    }

    try {
      const result = await registerUser(formData).unwrap();
      setMessage("Account created successfully!");
      setMessageType("success");
      console.log(result);
      router.push("/login");
      
    } catch (err) {
      console.error("Failed to register:", err);
      setMessage("Failed to create account. Please try again.");
      setMessageType("error");
      if (firstErrorRef.current) firstErrorRef.current.focus();
    }
  };

  // Type guard to extract error message if available
  const getErrorMessage = () => {
    if (error && "data" in error) {
      return (
        (error.data as { message?: string }).message || "Registration failed"
      );
    }
    return "Registration failed";
  };

  return (
    <>
      <section className="bg-white">
        <main className="flex items-center justify-center px-8 py-8 sm:px-12">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome to VoltStore
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              We are happy to have you onboard! Sign up so we can remember you.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 grid grid-cols-1 gap-6"
            >
              <div className="w-full flex flex-col gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="FirstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="FirstName"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm px-3 py-2"
                    placeholder="Enter your first name"
                    required
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm px-3 py-2"
                    placeholder="Enter your email address"
                    required
                    ref={isError ? firstErrorRef : null}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`mt-1 w-full rounded-md border-gray-200 ${
                      isError ? "border-red-500" : ""
                    } bg-white text-sm text-gray-700 shadow-sm px-3 py-2`}
                    placeholder="Enter your password"
                    required
                    ref={firstErrorRef}
                    aria-invalid={isError}
                    aria-describedby="passwordHelp"
                  />
                  <p id="passwordHelp" className="text-xs text-gray-500 mt-1">
                    Must be at least 8 characters long.
                  </p>
                </div>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto flex items-center gap-2"
                >
                  {isLoading && <BiLoaderAlt className="animate-spin" />}
                  {isLoading ? "Creating..." : "Create an account"}
                </Button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0 sm:ml-4">
                  Already have an account?{" "}
                  <a href="/login" className="underline ml-1 text-blue-500">
                    Log in
                  </a>
                  .
                </p>
              </div>
            </form>

            {message && (
              <p
                className={`mt-4 ${
                  messageType === "success" ? "text-green-500" : "text-red-500"
                } font-semibold flex items-center gap-2`}
                aria-live="polite"
              >
                {messageType === "error" && <FiAlertCircle />}
                {message}
              </p>
            )}
            {isError && (
              <p
                className="mt-4 text-red-500 font-semibold flex items-center gap-2"
                aria-live="polite"
              >
                <FiAlertCircle />
                {getErrorMessage()}
              </p>
            )}
          </div>
        </main>
      </section>
    </>
  );
};

export default Register;
