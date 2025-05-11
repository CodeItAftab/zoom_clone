import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define protected routes
const protectedRoutes = createRouteMatcher([
  '/', '/upcoming', '/previous', '/recordings', '/personal-room', '/meeting(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (protectedRoutes(req)) await auth.protect()
})

export const config = {
  matcher: [
    '/((?!_next|favicon.ico|.*\\.(?:css|js|png|jpg|jpeg|svg|woff2?|ttf|ico)).*)',
    '/(api|trpc)(.*)',
  ],
};
