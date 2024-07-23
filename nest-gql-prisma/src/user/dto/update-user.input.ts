import { Field, InputType } from '@nestjs/graphql';
import { UpdatePasswordInput } from './update-password.input';

@InputType()
export class UpdateUserInput {
  @Field(() => UpdatePasswordInput, { nullable: true })
  password?: UpdatePasswordInput;

  @Field({ nullable: true })
  refreshToken?: string;
}
