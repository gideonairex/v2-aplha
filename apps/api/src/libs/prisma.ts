import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;
let prismaClient;

/* istanbul ignore next */
if (process.env.PRISMA_DEBUG === "true") {
  prismaClient = new PrismaClient({
    log: [
      { emit: "event", level: "query" },
      { emit: "stdout", level: "error" },
      { emit: "stdout", level: "info" },
      { emit: "stdout", level: "warn" },
    ],
  });

  prismaClient.$on("query", async (e) => {
    /* biome-ignore lint/suspicious/noConsole: Logging query details for debugging purposes */
    console.log(`Query:\n${e.query} \nParams:\n${e.params}`);
  });
} else {
  prismaClient = new PrismaClient();
}

/* istanbul ignore next */
if (process.env.NODE_ENV === "production") {
  prisma = prismaClient;
} else {
  const globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient;
  };
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = prismaClient;
  }
  prisma = globalWithPrisma.prisma;
}

export default prisma;
