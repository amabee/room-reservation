"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");
  2;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    console.log("Form Submitted", data);
  };

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-white w-full md:w-1/2 xl:w-3/5 h-screen">
        <div className="bg-white w-full md:w-1/2 xl:w-2/3 h-screen flex justify-center items-center">
          <img
            src="/psalogoo.png"
            alt="Logo"
            className="w-4/5 h-auto object-contain ml-32"
          />
        </div>
      </div>
      <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-2/5 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
        <div className="w-full h-100">
          <h1 className="text-xl font-bold">Room Reservation</h1>
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-8">
            Log in to your account
          </h1>

          <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-gray-700">Email Address</label>
              <Input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <Input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: 6,
                })}
                placeholder="Enter Password"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
              
            <Button
              type="submit"
              className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
            >
              Log In
            </Button>
          </form>

          <p className="text-sm text-gray-500 mt-12">
            &copy; 2025 Room Reservation - All Rights Reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
