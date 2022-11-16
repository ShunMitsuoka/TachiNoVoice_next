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
                let res : ApiResponse | null  = null;
                let user = null;
                await axios.post(ApiService.getFullURL('api/auth/login', true), {
                    email: credentials.email,
                    password: credentials.password,
                })
                .then(response => {
                    res = ApiService.makeApiResponse(response);
                    if (res.getSuccess()) {
                        const result = res.getResult();
                        user = {
                            id: result.user.id,
                            name: result.user.user_name,
                            is_verified: result.is_verified,
                            email: result.user.email,
                            token: result.access_token,
                        }
                    }
                })
                .catch(error => {
                    res = ApiService.makeApiErrorResponse(error);
                })
                if(res && (res as ApiResponse).getStatusCode() == 403){
                    console.log((res as ApiResponse).getStatusCode())
                    throw new Error(RouteManager.webRoute.guest.auth.verifyEmail);
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
            if (token.token) {
                session.accessToken = token.token as string;
                session.is_verified = token.is_verified as boolean;
            }
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user?.token) {
                token.token = user.token;
                token.is_verified = user.is_verified;
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