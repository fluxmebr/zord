import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from '../../../database/prisma/prisma.service'
import type { JwtPayload } from '../auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET'),
    })
  }

  async validate(payload: JwtPayload) {
    const session = await this.prisma.session.findUnique({
      where: { id: payload.sessionId },
    })

    if (!session || session.revokedAt || session.expiresAt < new Date()) {
      throw new UnauthorizedException('Session invalid or expired')
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    })

    if (!user || user.status !== 'ACTIVE') {
      throw new UnauthorizedException('User inactive')
    }

    return {
      id: user.id,
      tenantId: user.tenantId,
      email: user.email,
      role: user.role,
      sessionId: payload.sessionId,
    }
  }
}
