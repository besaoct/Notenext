import  { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/app/lib/prismadb";
import bcryptjs from 'bcrypt';
import GoogleProvider from 'next-auth/providers/google';
import { sendEmail } from "@/app/(backend)/helpers/mailer";


export const Options: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
            
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),

        CredentialsProvider({
          
            credentials: {
                email: { label: 'email', type: 'email' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials) {
               if (!credentials?.email || !credentials?.password) {
                  throw new Error('Invalid credentials');
                 }
           
            const user = await prisma.user.findUnique({
              where: {
               email: credentials.email
               }
              });

          if (!user || !user?.password) {
          throw new Error('Invalid credentials');
          }
        
              //if the user email is not verified
          const NotVerifiedUser = await prisma.user.findUnique({
              where: {
                 email: credentials.email,
                 email_verified: false
               }
          });
              
          if (NotVerifiedUser) {
             const email= NotVerifiedUser?.email
             await sendEmail({ email, emailType: "VERIFY", userId: user.id })
             throw new Error('Notverified');
          }
              
        const isCorrectPassword = await bcryptjs.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }

        return user;
            }
        
        }),],
    pages: {
    signIn: '/auth/login'
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
