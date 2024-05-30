"use server";
import {CredentialsSignin} from "next-auth";
import {signIn} from "./auth";
import {connectToDatabase} from "./lib/utils";
import bcryptjs from "bcryptjs";
import {User} from "./models/user.model";

export const credentialsLogin = async (email: string, password: string) => {
  try {
    const user = await User.findOne({email});
    const isGoogleUser = user.googleId;
    if (isGoogleUser)
      return {
        err: "Already Have Account with Google",
      };

    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
    const err = error as CredentialsSignin;
    return {err: err.cause};
  }
};

export const signUp = async (name: string, email: string, password: string) => {
  try {
    await connectToDatabase();
    const user = await User.findOne({email});

    if (user) {
      const err = "User Already Exists";
      return {err};
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return {message: "Account Created Successfully"};
  } catch (error) {
    const err = error;
    return {err};
  }
};
