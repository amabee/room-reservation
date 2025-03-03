import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";

export const AddRoomModal = ({
  isOpen,
  setIsOpen,
  newRoomForm,
  handleNewRoomInputChange,
  handleFacilityChange,
  handleAddRoom,
  darkMode,
  facilityIcons
}) => (
  <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogContent
      className={cn(
        "max-w-2xl rounded-lg",
        darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white"
      )}
    >
      <DialogHeader>
        <DialogTitle className="text-xl flex items-center gap-2 text-blue-600 dark:text-blue-400">
          <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full">
            <Plus className="h-5 w-5" />
          </div>
          Add New Room
        </DialogTitle>
      </DialogHeader>

      <form onSubmit={handleAddRoom} className="space-y-6 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Room Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. Conference Room C"
              value={newRoomForm.name}
              onChange={handleNewRoomInputChange}
              required
              className={cn(
                "transition-all duration-200 focus-visible:ring-blue-500",
                darkMode ? "bg-gray-700 border-gray-600" : ""
              )}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity" className="text-sm font-medium">
              Capacity
            </Label>
            <Input
              id="capacity"
              name="capacity"
              type="number"
              placeholder="e.g. 12"
              value={newRoomForm.capacity}
              onChange={handleNewRoomInputChange}
              required
              className={cn(
                "transition-all duration-200 focus-visible:ring-blue-500",
                darkMode ? "bg-gray-700 border-gray-600" : ""
              )}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="location" className="text-sm font-medium">
              Location
            </Label>
            <Input
              id="location"
              name="location"
              placeholder="e.g. 2nd Floor, West Wing"
              value={newRoomForm.location}
              onChange={handleNewRoomInputChange}
              required
              className={cn(
                "transition-all duration-200 focus-visible:ring-blue-500",
                darkMode ? "bg-gray-700 border-gray-600" : ""
              )}
            />
          </div>

          <div className="space-y-3 md:col-span-2">
            <Label className="text-sm font-medium">Facilities</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.keys(facilityIcons).map((facility) => (
                <div
                  key={facility}
                  className={cn(
                    "flex items-center space-x-2 p-3 rounded-md border transition-all",
                    newRoomForm.facilities.includes(facility)
                      ? "border-blue-400 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-600"
                      : "border-gray-200 dark:border-gray-700"
                  )}
                >
                  <Checkbox
                    id={`facility-${facility}`}
                    checked={newRoomForm.facilities.includes(facility)}
                    onCheckedChange={() => handleFacilityChange(facility)}
                    className="text-blue-600"
                  />
                  <Label
                    htmlFor={`facility-${facility}`}
                    className="flex items-center gap-2 cursor-pointer text-sm"
                  >
                    <div
                      className={cn(
                        "p-1 rounded-full",
                        newRoomForm.facilities.includes(facility)
                          ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
                          : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                      )}
                    >
                      {facilityIcons[facility]}
                    </div>
                    {facility}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="border-gray-300 dark:border-gray-600"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add Room
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
);
