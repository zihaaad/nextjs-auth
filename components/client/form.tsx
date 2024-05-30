"use client";
import {credentialsLogin, signUp} from "@/action";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

export const LoginForm = () => {
  const router = useRouter();
  return (
    <form
      action={async (formData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const toastId = toast.loading("Logging In");

        if (!email || !password)
          return toast.error("Please provide all fields", {id: toastId});

        const err = await credentialsLogin(email, password);

        if (!err) {
          toast.success("Logged In Successfully", {id: toastId});
          router.refresh();
        } else {
          toast.error(String(err), {id: toastId});
        }
      }}
      className="flex flex-col gap-4">
      <Input type="email" name="email" placeholder="example@gmail.com" />
      <Input type="password" name="password" placeholder="Password" />
      <Button type="submit">Login</Button>
    </form>
  );
};

export const SignupForm = () => {
  return (
    <form
      action={async (formData) => {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password || !name)
          return toast.info("Please Provide All Fields");

        const res = await signUp(name, email, password);

        if (res) {
          return toast.success(res);
        } else {
          return toast.success("Failed To Create Account");
        }
      }}
      className="flex flex-col gap-4">
      <Input type="text" name="name" placeholder="Name" />
      <Input type="email" name="email" placeholder="example@gmail.com" />
      <Input type="password" name="password" placeholder="Password" />
      <Button type="submit">Sign Up</Button>
    </form>
  );
};
