
declare global {
  var cachedPrisma: PrismaClient;
}

import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient | undefined;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}

if (!prisma) {
  throw new Error('Failed to initialize Prisma Client.');
}

export const db = prisma;
