import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const PageHeader = ({ searchQuery, setSearchQuery }) => (
  <div className="relative mb-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-6 shadow-lg text-white">
    <div className="absolute top-0 right-0 h-full w-1/3 opacity-10">
      <div className="relative h-full w-full">
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 h-full w-full"
        >
          <path
            fill="currentColor"
            d="M30.6,-51.1C40.9,-46,51.1,-40.3,57.4,-31C63.8,-21.7,66.3,-8.9,65.5,3.8C64.7,16.5,60.6,29.1,52.6,38.4C44.6,47.7,32.6,53.7,20.1,57.9C7.5,62.2,-5.7,64.7,-19.6,62.9C-33.6,61.1,-48.2,55,-58.5,44.2C-68.8,33.4,-74.7,17.9,-75.2,2.1C-75.7,-13.7,-70.9,-29.6,-61.4,-41.4C-51.9,-53.1,-37.7,-60.8,-24.6,-63.7C-11.4,-66.6,0.7,-64.7,10.6,-60.1C20.5,-55.5,30.3,-50.9,34.3,-43.8"
            transform="translate(100 100)"
          />
        </svg>
      </div>
    </div>

    <div className="flex flex-col md:flex-row items-start md:items-center justify-between relative z-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">All Rooms</h1>
        <p className="text-blue-100">Find and manage meeting spaces</p>
      </div>

      <div className="mt-4 md:mt-0 w-full md:w-auto">
        <div className="relative rounded-full shadow-lg overflow-hidden">
          <Input
            type="text"
            placeholder="Search rooms..."
            className="pr-10 pl-4 py-2 w-full md:w-64  placeholder-slate-300 backdrop-blur-sm border-0 text-gray-500 focus-visible:ring-2 focus-visible:ring-blue-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Search className="h-5 w-5 text-blue-200" />
          </div>
        </div>
      </div>
    </div>
  </div>
);
