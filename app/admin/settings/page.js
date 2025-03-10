"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AnimatePresence } from "framer-motion";
import { NotificationToast } from "../_components/RoomNotification";
import { updateUserPassword } from "@/lib/account-management";

export default function SettingsPage() {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      setNotification({
        type: "error",
        message: `New Password and Confirm Password are not the same!`,
      });

      return;
    }

    const { success, message, data } = await updateUserPassword(
      passwords.currentPassword,
      passwords.confirmPassword
    );

    if (!success) {
      console.log(data);
      setNotification({
        type: "error",
        message: message,
      });

      setTimeout(() => {
        setNotification(null);
      }, 1000);
      return;
    }

    setPasswords({
      currentPassword: "",
      confirmPassword: "",
      newPassword: "",
    });

    setNotification({
      type: "success",
      message: `Password successfully updated!`,
    });

    setTimeout(() => {
      setNotification(null);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Change Password</h1>
      <Card>
        <CardHeader>
          <CardTitle>Update Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={passwords.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
                required
              />
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={passwords.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                required
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={passwords.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                required
              />
            </div>
            <Button type="submit">Change Password</Button>
          </form>
        </CardContent>
      </Card>

      <AnimatePresence>
        {notification && <NotificationToast notification={notification} />}
      </AnimatePresence>
    </div>
  );
}
