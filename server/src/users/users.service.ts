import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { users, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async user(
    usersWhereUniqueInput: Prisma.usersWhereUniqueInput,
  ): Promise<users | null> {
    try {
      return await this.prisma.users.findUnique({
        where: usersWhereUniqueInput,
      });
    } catch (error) {
      return error;
    }
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.usersWhereUniqueInput;
    where?: Prisma.usersWhereInput;
    orderBy?: Prisma.usersOrderByWithRelationInput;
  }): Promise<users[]> {
    const { skip, take, cursor, where, orderBy } = params;
    try {
      return await this.prisma.users.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
    } catch (error) {
      return error;
    }
  }

  async createUser(data: Prisma.usersCreateInput): Promise<users> {
    try {
      return await this.prisma.users.create({
        data,
      });
    } catch (error) {
      return error;
    }
  }

  async updateUser(params: {
    where: Prisma.usersWhereUniqueInput;
    data: Prisma.usersUpdateInput;
  }): Promise<users> {
    const { where, data } = params;
    try {
      return await this.prisma.users.update({
        data,
        where,
      });
    } catch (error) {
      return error;
    }
  }

  async deleteUser(where: Prisma.usersWhereUniqueInput): Promise<users> {
    try {
      return await this.prisma.users.delete({
        where,
      });
    } catch (error) {
      return error;
    }
  }
}
