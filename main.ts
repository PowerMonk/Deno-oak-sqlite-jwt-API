import { Application } from "@oak/oak";
import {
  errorMiddleware,
  formatSuccessResponse,
  loggingMiddleware,
} from "./utils/utilsMod.ts";
import { initializeDatabase } from "./db/dbMod.ts";
import { router } from "./routes/routesMod.ts";

const app = new Application();

// For the moment being, it creates the users and notices tables
initializeDatabase();

// Define routes
router.get("/healthy", (ctx) => {
  ctx.response.body = formatSuccessResponse("Service is healthy", 200, {
    timestamp: Date.now(),
  });
});

// Global middleware
app.use(errorMiddleware);
app.use(loggingMiddleware);

// Add router middleware
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ hostname, port }) => {
  console.log(`Server running at http://${hostname ?? "localhost"}:${port}/`);
});

await app.listen({ port: 8000 });
