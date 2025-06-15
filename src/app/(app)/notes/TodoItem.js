"use client";

import { Card, CardContent } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { CategoryBadge } from "./category-list";
import { DeleteBtn } from "./form";
import { updateTask } from "./action";

export default function TodoItem({ note, email }) {
  const [isChecked, setIsChecked] = useState(
    Boolean(note.isdone === "true" || note.isdone === true)
  );

  useEffect(() => {
    setIsChecked(Boolean(note.isdone === "true" || note.isdone === true));
  }, [note.isdone]); 

  const handleCheckboxChange = async () => {
    try {
      const newStatus = !isChecked;

      await updateTask(note._id, newStatus, email, note.category);

      setIsChecked(newStatus);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <Card key={note._id}>
      <CardContent className="flex items-center justify-between space-x-4 p-4">
        <h3 className="text-lg font-medium">{note.todo}</h3>
        <p className="text-sm">
          {moment(note.createdAt).format("MMM Do, YYYY")}
        </p>
        <CategoryBadge category={note.category} />
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="w-4 h-4"
          />
          <label className="text-sm">
            {isChecked ? "Completed" : "Pending"}
          </label>
        </div>
        <DeleteBtn id={note._id} />
      </CardContent>
    </Card>
  );
}
