import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CryptoService } from 'src/crypto/crypto.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { LocalStrategy } from './stratagies/local.strategy';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './stratagies/jwt/jwt.strategy';
import { JwtRefreshStrategy } from './stratagies/jwt/jwt-refresh.strategy';

@Module({
  imports: [UserModule, PassportModule, JwtModule],
  providers: [
    AuthResolver,
    AuthService,
    UserService,
    PrismaService,
    CryptoService,
    TokenService,
    LocalStrategy,
    ConfigService,
    JwtStrategy,
    JwtRefreshStrategy,
  ],
})
export class AuthModule {}
