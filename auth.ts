import NextAuth, {CredentialsSignin} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";

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
      authorize: ({email, password}) => {
        console.log({email, password});

        if (typeof email !== "string")
          throw new CredentialsSignin({cause: "Email is not valid"});

        const user = {email, id: "alfhy32w4y"};
        if (password !== "passcode") {
          throw new CredentialsSignin({cause: "Password does not match"});
        } else return user;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
});
