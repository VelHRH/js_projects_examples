import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RefreshTokenResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field(() => Float)
  expiresIn: number;
}
