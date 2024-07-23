import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePasswordInput {
  @Field({ nullable: true })
  oldPassword?: string;

  @Field({ nullable: true })
  newPassword?: string;
}
