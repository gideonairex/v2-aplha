import type { Prisma } from "@prisma/client";
import prisma from "src/libs/prisma";

class UserRepo {
  create(data: Prisma.UserCreateInput, tx?: Prisma.TransactionClient) {
    const prismaClient = tx ? tx : prisma;
    return prismaClient.user.create({ data: data });
  }
}

export default new UserRepo();
