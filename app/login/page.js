"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (inputData) => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const { success, data, message } = await login(
        inputData.email,
        inputData.password
      );

      if (!success) {
        return alert(message);
      }

      router.push("/");
      router.refresh();

      alert("Success?");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
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

          {errorMessage && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
              role="alert"
            >
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}

          <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-gray-700">Email Address</label>
              <Input
                type="email"
                {...register("email")}
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
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
                {...register("password")}
                placeholder="Enter Password"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
            >
              {isLoading ? "Logging in..." : "Log In"}
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
