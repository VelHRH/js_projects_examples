import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product])
  products(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Query(() => Product)
  product(
    @Args('id', { type: () => Int }) productId: number,
  ): Promise<Product> {
    return this.productService.findOne(productId);
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput')
    createProductInput: CreateProductInput,
  ): Promise<Product> {
    return this.productService.create(createProductInput);
  }
}
