"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Edit2, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { updateUser } from "@/lib/user-management";

const UpdateUserModal = ({ user, onUserUpdated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updatedUserInfo, setUpdatedUserInfo] = useState(null);

  useEffect(() => {
    if (user && isOpen) {
      setName(user.name || "");
      setEmail(user.email || "");
      setRole(user.role?.toLowerCase() || "");
    }
  }, [user, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !role) {
      return alert("Please fill all required fields");
    }

    setIsSubmitting(true);

    try {
      const { success, message, data } = await updateUser(
        user.user_id,
        name,
        email,
        password,
        role
      );

      if (!success) {
        return alert(message);
      }
      setUpdatedUserInfo({
        name,
        email,
        role,
      });
      setIsOpen(false);
      setShowSuccessDialog(true);

      if (onUserUpdated) {
        onUserUpdated();
      }

      //   if (result.success) {
      //     setUpdatedUserInfo({
      //       name,
      //       email,
      //       role,
      //     });
      //     setIsOpen(false);
      //     setShowSuccessDialog(true);
      //     if (onUserUpdated) {
      //       onUserUpdated();
      //     }
      //   } else {
      //     alert(result.message || "Failed to update user");
      //   }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="hidden group-hover:flex h-8 w-8 text-slate-500"
        onClick={() => setIsOpen(true)}
      >
        <Edit2 size={16} />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Update User</DialogTitle>
              <DialogDescription>
                Update user account details and role.
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
                <Label htmlFor="password" className="font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  <span className="animate-pulse">Updating...</span>
                ) : (
                  "Update User"
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
              User Updated Successfully
            </DialogTitle>
            <DialogDescription>
              User account has been updated with the following details:
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <Alert className="bg-slate-50 border-slate-200">
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-sm font-medium">Name:</div>
                  <div className="col-span-2">{updatedUserInfo?.name}</div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-sm font-medium">Email:</div>
                  <div className="col-span-2">{updatedUserInfo?.email}</div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-sm font-medium">Role:</div>
                  <div className="col-span-2 capitalize">
                    {updatedUserInfo?.role}
                  </div>
                </div>
              </div>
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

export default UpdateUserModal;
