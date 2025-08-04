import Fastify from "fastify";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";

import { healthRoutes } from "@/routes/health";

const PORT = parseInt(process.env.PORT || "3001", 10);
const HOST = process.env.HOST || "0.0.0.0";

async function start() {
  const server = Fastify({
    logger: {
      level: process.env.LOG_LEVEL || "info",
    },
  }).withTypeProvider<ZodTypeProvider>();

  // Add schema validator and serializer
  server.setValidatorCompiler(validatorCompiler);
  server.setSerializerCompiler(serializerCompiler);

  // Register CORS
  await server.register(cors, {
    origin: process.env.CORS_ORIGIN || true,
    credentials: true,
  });

  // Register Swagger
  await server.register(swagger, {
    openapi: {
      info: {
        title: "Knowledge Base Crawler API",
        description: "API for managing knowledge base crawling operations",
        version: "1.0.0",
      },
      servers: [
        {
          url: `http://localhost:${PORT}`,
          description: "Development server",
        },
      ],
      components: {
        securitySchemes: {
          apiKey: {
            type: "apiKey",
            name: "X-API-Key",
            in: "header",
          },
        },
      },
    },
  });

  // Register Swagger UI
  await server.register(swaggerUI, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    staticCSP: true,
    transformSpecificationClone: true,
  });

  // Register routes
  await server.register(healthRoutes, { prefix: "/api/v1" });
  await server.register(dataSourcesRoutes, { prefix: "/api/v1" });
  await server.register(crawlerRoutes, { prefix: "/api/v1" });

  // Global error handler
  server.setErrorHandler((error, _request, reply) => {
    server.log.error(error);

    if (error.validation) {
      reply.status(400).send({
        error: "Validation Error",
        message: error.message,
        details: error.validation,
      });
      return;
    }

    reply.status(error.statusCode || 500).send({
      error: error.name || "Internal Server Error",
      message: error.message || "An unexpected error occurred",
    });
  });

  try {
    await server.listen({ port: PORT, host: HOST });
    server.log.info(`🚀 API server is running on http://${HOST}:${PORT}`);
    server.log.info(
      `📚 API documentation available at http://${HOST}:${PORT}/docs`,
    );
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

// Handle graceful shutdown
const gracefulShutdown = async (signal: string) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  process.exit(0);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

start().catch((err) => {
  console.error("Error starting server:", err);
  process.exit(1);
});
