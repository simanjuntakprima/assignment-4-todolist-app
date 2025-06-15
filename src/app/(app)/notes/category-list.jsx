"use client";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const categoryColors = {
  Errands: "bg-gray-500",
  Personal: "bg-purple-500",
  Learning: "bg-yellow-500",
  Fitness: "bg-red-500",
  Creative: "bg-pink-500",
  Finance: "bg-green-500",
  Work: "bg-blue-500",
};
export default function CategoryList({ selected, setSelected }) {
  const categoryOptions = [
    "Errands",
    "Personal",
    "Learning",
    "Fitness",
    "Creative",
    "Finance",
    "Work",
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <input
          name="category"
          type="text"
          value={selected}
          placeholder="Select category"
          readOnly
          className="border px-3 py-2 rounded w-60 cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        {categoryOptions.map((category) => (
          <DropdownMenuItem
            key={category}
            onClick={() => setSelected(category)}
          >
            {category}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function CategoryBadge({ category }) {
  return (
    <Badge
      className={`${
        categoryColors[category] || "bg-gray-500"
      } text-white px-2 py-1 rounded`}
    >
      {category}
    </Badge>
  );
}
