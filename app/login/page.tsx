/* eslint-disable react/no-unescaped-entities */
import {auth, signIn} from "@/auth";
import {LoginForm} from "@/components/client/form";
import {GoogleAuth} from "@/components/server/GoogleAuth";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import {redirect} from "next/navigation";
import React from "react";

export default async function Page() {
  const session = await auth();

  if (session?.user) redirect("/");

  return (
    <div className="flex justify-center items-center h-dvh">
      <Card className="w-10/12 md:w-2/4 xl:w-1/4">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to access many functionality</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <Separator className="my-2" />
          <GoogleAuth />
        </CardContent>
        <CardFooter>
          <Link href={"/signup"} className="text-sm  w-full text-center">
            Don't have an account? <b> Sign Up</b>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
