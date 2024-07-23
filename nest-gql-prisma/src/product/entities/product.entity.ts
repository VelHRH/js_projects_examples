import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(() => Int)
  id: number;
  @Field()
  description: string;
  @Field(() => Float)
  price: number;
  @Field(() => Int, { defaultValue: 0 })
  quantity?: number;

  @Field()
  name: string;
  @Field(() => Int)
  authorId: number;
  @Field()
  image: string;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}
