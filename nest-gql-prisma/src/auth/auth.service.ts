import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from './dto/login.input';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginResponse } from './dto/login-response';
import { TokenService } from './token.service';
import { CryptoService } from 'src/crypto/crypto.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
    private readonly cryptoService: CryptoService,
  ) {}

  async validateUser(loginInput: LoginInput): Promise<User | null> {
    const { email, password: pass } = loginInput;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return null;
    }
    const isValidPassword = await this.cryptoService.comparePasswords(
      pass,
      user.password,
    );
    if (isValidPassword) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<LoginResponse> {
    const { id, email } = user;
    const tokens = this.tokenService.createTokens(id, email);
    const expiresIn = this.jwtService.decode(tokens.accessToken).exp * 1000;
    await this.tokenService.updateRefreshToken(id, tokens.refreshToken);
    return {
      ...user,
      ...tokens,
      expiresIn,
    };
  }

  async logout(userId: number): Promise<boolean> {
    this.userService.update(userId, { refreshToken: undefined });
    return true;
  }

  async signup(signupInput: LoginInput): Promise<User> {
    return this.userService.create(signupInput);
  }
}
