import { createTRPCReact } from "@trpc/react-query";
import { type AppRouter } from "~/server/api/root";

export const api = createTRPCReact<AppRouter>({
  overrides: {
    useMutation: {
      async onSuccess(opts) {
        await opts.originalFn();
        await opts.queryClient.invalidateQueries();
      },
    },
  },
});
