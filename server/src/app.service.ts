import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Response, Request } from 'express';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
  }


}
