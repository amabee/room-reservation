"use client";
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MoreVertical, Edit, Trash2, Users, Mail, Key, UserPlus, Shield, CheckCircle, User, UserCheck, Filter, Download, RefreshCw } from 'lucide-react';
import { Toaster, toast } from "sonner";
import { cn } from "@/lib/utils";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: "John Smith", 
      email: "john.smith@example.com", 
      role: "Admin", 
      department: "IT", 
      status: "Active", 
      lastActive: "2025-02-26", 
      avatar: "/api/placeholder/32/32"
    },
    { 
      id: 2, 
      name: "Sarah Johnson", 
      email: "sarah.j@example.com", 
      role: "User", 
      department: "Marketing", 
      status: "Active", 
      lastActive: "2025-02-25", 
      avatar: "/api/placeholder/32/32"
    },
    { 
      id: 3, 
      name: "Michael Chen", 
      email: "m.chen@example.com", 
      role: "Approver", 
      department: "Operations", 
      status: "Active", 
      lastActive: "2025-02-23", 
      avatar: "/api/placeholder/32/32"
    },
    { 
      id: 4, 
      name: "Emma Williams", 
      email: "emma.w@example.com", 
      role: "User", 
      department: "HR", 
      status: "Inactive", 
      lastActive: "2025-02-10", 
      avatar: "/api/placeholder/32/32"
    },
    { 
      id: 5, 
      name: "Robert Davis", 
      email: "robert.d@example.com", 
      role: "Approver", 
      department: "Finance", 
      status: "Active", 
      lastActive: "2025-02-24", 
      avatar: "/api/placeholder/32/32"
    }
  ]);

  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "User",
    department: "",
    status: "Active"
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsAddingNew(false);
    setOpenDialog(true);
  };

  const handleAddNew = () => {
    setEditingUser(null);
    setNewUser({
      name: "",
      email: "",
      role: "User",
      department: "",
      status: "Active"
    });
    setIsAddingNew(true);
    setOpenDialog(true);
  };

  const handleSave = () => {
    if (isAddingNew) {
      // Add new user
      const newId = Math.max(...users.map(u => u.id)) + 1;
      const userToAdd = {
        ...newUser,
        id: newId,
        lastActive: new Date().toISOString().split('T')[0],
        avatar: "/api/placeholder/32/32"
      };
      setUsers([...users, userToAdd]);
      toast.success("User added successfully");
    } else {
      // Update existing user
      setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
      toast.success("User updated successfully");
    }
    setOpenDialog(false);
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
    toast.success("User deleted successfully");
  };

  const handleInputChange = (e) => {
    if (isAddingNew) {
      setNewUser({...newUser, [e.target.name]: e.target.value});
    } else {
      setEditingUser({...editingUser, [e.target.name]: e.target.value});
    }
  };

  const handleSelectChange = (name, value) => {
    if (isAddingNew) {
      setNewUser({...newUser, [name]: value});
    } else {
      setEditingUser({...editingUser, [name]: value});
    }
  };

  // Filter users based on search query and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = filterRole === "All" || user.role === filterRole;
    const matchesStatus = filterStatus === "All" || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadgeClass = (role) => {
    switch(role) {
      case "Admin":
        return "bg-purple-100 text-purple-800";
      case "Approver":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadgeClass = (status) => {
    return status === "Active" 
      ? "bg-green-100 text-green-800" 
      : "bg-red-100 text-red-800";
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Button 
          onClick={handleAddNew}
          className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add New User
        </Button>
      </div>

      <Toaster position="bottom-right" />

      <Card className="border-0 shadow-lg overflow-hidden mb-6">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle className="text-white">Users</CardTitle>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search users..."
                  className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/60 w-full md:w-64 rounded-xl"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <div className="flex gap-2">
                <Select value={filterRole} onValueChange={(val) => setFilterRole(val)}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white w-32 rounded-xl">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Roles</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Approver">Approver</SelectItem>
                    <SelectItem value="User">User</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={(val) => setFilterStatus(val)}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white w-32 rounded-xl">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Department</TableHead>
                <TableHead className="font-semibold">Role</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Last Active</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <TableRow key={user.id} className="hover:bg-blue-50 transition-colors">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                          <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>
                      <Badge className={cn("px-2 py-1 rounded-full", getRoleBadgeClass(user.role))}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Badge className={cn("px-2 py-1 rounded-full", getStatusBadgeClass(user.status))}>
                          {user.status === "Active" ? (
                            <>
                              <div className="h-1.5 w-1.5 rounded-full bg-green-600 mr-1.5"></div>
                              {user.status}
                            </>
                          ) : (
                            <>
                              <div className="h-1.5 w-1.5 rounded-full bg-red-600 mr-1.5"></div>
                              {user.status}
                            </>
                          )}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(user.lastActive).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEdit(user)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600" 
                            onClick={() => handleDelete(user.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <Users className="h-8 w-8 mb-2 text-gray-400" />
                      <p>No users found</p>
                      <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-between bg-gray-50 border-t px-6 py-3">
          <div className="text-sm text-gray-500">
            Showing {filteredUsers.length} of {users.length} users
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="rounded-xl">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="rounded-xl">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isAddingNew ? "Add New User" : "Edit User"}
            </DialogTitle>
            <DialogDescription>
              {isAddingNew 
                ? "Fill in the details to add a new user to the system." 
                : "Update the user's information."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={isAddingNew ? newUser.name : editingUser?.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={isAddingNew ? newUser.email : editingUser?.email}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Department
              </Label>
              <Input
                id="department"
                name="department"
                value={isAddingNew ? newUser.department : editingUser?.department}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select 
                value={isAddingNew ? newUser.role : editingUser?.role}
                onValueChange={(value) => handleSelectChange("role", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Approver">Approver</SelectItem>
                  <SelectItem value="User">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select 
                value={isAddingNew ? newUser.status : editingUser?.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {isAddingNew ? "Add User" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;