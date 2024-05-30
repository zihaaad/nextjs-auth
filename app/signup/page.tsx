/* eslint-disable react/no-unescaped-entities */
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
import React from "react";
import {SignupForm} from "@/components/client/form";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import {GoogleAuth} from "@/components/server/GoogleAuth";

export default async function Page() {
  const session = await auth();
  if (session?.user) redirect("/");
  return (
    <div className="flex justify-center items-center h-dvh">
      <Card className="w-10/12 md:w-2/4 xl:w-1/4">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Create Account with Your Own Credentials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
          <Separator className="my-2" />
          <GoogleAuth />
        </CardContent>
        <CardFooter>
          <Link href={"/login"} className="text-sm  w-full text-center">
            Already have an account? <b> Login</b>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
