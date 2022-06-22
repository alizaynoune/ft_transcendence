import NextAuth from "next-auth"
import FortyTwoProvider from "next-auth/providers/42-school";
export default NextAuth({
    
  // Configure one or more authentication providers
  providers: [
    FortyTwoProvider({
      clientId: process.env.API_ID_42 || "",
      clientSecret: process.env.API_SECRET_42 || "",
    }),
    // ...add more providers here
  ],
})