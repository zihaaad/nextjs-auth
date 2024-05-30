import NextAuth, {AuthError, CredentialsSignin} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import {User} from "./models/user.model";
import {connectToDatabase} from "./lib/utils";

export const {handlers, signIn, signOut, auth} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {label: "Password", type: "pasword"},
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password)
          throw new CredentialsSignin({
            cause: "Please Provider both email and password",
          });

        await connectToDatabase();
        const user = await User.findOne({email}).select("+password");

        if (!user)
          throw new CredentialsSignin({cause: "Invalid Email or Password"});

        const isMatchPass = await bcryptjs.compare(password, user.password);

        if (!isMatchPass)
          throw new CredentialsSignin({cause: "Password Does not Match"});

        return {name: user.name, email: user.email, id: user._id};
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    signIn: async ({user, account}) => {
      if (account?.provider === "google") {
        try {
          const {email, name, image, id} = user;

          await connectToDatabase();

          const alreadyUser = await User.findOne({email});

          if (!alreadyUser)
            await User.create({email, name, image, googleId: id});

          return true;
        } catch (error) {
          throw new AuthError("Error white creating user");
        }
      }
      if (account?.provider === "credentials") {
        return true;
      }
      return false;
    },
  },
});
