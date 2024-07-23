import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(() => Int)
  id: number;
  @Field(() => Float)
  price: number;
  @Field()
  name: string;
  @Field(() => Int)
  authorId: number;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}
