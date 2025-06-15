import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import moment from "moment";
import { Form } from "./form";
import { getCookiesUser } from "@/utils/getCookies";
import { CategoryBadge } from "./category-list";
import TodoItem from "./TodoItem";

export default async function Page() {
  const email = await getCookiesUser();
  const res = await fetch(
    `https://v1.appbackend.io/v1/rows/oYb3s04YvrAA/?filterKey=owner&filterValue=${email}`
  );
  const { data: notes } = await res.json();

  const completedTasks = notes.filter(
    (note) => note.isdone == "true" || note.isdone == true
  );
  const pendingTasks = notes.filter(
    (note) => note.isdone == "false" || note.isdone == false
  );

  return (
    <div className="space-y-4 py-8">
      <Form email={email} />
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Tasks</h1>
        {pendingTasks.length > 0 ? (
          pendingTasks.map((note) => <TodoItem key={note._id} note={note} />)
        ) : (
          <p className="text-gray-500 text-sm">
            {"You don't have any pending tasks yet. Add more!"}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Completed</h1>
        {completedTasks.length > 0 ? (
          completedTasks.map((note) => <TodoItem key={note._id} note={note} />)
        ) : (
          <p className="text-gray-500 text-sm">
            No completed tasks yet. Keep going!
          </p>
        )}
      </div>
    </div>
  );
}
