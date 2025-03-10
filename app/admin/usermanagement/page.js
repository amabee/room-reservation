"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search,
  UserPlus,
  Filter,
  RefreshCw,
  MoreHorizontal,
  Edit2,
  Trash2,
  ChevronDown,
  AlertCircle,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { deleteUser, fetchUsers } from "@/lib/user-management";
import { formatDate } from "@/lib/utils";
import CreateUserModal from "../_components/CreateUserModal";
import UpdateUserModal from "../_components/UpdateUserModal";
import { AnimatePresence } from "framer-motion";
import { NotificationToast } from "../_components/RoomNotification";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    getAllusers();
  }, []);

  const getAllusers = async () => {
    const { success, message, data } = await fetchUsers();

    if (!success) {
      return alert("Something went wrong");
    }

    setUsers(data);

    setIsLoading(false);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteUser = async (id) => {
    setDeletingUserId(id);

    try {
      const { success, message, data } = await deleteUser(id);

      if (!success) {
        return setNotification({
          type: "error",
          message: `Something went wrong: ${message}`,
        });
      }

      getAllusers();

      setNotification({
        type: "success",
        message: `User Deleted!`,
      });
    } catch (error) {
      setNotification({
        type: "error",
        message: `Error: ${error.message}`,
      });
    } finally {
      setDeletingUserId(null);
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto transition-all duration-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage users, roles and permissions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <CreateUserModal onUserCreated={getAllusers} />
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shadow-sm"
            onClick={() => getAllusers()}
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
          </Button>
        </div>
      </div>

      <Card className="shadow-md border border-slate-200 dark:border-slate-800 transition-all duration-200 hover:shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>User List</CardTitle>
              <CardDescription className="mt-1">
                {users.length > 0
                  ? `Showing ${filteredUsers.length} of ${users.length} users`
                  : "No users found"}
              </CardDescription>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search users..."
                  className="pl-8 w-full sm:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <RefreshCw
                size={24}
                onClick={() => getAllusers()}
                className="animate-spin text-primary"
              />
            </div>
          ) : users.length > 0 ? (
            <div className="overflow-hidden rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-900">
                    <TableHead className="font-medium">User</TableHead>
                    <TableHead className="font-medium">Role</TableHead>
                    <TableHead className="font-medium">Date Joined</TableHead>
                    <TableHead className="font-medium text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow
                      key={user.user_id}
                      className={`transition-colors group ${
                        deletingUserId === user.user_id
                          ? "bg-red-50 dark:bg-red-900/20"
                          : ""
                      }`}
                    >
                      <TableCell className="py-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 border">
                            <AvatarImage
                              src="/api/placeholder/40/40"
                              alt={user.name}
                            />
                            <AvatarFallback>
                              {user.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-normal">
                          {user.role.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {formatDate(user.created_at)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <UpdateUserModal
                            user={user}
                            onUserUpdated={getAllusers}
                          />
                          {deletingUserId === user.user_id ? (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500"
                              disabled
                            >
                              <Loader2 size={16} className="animate-spin" />
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="hidden group-hover:flex h-8 w-8 text-red-500"
                              onClick={() => handleDeleteUser(user.user_id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <AlertCircle className="h-10 w-10 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">No users found</h3>
              <p className="text-muted-foreground mt-1">
                Get started by adding your first user.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      <AnimatePresence>
        {notification && <NotificationToast notification={notification} />}
      </AnimatePresence>
    </div>
  );
};

export default UserManagement;
