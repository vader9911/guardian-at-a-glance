// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import BungieProvider from 'next-auth/providers/bungie';

export default NextAuth({
  providers: [
    BungieProvider({
      clientId: process.env.NEXT_PUBLIC_BUNGIE_CLIENT_ID,
      clientSecret: process.env.BUNGIE_CLIENT_SECRET,
      authorization: {
        url: 'https://www.bungie.net/en/OAuth/Authorize',
        params: {
          scope: 'ReadBasicUserProfile',
        },
      },
      token: {
        url: 'https://www.bungie.net/platform/app/oauth/token/',
      },
      userinfo: {
        url: 'https://www.bungie.net/platform/User/GetMembershipsForCurrentUser/',
      },
    }),
  ],
  callbacks: {
    async jwt(token, user, account) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session(session, token) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
