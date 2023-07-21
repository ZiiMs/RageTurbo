import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { env } from "~/env.mjs";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

// import type { NextRequest } from "next/server";

// export API handler
const handler = (request: Request) => {
  console.log(`incoming request ${request.url}`);

  // const req = new Request(request.url, {
  //   headers: request.headers,
  //   cache: request.cache,
  //   credentials: request.credentials,
  //   integrity: request.integrity,
  //   keepalive: request.keepalive,
  //   method: request.method,
  //   mode: request.mode,
  //   redirect: request.redirect,
  //   referrer: request.referrer,
  //   referrerPolicy: request.referrerPolicy,
  //   signal: request.signal,
  //   body: request.body,
  // });
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    router: appRouter,
    req: request,
    createContext(opts) {
      return createTRPCContext({
        resHeaders: opts.resHeaders,
        req: opts.req,
      });
      // return {};
    },
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
            );
          }
        : undefined,
  });
};

export { handler as GET, handler as POST };
