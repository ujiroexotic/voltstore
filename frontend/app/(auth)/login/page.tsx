import { Button } from "@/components/ui/button";
import React from "react";

const Login = () => {
  return (
    <>
      <section className="bg-white">
          <main className="flex items-center justify-center px-8 py-8">
            <div className="max-w-xl lg:max-w-3xl">
              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome Back!
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Login so we can serve you better.
              </p>

              <form action="#" className="mt-8 grid grid-cols-6 gap-6">

                <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {" "}
                    Email{" "}
                  </label>

                  <input
                    type="email"
                    id="Email"
                    name="email"
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {" "}
                    Password{" "}
                  </label>

                  <input
                    type="password"
                    id="Password"
                    name="password"
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>


                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <Button>Login</Button>

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Don't have an account?
                    <a href="/register" className="text-gray-700 underline">
                      Register
                    </a>
                    .
                  </p>
                </div>
              </form>
            </div>
          </main>
      </section>
    </>
  );
};

export default Login;
