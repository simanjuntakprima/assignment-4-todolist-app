"use server";
import { getCookiesUser } from "@/utils/getCookies";
import { revalidatePath } from "next/cache";

export async function createTodoAction(_, formData) {
  const category = formData.get("category");
  console.log("category " + category);
  const todo = formData.get("todo");
  console.log("todo " + todo);
  const email = await getCookiesUser();

  await fetch("https://v1.appbackend.io/v1/rows/oYb3s04YvrAA", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([{ todo, isdone: "false", owner: email, category }]),
  });
  revalidatePath("/notes");
}

export async function deleteTodoAction(formData) {
  const todoId = formData.get("id");
  console.log(todoId);
  try {
    const response = await fetch(
      `https://v1.appbackend.io/v1/rows/oYb3s04YvrAA`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([todoId]),
      }
    );

    const result = await response.json();
    console.log("Deleted:", result);

    if (!response.ok) {
      console.error("Failed to delete todo item.");
      return;
    }

    revalidatePath("/");
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
}

export async function updateTask(id, isDone, email, category) {
  try {
    const response = await fetch(
      `https://v1.appbackend.io/v1/rows/oYb3s04YvrAA`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: id,
          isdone: isDone ? "true" : "false",
          owner: email,
          category: category,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update task.");
    }

    revalidatePath("/tasks");
  } catch (error) {
    console.error("Error updating task:", error);
  }
}
