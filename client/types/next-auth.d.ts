import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's postal address. */
            address: string,
            email: string,
            name: string,
            image: string,
        }
    }
    /**
     * The shape of the user object returned in the OAuth providers' `profile` callback,
     * or the second parameter of the `session` callback, when using a database.
     */
    interface User { }
    /**
     * Usually contains information about the provider being used
     * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
     */
    interface Account { }
    /** The OAuth profile returned from your provider */
    interface Profile {}
}


declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        idToken?: string
    }
}

// email: 'alzaynou@student.1337.ma',
//   login: 'alzaynou',
//   first_name: 'Ali',
//   last_name: 'Zaynoune',
//   usual_full_name: 'Ali Zaynoune',
//   usual_first_name: null,
//   url: 'https://api.intra.42.fr/v2/users/alzaynou',
//   phone: 'hidden',
//   displayname: 'Ali Zaynoune',
//   image_url: 'https://cdn.intra.42.fr/users/alzaynou.jpg',
//   new_image_url: 'https://profile.intra.42.fr/users/alzaynou/photo',



// iss: 'https://accounts.google.com',
// azp: '578758287057-dggb4maot44b4scaor6vk2l7cu8gs4ke.apps.googleusercontent.com',
// aud: '578758287057-dggb4maot44b4scaor6vk2l7cu8gs4ke.apps.googleusercontent.com',
// sub: '110441023677829332012',
// email: 'zaynoune.ali@gmail.com',
// email_verified: true,
// at_hash: '1O8L2ChgOR_M9HN4BozTbA',
// name: 'ali zaynoune',
// picture: 'https://lh3.googleusercontent.com/a/AATXAJxBIbz6d3CB0qkK2wOJpXTITtgIsBYnq4mJtfC3=s96-c',
// given_name: 'ali',
// family_name: 'zaynoune',