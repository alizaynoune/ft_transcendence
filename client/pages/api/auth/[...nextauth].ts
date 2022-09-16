import NextAuth from "next-auth"
import FortyTwoProvider from "next-auth/providers/42-school";
import GoogleProvider from 'next-auth/providers/google';



import type { NextApiRequest, NextApiResponse } from "next"

// export default async function auth(req: NextApiRequest, res: NextApiResponse) {
//   console.log(req.method, req.url);
  
//   // Do whatever you want here, before the request is passed down to `NextAuth`
//   // return await NextAuth(req, res, {
//   //   ...
//   // })
// }



export default  NextAuth({
  // 42-school provider
  providers: [
    FortyTwoProvider({
      clientId: process.env.FORTY_TWO_CLIENT_ID || "",
      clientSecret:  process.env.FORTY_TWO_CLIENT_SECRET || "",
    }),
    // google provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      
    })

    

  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log(user, account, profile, email, credentials)
      // console.log(profile);
      
      return true
    },
    async redirect({ url, baseUrl }) {
      
      return baseUrl
    },
    async session({ session, user, token }) {
//console.log(token);
      
      
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log(isNewUser);
      
      return token
    }
  },
})

// curl -X GET "https://www.googleapis.com/oauth2/v1/userinfo?alt=json" -H"Authorization: Bearer "
// curl  "https://api.intra.42.fr/v2/me" -H "Authorization: Bearer "
