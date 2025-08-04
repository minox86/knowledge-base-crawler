import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

const healthRoutes: FastifyPluginAsync = async function (fastify) {
  const server = fastify.withTypeProvider<ZodTypeProvider>();

  // Health check endpoint
  server.get(
    "/health",
    {
      schema: {
        description: "Health check endpoint",
        tags: ["Health"],
        response: {
          200: z.object({
            status: z.literal("ok"),
            timestamp: z.string(),
            uptime: z.number(),
            version: z.string(),
          }),
        },
      },
    },
    async (_request, reply) => {
      return reply.code(200).send({
        status: "ok" as const,
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: process.env.npm_package_version || "1.0.0",
      });
    },
  );

  // Readiness check endpoint
  server.get(
    "/ready",
    {
      schema: {
        description: "Readiness check endpoint",
        tags: ["Health"],
        response: {
          200: z.object({
            status: z.literal("ready"),
            checks: z.object({
              database: z.boolean(),
              services: z.boolean(),
            }),
          }),
          503: z.object({
            status: z.literal("not ready"),
            checks: z.object({
              database: z.boolean(),
              services: z.boolean(),
            }),
          }),
        },
      },
    },
    async (_request, reply) => {
      // In a real application, these would be actual checks
      const checks = {
        database: true, // Check database connectivity
        services: true, // Check external services
      };

      const isReady = Object.values(checks).every(Boolean);

      return reply.code(isReady ? 200 : 503).send({
        status: isReady ? ("ready" as const) : ("not ready" as const),
        checks,
      });
    },
  );
};

export { healthRoutes };
