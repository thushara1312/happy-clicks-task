/* eslint-disable */

import { NextResponse } from "next/server";

const publicRoutes = ["/login"];
const authRoutes = ["/login", "/register"];

export default function middleware(request: any) {
	let accessToken = request.cookies.get("access_token");
	const isAuthenticated = !!accessToken;
	const { pathname, origin } = request.nextUrl;

	const isPublicRoute =
		publicRoutes?.some(
			(route) => route !== "/" && pathname.startsWith(route)
		);

	const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

	if (isAuthenticated && isAuthRoute) {
		return NextResponse.redirect(`${origin}`);
	}

	if (!isAuthenticated && !isPublicRoute && !isAuthRoute) {
		return NextResponse.redirect(`${origin}/login`);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets).*)"],
};
