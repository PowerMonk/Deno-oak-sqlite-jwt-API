import { Application } from "@oak/oak";
import {
  loggingErrorMiddleware,
  loggingMiddleware,
  rateLimiter,
} from "./utils/utilsMod.ts";
import { initializeDatabase } from "./db/dbMod.ts";
import { router } from "./routes/routesMod.ts";

const app = new Application();

// For the moment being, it creates the users and notices tables
initializeDatabase();

// Define routes
router
  .get("/healthy", (ctx) => {
    ctx.response.body = "Service is healthy";
    ctx.response.status = 200;
  })
  .post("/test-error", (_ctx) => {
    throw new Error("Simulated error for testing!");
  });

// Global middleware
app.use(loggingErrorMiddleware);
app.use(loggingMiddleware);
app.use(rateLimiter);

// Add router middleware
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ hostname, port }) => {
  console.log(`Server running at http://${hostname ?? "localhost"}:${port}/`);
});

await app.listen({ port: 8000 });
