import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Plus, Search, Image, X } from "lucide-react";
import { useState, useRef } from "react";

export const AddRoomModal = ({
  isOpen,
  setIsOpen,
  newRoomForm,
  handleNewRoomInputChange,
  handleFacilityChange,
  handleAddRoom,
  darkMode,
  facilityIcons,
  facilities,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const categories = {
    All: "All Facilities",
    Tech: [
      "Projector",
      "Television",
      "Video Conferencing",
      "Wi-Fi",
      "HDMI Cables",
      "USB Hubs",
      "Surround Sound Speakers",
      "Interactive Touchscreen",
      "VR Equipment",
      "LED Display Panels",
      "Bluetooth Speakers",
      "Wireless Charging Pads",
      "Smart Board",
      "Sound System",
      "Smart Lighting",
    ],
    Furniture: [
      "Conference Table",
      "Comfortable Chairs",
      "Couch",
      "Podium",
      "Bookshelf",
      "Adjustable Desks",
      "Glass Walls",
      "Folding Chairs",
    ],
    Comfort: [
      "Air Conditioning",
      "Heater",
      "Coffee Machine",
      "Refrigerator",
      "Water Dispenser",
      "Mini Bar",
      "Adjustable Lighting",
      "Portable Fan",
      "Smart Thermostat",
      "Curtains/Blinds",
      "Indoor Plants",
    ],
    Power: ["Power Outlets", "Charging Stations", "Wireless Charging Pads"],
    Safety: [
      "Emergency Exit",
      "Fire Extinguisher",
      "Security Cameras",
      "CO2 Detector",
      "Smoke Detector",
      "Emergency First Aid Kit",
      "Hand Sanitizer Station",
    ],
    Misc: [
      "Whiteboard",
      "Microphone",
      "Stage",
      "Writing Pads & Pens",
      "Locker Storage",
      "Printer",
      "Scanner",
      "Wall Clock",
      "Magazine Rack",
      "Waste Bins",
      "Key Card Access",
      "Smart Lock",
      "Automatic Door",
      "Outdoor Patio",
    ],
  };

  const filteredFacilities = facilities.filter((facility) => {
    const matchesSearch = facility.facility_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" ||
      categories[categoryFilter].includes(facility.facility_name);
    return matchesSearch && matchesCategory;
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleNewRoomInputChange({
        target: {
          name: "image",
          value: file,
          type: "file"
        }
      });
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    handleNewRoomInputChange({
      target: {
        name: "image",
        value: null,
        type: "file"
      }
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className={cn(
          "max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl rounded-lg overflow-hidden",
          darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white"
        )}
      >
        <DialogHeader className="sticky top-0 z-10 bg-inherit py-4 border-b border-gray-200 dark:border-gray-700">
          <DialogTitle className="text-xl flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full">
              <Plus className="h-5 w-5" />
            </div>
            Add New Room
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(85vh-8rem)] px-1 py-4">
          <form onSubmit={handleAddRoom} className="space-y-6">
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

              {/* Room Image Upload Section */}
              <div className="space-y-3 md:col-span-2">
                <Label htmlFor="room-image" className="text-sm font-medium">
                  Room Image
                </Label>
                
                <input
                  type="file"
                  id="room-image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="hidden"
                />

                {imagePreview ? (
                  <div className="relative">
                    <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 w-full h-36 sm:h-48">
                      <img 
                        src={imagePreview} 
                        alt="Room preview" 
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={clearImage}
                        className="absolute top-2 right-2 bg-gray-800/70 text-white p-1 rounded-full hover:bg-gray-900/90 transition-colors"
                        aria-label="Remove image"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={triggerFileInput}
                    className={cn(
                      "border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors h-36 sm:h-48",
                      darkMode 
                        ? "border-gray-600 hover:border-gray-500 bg-gray-800/50" 
                        : "border-gray-300 hover:border-gray-400 bg-gray-50/50"
                    )}
                  >
                    <Image className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400 mb-2" />
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center">
                      Click to upload room image
                      <br />
                      <span className="text-xs hidden sm:inline">JPG, PNG, GIF up to 5MB</span>
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-3 md:col-span-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Facilities</Label>
                  <div className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                    {newRoomForm.facilities.length} selected
                  </div>
                </div>

                {/* Search and filter */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search facilities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={cn(
                        "pl-9 transition-all duration-200 focus-visible:ring-blue-500",
                        darkMode ? "bg-gray-700 border-gray-600" : ""
                      )}
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className={cn(
                        "w-full h-10 px-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500",
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      )}
                    >
                      {Object.keys(categories).map((category) => (
                        <option key={category} value={category}>
                          {categories[category] === "All Facilities"
                            ? "All Facilities"
                            : `${category} (${categories[category].length})`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 max-h-40 sm:max-h-60 overflow-y-auto p-1 border rounded-md border-gray-200 dark:border-gray-700">
                  {filteredFacilities.length > 0 ? (
                    filteredFacilities.map((facility) => (
                      <div
                        key={facility.facility_id}
                        className={cn(
                          "flex items-center space-x-2 p-2 sm:p-3 rounded-md border transition-all",
                          newRoomForm.facilities.includes(facility.facility_id)
                            ? "border-blue-400 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-600"
                            : "border-gray-200 dark:border-gray-700"
                        )}
                      >
                        <Checkbox
                          id={`facility-${facility.facility_id}`}
                          checked={newRoomForm.facilities.includes(
                            facility.facility_id
                          )}
                          onCheckedChange={() =>
                            handleFacilityChange(facility.facility_id)
                          }
                          className="text-blue-600"
                        />
                        <Label
                          htmlFor={`facility-${facility.facility_id}`}
                          className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm truncate"
                        >
                          <div
                            className={cn(
                              "p-1 rounded-full",
                              newRoomForm.facilities.includes(
                                facility.facility_id
                              )
                                ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
                                : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                            )}
                          >
                            {facilityIcons[facility.facility_name]}
                          </div>
                          <span className="truncate">
                            {facility.facility_name}
                          </span>
                        </Label>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full flex items-center justify-center h-20 text-gray-500 dark:text-gray-400">
                      No facilities match your search
                    </div>
                  )}
                </div>

                {newRoomForm.facilities.length > 0 && (
                  <div
                    className={cn(
                      "p-3 rounded-md border text-sm",
                      darkMode
                        ? "border-gray-700 bg-gray-800"
                        : "border-gray-200 bg-gray-50"
                    )}
                  >
                    <div className="font-medium mb-1 text-xs sm:text-sm">Selected facilities:</div>
                    <div className="flex flex-wrap gap-1">
                      {newRoomForm.facilities.map((facilityId) => {
                        const facility = facilities.find(
                          (f) => f.facility_id === facilityId
                        );
                        return (
                          <div
                            key={facilityId}
                            className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs flex items-center gap-1"
                          >
                            {facility ? facility.facility_name : facilityId}
                            <button
                              type="button"
                              onClick={() => handleFacilityChange(facilityId)}
                              className="hover:text-blue-900 dark:hover:text-blue-100"
                            >
                              ×
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>

        <DialogFooter className="sticky bottom-0 z-10 bg-inherit mt-2 py-4 px-6 border-t border-gray-200 dark:border-gray-700">
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
            onClick={handleAddRoom}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add Room
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};