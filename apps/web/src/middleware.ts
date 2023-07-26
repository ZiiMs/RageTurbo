import { useAuthStore } from "~/stores/authStore";
import { useAsyncStore } from "~/stores/useStore";
import { NextResponse, type NextRequest } from "next/server";

// const session = useAsyncStore(useAuthStore, (state) => state.session);
export function middleware(request: NextRequest) {
  console.log("Middleware caught");
  // if (session !== undefined && session !== null) {
  // return NextResponse.redirect(new URL("/dashboard", request.url));
  // }
}

export const config = {
  matcher: "/",
};
