import NextAuth from "next-auth";

import authConfig from "./auth.config";
import { authRoutes, publicRoutes , DEFAULT_LOGIN_REDIRECT  } from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req)=>{
    const {nextUrl} = req;
    const isLogedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if(isApiAuthRoute) return null;

    if(isAuthRoute){
        if(isLogedIn){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT , nextUrl));
        }
        return null;
    }

    if(!isPublicRoute && !isLogedIn){
        return Response.redirect(new URL("/auth/sign-in" , nextUrl));
    }
    return null;
})

export const config = {
  // copied from clerk
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};