import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { userInfo } from 'os';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }
        console.log('Credentials received', credentials);
        const res = await fetch('https://dummyjson.com/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });

        console.log('Response status :', res.status);

        const user = await res.json();

        console.log('User Response :', user);

        if (res.ok && user?.accessToken) {
          return {
            id: String(user.id),
            name: user.name,
            email: user.email,
            accessToken: user.accessToken,
          };
        }
        return null;
      },
    }),
  ],

  pages: {
    signIn: '/login',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
      }
      return token;
    },

    async session({ session, token }) {
      (session as any).accessToken = token.accessToken as string;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
