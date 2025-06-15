"use client";
import { Input } from "@/components/ui/input";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useActionState } from "react";
import { loginAction } from "./action";

export default function Home() {
  const [_, action, pending] = useActionState(loginAction, null);
  return (
    <main className="h-screen flex justify-center items-center">
      <Card className="w-[400px]">
        <CardContent>
          <form className="space-y-2" action={action}>
            <Input name="email" placeholder="Input your email" />
            <Button
              disable={pending}
              type="submit"
              className="w-full btn-login"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
