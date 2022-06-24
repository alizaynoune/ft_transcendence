import NextAuth from "next-auth"
import FortyTwoProvider from "next-auth/providers/42-school";
import GoogleProvider from 'next-auth/providers/google';
export default  NextAuth({
  // 42-school provider
  providers: [
    FortyTwoProvider({
      clientId: process.env.FORTY_TWO_CLIENT_ID || "",
      clientSecret:  process.env.FORTY_TWO_CLIENT_SECRET || "",
      // profile(profile) {
      //   console.log(profile.email);
        
      //   return profile
      // }
    }),
    // google provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      // profile(profile) {
      //   console.log(profile);
        
      //   return profile
      // }
    })

    

  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log(profile);
      
      return true
    },
    async redirect({ url, baseUrl }) {
      // console.log(baseUrl, url, ',<<<<<<<<<<<<url');
      
      return baseUrl
    },
    async session({ session, user, token }) {
      // console.log(session);
      
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    }
  },
  // pages: {
  //   signIn: '/auth/login'
  // }
})
