"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(_, formData) {
  const cookieStore = await cookies();
  const email = formData.get("email");
  console.log("email", email);
  cookieStore.set("email", email);
  redirect("/notes");
}
