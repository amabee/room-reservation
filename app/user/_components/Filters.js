"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Filters({ setActiveFilter }) {
  return (
    <div className="mb-6">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="all" onClick={() => setActiveFilter("all")}>
            All Rooms
          </TabsTrigger>
          <TabsTrigger
            value="available"
            onClick={() => setActiveFilter("available")}
          >
            Available
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
