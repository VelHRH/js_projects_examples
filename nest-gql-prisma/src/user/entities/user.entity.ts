import { ObjectType, Field, Int, HideField } from '@nestjs/graphql';
import { Product } from 'src/product/entities/product.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @HideField()
  password: string;

  @Field({ nullable: true })
  refreshToken?: string;

  @Field(() => [Product], { nullable: true })
  products: Product[];
}
