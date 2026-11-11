import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(email: string, passwordHash: string, name: string) {
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new ConflictException('Email already registered');

    const user = await this.prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        settings: {
          create: {
            theme: 'emerald',
            soundEnabled: true,
          },
        },
      },
    });

    return {
      user: { id: user.id, email: user.email, name: user.name },
      token: 'jwt-access-token-simulation',
    };
  }

  async login(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    return {
      user: { id: user.id, email: user.email, name: user.name },
      token: 'jwt-access-token-simulation',
    };
  }
}
