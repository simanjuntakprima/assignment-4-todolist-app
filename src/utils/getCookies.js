import "server-only";

import { cookies } from "next/headers";

export async function getCookiesUser() {
  const cookieStore = await cookies();
  const email = cookieStore.get("email").value;

  return email;
}
