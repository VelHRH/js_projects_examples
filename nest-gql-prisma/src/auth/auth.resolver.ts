import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { UseGuards } from '@nestjs/common';
import { LoginInput } from './dto/login.input';
import { LoginResponse } from './dto/login-response';
import { RefreshTokenResponse } from './dto/refresh-token-response';
import { User } from 'src/user/entities/user.entity';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt/jwt-auth.guard';
import { JwtRefreshAuthGuard } from './guards/jwt/jwt-refresh-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @Mutation(() => LoginResponse)
  @UseGuards(LocalAuthGuard)
  login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() context,
  ): Promise<LoginResponse> {
    return this.authService.login(context.user);
  }

  @Mutation(() => RefreshTokenResponse)
  @UseGuards(JwtRefreshAuthGuard)
  refresh(@Context() context): Promise<RefreshTokenResponse> {
    const { sub, refreshToken } = context.req.user;
    return this.tokenService.refresh(sub, refreshToken);
  }

  @Mutation(() => User)
  signup(@Args('signupInput') signupInput: LoginInput): Promise<User> {
    return this.authService.signup(signupInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  logout(@Context() context): Promise<boolean> {
    return this.authService.logout(context.req.user.sub);
  }
}
