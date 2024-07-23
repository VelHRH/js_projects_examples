import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { CryptoService } from 'src/crypto/crypto.service';

@Module({
  providers: [UserResolver, UserService, PrismaService, CryptoService],
  exports: [UserService],
})
export class UserModule {}
