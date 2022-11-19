import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FortyTwoStrategy } from './fortyTwo.strategy';
import {JwtTwoFaStrategy} from './jwt-two-factor.strategy'
import { JwtStategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    PrismaModule,
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, FortyTwoStrategy, JwtStategy, JwtTwoFaStrategy],
})
export class AuthModule {}
