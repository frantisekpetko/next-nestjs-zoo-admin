import NextAuth from 'next-auth';
//import Providers from 'next-auth/providers';
import FacebookProvider from 'next-auth/providers/facebook';

export default NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  /*
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session(session, token) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  */
});