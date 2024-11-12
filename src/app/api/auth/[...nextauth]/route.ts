import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import  prisma  from "@/lib/db";
import bcrypt from 'bcrypt'
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    pages:{
        signIn: '/auth/login'
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_Secret as string
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password", placeholder: "*****" },
            },
            async authorize(credentials, req) {
                console.log(credentials)

                const userFound = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                })
                if(!userFound) throw new Error('User not found')

                if(credentials?.password) {
                    const matchPassword = await bcrypt.compare(credentials.password, userFound.password)
                    if(!matchPassword) throw new Error('Invalid password')
                }
                
                return {
                    id: userFound.id.toString(),
                    userName: userFound.username,
                    email: userFound.email
                }
            },
        }),
    ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };