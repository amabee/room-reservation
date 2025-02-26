"use client";
import React, { useState } from "react";
import { Key } from "lucide-react";

export default function ChangePasswordPage() {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
    // Clear any previous error/success messages when user starts typing
    setPasswordError("");
    setSuccessMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      setPasswordError("All fields are required");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords don't match");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters long");
      return;
    }

    // Here you would typically call an API to update the password
    // For demo purposes, we'll just show a success message
    setSuccessMessage("Password updated successfully!");

    // Reset the form
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md mx-auto p-6">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
        Change Password
      </h3>

      {passwordError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {passwordError}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Current Password
          </label>
          <div className="relative">
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="••••••••"
            />
            <Key className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="••••••••"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}
