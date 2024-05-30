"use server";
import {CredentialsSignin} from "next-auth";
import {signIn} from "./auth";
import {connectToDatabase} from "./lib/utils";
import bcryptjs from "bcryptjs";
import {User} from "./models/user.model";
import {redirect} from "next/navigation";

export const credentialsLogin = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
    const err = error as CredentialsSignin;
    return err.cause;
  }
};

export const signUp = async (name: string, email: string, password: string) => {
  try {
    await connectToDatabase();
    const user = await User.findOne({email});

    if (user) return "User already exists";

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return "Account Created Successfully";
  } catch (error) {
    return "Failed To Create Account";
  }
};
