import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenDuration } from 'src/constants/auth';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './dto/jwt-payload.input';
import { RefreshTokenResponse } from './dto/refresh-token-response';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async refresh(
    userId: number,
    refreshtoken: string,
  ): Promise<RefreshTokenResponse> {
    const user = await this.userService.findOne(userId);
    if (!user || !user.refreshToken || refreshtoken !== user.refreshToken) {
      throw new ForbiddenException();
    }

    const tokens = this.createTokens(userId, user.email);
    const expiresIn = this.jwtService.decode(tokens.accessToken).exp * 1000;
    await this.updateRefreshToken(userId, tokens.refreshToken);
    return { ...tokens, expiresIn };
  }

  async updateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    this.userService.update(userId, { refreshToken });
  }

  createTokens(
    userId: number,
    email: string,
  ): Omit<RefreshTokenResponse, 'expiresIn'> {
    const payload: JwtPayload = { sub: userId, email };
    const accessToken = this.createToken(
      payload,
      TokenDuration.ACCESS_TOKEN,
      this.configService.get<string>('SECRET_KEY')!,
    );

    const refreshToken = this.createToken(
      payload,
      TokenDuration.REFRESH_TOKEN,
      this.configService.get<string>('REFRESH_KEY')!,
    );

    return { accessToken, refreshToken };
  }

  private createToken(
    payload: JwtPayload,
    expiresin: string | number,
    secret: string,
  ): string {
    return this.jwtService.sign(payload, {
      expiresIn: expiresin,
      secret,
    });
  }
}
