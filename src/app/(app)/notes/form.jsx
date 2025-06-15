"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Avatar from "boring-avatars";
import React, { useActionState, useState } from "react";
import { createTodoAction, deleteTodoAction } from "./action";
import CategoryList from "./category-list";

export const Form = ({ email }) => {
  const [selected, setSelected] = useState("");
  const handleSubmit = async (prevState, formData) => {
    const todo = formData.get("todo");
    const category = formData.get("category");

    if (!todo || !category) {
      alert("Please fill in all fields!");
      return;
    }

    setSelected("");
    await createTodoAction(prevState, formData);
  };
  const [_, action, pending] = useActionState(handleSubmit, null);

  return (
    <form className="space-y-2" action={action}>
      <CategoryList selected={selected} setSelected={setSelected} />
      <Textarea placeholder="write what you gonna todo" name="todo" />
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Avatar name={email} className="w-5 h-5" variant="beam" />
          <div className="font-medium text-sm">Posted as {email}</div>
        </div>
        <Button disabled={pending}>{pending ? "Adding..." : "Add Todo"}</Button>
      </div>
    </form>
  );
};

export const DeleteBtn = ({ id }) => {
  return (
    <form action={deleteTodoAction}>
      <input hidden name="id" value={id} readOnly />
      <Button variant="destructive">Delete</Button>
    </form>
  );
};
