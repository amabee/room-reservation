"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Copy, CheckCircle } from "lucide-react";
import { createUser } from "@/lib/user-management";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const CreateUserModal = ({ onUserCreated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdUserInfo, setCreatedUserInfo] = useState(null);
  const [passwordCopied, setPasswordCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !role) {
      return alert("Please fill all required fields");
    }

    setIsSubmitting(true);

    try {
      const password = generateRandomPassword();

      const { success, message, data } = await createUser(
        name,
        email,
        password,
        role
      );

      if (success) {
        setCreatedUserInfo({
          name,
          email,
          role,
          password,
        });

        setName("");
        setEmail("");
        setRole("");

        setIsOpen(false);

        setShowSuccessDialog(true);

        if (onUserCreated) {
          onUserCreated();
        }
      } else {
        alert(message || "Failed to create user");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateRandomPassword = () => {
    const uppercaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijkmnopqrstuvwxyz";
    const numberChars = "23456789";
    const specialChars = "!@#$%^&*_-+=";

    let password = "";
    password += uppercaseChars.charAt(
      Math.floor(Math.random() * uppercaseChars.length)
    );
    password += lowercaseChars.charAt(
      Math.floor(Math.random() * lowercaseChars.length)
    );
    password += numberChars.charAt(
      Math.floor(Math.random() * numberChars.length)
    );
    password += specialChars.charAt(
      Math.floor(Math.random() * specialChars.length)
    );

    const allChars =
      uppercaseChars + lowercaseChars + numberChars + specialChars;
    for (let i = 0; i < 8; i++) {
      password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    return password
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("");
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setPasswordCopied(true);
        setTimeout(() => setPasswordCopied(false), 2000);
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <>
      {/* Create User Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="gap-2 shadow-sm" size="sm">
            <UserPlus size={16} />
            <span className="hidden sm:inline">Add User</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new user account with specified email and role.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="font-medium">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="font-medium">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="role" className="font-medium">
                  Role <span className="text-red-500">*</span>
                </Label>
                <Select value={role} onValueChange={setRole} required>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="animate-pulse">Creating...</span>
                  </>
                ) : (
                  "Create User"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-emerald-600">
              <CheckCircle size={20} />
              User Created Successfully
            </DialogTitle>
            <DialogDescription>
              User account has been created with the following details:
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <Alert className="bg-slate-50 border-slate-200">
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-sm font-medium">Name:</div>
                  <div className="col-span-2">{createdUserInfo?.name}</div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-sm font-medium">Email:</div>
                  <div className="col-span-2">{createdUserInfo?.email}</div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-sm font-medium">Role:</div>
                  <div className="col-span-2 capitalize">
                    {createdUserInfo?.role}
                  </div>
                </div>
              </div>
            </Alert>

            <Alert className="bg-amber-50 border-amber-200">
              <AlertTitle className="text-amber-800 flex items-center gap-2">
                Temporary Password
              </AlertTitle>
              <AlertDescription className="mt-2">
                <div className="flex items-center justify-between bg-white p-2 rounded border border-amber-200">
                  <code className="font-mono">{createdUserInfo?.password}</code>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() => copyToClipboard(createdUserInfo?.password)}
                  >
                    {passwordCopied ? (
                      <CheckCircle size={16} className="text-green-500" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </Button>
                </div>
                <p className="text-sm mt-2 text-amber-700">
                  Please save this password or share it with the user securely.
                  This password will not be shown again.
                </p>
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter className="mt-4">
            <Button onClick={() => setShowSuccessDialog(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateUserModal;
