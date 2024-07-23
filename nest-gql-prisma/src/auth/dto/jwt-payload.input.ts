import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JwtPayload {
  @Field(() => Int)
  sub: number;

  @Field()
  email: string;
}
