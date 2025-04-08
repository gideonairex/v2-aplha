import type { User } from "@prisma/client";
import type { Prisma } from "@prisma/client";
import userRepo from "src/repositories/users/userRepo";

export default class UserService {
  private userRepo: typeof userRepo;

  constructor() {
    this.userRepo = userRepo;
  }

  async create({
    firstName,
    lastName,
    email,
  }: Prisma.UserCreateInput): Promise<User> {
    // checks and logic here
    return this.userRepo.create({
      firstName,
      lastName,
      email,
    });
  }
}
