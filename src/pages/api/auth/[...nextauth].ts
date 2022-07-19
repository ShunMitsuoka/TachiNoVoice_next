import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ApiService } from "../../../app/services/apiService";
import { RouteManager } from "../../../app/manages/routeManager";
import { ApiResponse } from "../../../app/models/apiResponse";
import axios from "axios";

export default NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials) {
                    return null;
                }
                await ApiService.getCSRF(true);
                let res: ApiResponse;
                let response = await axios
                .post(ApiService.getFullURL('api/auth/login', true), {
                    email: credentials.email,
                    password: credentials.password,
                });
                res = ApiService.makeApiResponse(response);
                let user = null;
                if (res.getSuccess()) {
                    const result = res.getResult();
                    user = {
                        id: result.user.id,
                        name: result.user.user_name,
                        email: result.user.email,
                        token: result.access_token,
                    }
                }
                if (user) {
                    return user
                } else {
                    throw new Error("");
                }
            }
        })
    ],
    callbacks: {
        async session({ session, user, token }) {
            console.log('session');
            console.log(session, user, token);
            if (token.token) {
                session.accessToken = token.token as string;
            }
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            console.log('jwt');
            console.log(token, user, account, profile, isNewUser);
            if (user?.token) {
                token.token = user.token;
            }
            return token
        }
    },
    pages: {
        signIn: RouteManager.webRoute.guest.auth.login,
        signOut: RouteManager.webRoute.guest.auth.login,
        error: RouteManager.webRoute.guest.auth.login,
    },
    debug: true
})