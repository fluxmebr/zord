import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  Logger,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from '../../database/prisma/prisma.service'
import { MfaService } from './mfa.service'
import * as bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

export interface JwtPayload {
  sub: string
  tenantId: string
  email: string
  role: string
  sessionId: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly mfa: MfaService,
    private readonly config: ConfigService,
  ) {}

  async validateUser(tenantId: string, email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { tenantId_email: { tenantId, email } },
    })

    if (!user || user.status !== 'ACTIVE') {
      throw new UnauthorizedException('Invalid credentials')
    }

    if (user.lockedUntil && user.lockedUntil > new Date()) {
      throw new ForbiddenException('Account temporarily locked')
    }

    const valid = await bcrypt.compare(password, user.passwordHash)

    if (!valid) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          loginAttempts: { increment: 1 },
          lockedUntil: user.loginAttempts >= 4 ? new Date(Date.now() + 15 * 60 * 1000) : undefined,
        },
      })
      throw new UnauthorizedException('Invalid credentials')
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { loginAttempts: 0, lockedUntil: null },
    })

    return user
  }

  async login(
    userId: string,
    tenantId: string,
    deviceId: string,
    ipAddress: string,
    userAgent: string,
  ): Promise<AuthTokens> {
    const refreshToken = uuidv4()
    const refreshExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    const session = await this.prisma.session.create({
      data: {
        userId,
        tenantId,
        deviceId,
        ipAddress,
        userAgent,
        refreshToken,
        expiresAt: refreshExpiry,
      },
    })

    const user = await this.prisma.user.findUniqueOrThrow({ where: { id: userId } })

    const payload: JwtPayload = {
      sub: userId,
      tenantId,
      email: user.email,
      role: user.role,
      sessionId: session.id,
    }

    const expiresIn = 15 * 60
    const accessToken = this.jwt.sign(payload, { expiresIn })

    await this.prisma.user.update({
      where: { id: userId },
      data: { lastLoginAt: new Date() },
    })

    this.logger.log(`User ${user.email} logged in from ${ipAddress}`)

    return { accessToken, refreshToken, expiresIn }
  }

  async refresh(refreshToken: string): Promise<AuthTokens> {
    const session = await this.prisma.session.findUnique({
      where: { refreshToken },
      include: { user: true },
    })

    if (!session || session.revokedAt || session.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired refresh token')
    }

    const newRefreshToken = uuidv4()
    await this.prisma.session.update({
      where: { id: session.id },
      data: { refreshToken: newRefreshToken, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
    })

    const payload: JwtPayload = {
      sub: session.userId,
      tenantId: session.tenantId,
      email: session.user.email,
      role: session.user.role,
      sessionId: session.id,
    }

    const expiresIn = 15 * 60
    const accessToken = this.jwt.sign(payload, { expiresIn })

    return { accessToken, refreshToken: newRefreshToken, expiresIn }
  }

  async logout(sessionId: string) {
    await this.prisma.session.update({
      where: { id: sessionId },
      data: { revokedAt: new Date() },
    })
  }

  async verifyMfa(userId: string, code: string): Promise<boolean> {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id: userId } })

    if (!user.mfaSecret) return false

    return this.mfa.verifyToken(user.mfaSecret, code)
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12)
  }
}
