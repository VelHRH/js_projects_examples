import { IntersectionType, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { RefreshTokenResponse } from './refresh-token-response';

@ObjectType()
export class LoginResponse extends IntersectionType(
  RefreshTokenResponse,
  User,
) {}
