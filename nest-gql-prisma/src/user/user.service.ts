import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UpdatePasswordInput } from './dto/update-password.input';
import { CryptoService } from 'src/crypto/crypto.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cryptoService: CryptoService,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const existing = await this.findByEmail(createUserInput.email);
    if (existing) {
      throw new BadRequestException(
        'Duplicate email. User with this email already exists',
      );
    }
    const enteredPassword = createUserInput.password;
    const passwordHash =
      enteredPassword &&
      (await this.cryptoService.hashPassword(enteredPassword));
    const data = {
      ...createUserInput,
      password: passwordHash,
    };
    return await this.prismaService.user.create({
      data,
      include: { products: true },
    });
  }

  findAll() {
    return this.prismaService.user.findMany({ include: { products: true } });
  }

  findOne(id: number) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
      include: { products: true },
    });
  }

  async update(userId: number, updateUserInput: UpdateUserInput) {
    const { id, ...user } = await this.findOne(userId);
    if (!user) {
      throw new NotFoundException();
    }
    const { password, ...rest } = updateUserInput;
    if (!password) {
      return this.prismaService.user.update({
        where: { id },
        data: { ...user, ...rest },
      });
    }
    const passwordHash = await this.updatePassword(password, user.password);
    return this.prismaService.user.update({
      where: { id },
      data: { ...user, ...rest, password: passwordHash },
    });
  }

  private async updatePassword(
    password: UpdatePasswordInput,
    currPassword: string,
  ): Promise<string> {
    const { newPassword, oldPassword } = password;

    if (!oldPassword) {
      return this.cryptoService.hashPassword(newPassword!);
    }

    if (
      !(await this.cryptoService.comparePasswords(oldPassword, currPassword))
    ) {
      throw new BadRequestException('Invalid password');
    }
    return this.cryptoService.hashPassword(newPassword!);
  }
}
