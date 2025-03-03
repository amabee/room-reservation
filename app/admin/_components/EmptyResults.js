import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";

export const EmptyResults = ({ setIsAddRoomModalOpen }) => (
  <div className="flex flex-col items-center justify-center p-10 text-center">
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-full mb-4">
      <Search className="h-8 w-8 text-gray-400" />
    </div>
    <h3 className="text-lg font-medium mb-1">No rooms found</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
      Try adjusting your search criteria or create a new room.
    </p>
    <Button
      className="bg-blue-600 hover:bg-blue-700 text-white"
      onClick={() => setIsAddRoomModalOpen(true)}
    >
      <Plus className="h-4 w-4 mr-2" />
      Add New Room
    </Button>
  </div>
);
