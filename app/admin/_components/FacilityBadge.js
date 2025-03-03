import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export const FacilityBadge = ({ facility, darkMode, facilityIcons }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge
          variant="outline"
          className={cn(
            "flex items-center gap-1 py-1 transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/30",
            darkMode
              ? "border-gray-700 bg-gray-700/50"
              : "border-gray-200 bg-gray-50"
          )}
        >
          {facilityIcons[facility] || null}
          <span className="text-xs">{facility}</span>
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <p>{facility} available</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
