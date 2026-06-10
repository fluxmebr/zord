import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  Get,
  UseGuards,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { Throttle, SkipThrottle } from '@nestjs/throttler'
import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { MfaService } from './mfa.service'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { IsEmail, IsString, MinLength, Matches } from 'class-validator'

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/',
}

class LoginDto {
  @IsString() tenantId!: string
  @IsEmail() email!: string
  // Mínimo 8 chars, ao menos 1 maiúscula, 1 número, 1 especial
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, {
    message: 'Password must have uppercase, number and special character',
  })
  password!: string
}

class MfaVerifyDto {
  @IsString() userId!: string
  @IsString() @Matches(/^\d{6}$/, { message: 'MFA code must be 6 digits' }) code!: string
}

@ApiTags('auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mfaService: MfaService,
  ) {}

  // Rate limit rigoroso: 5 tentativas por minuto por IP
  @Post('login')
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.validateUser(dto.tenantId, dto.email, dto.password)

    if (user.mfaEnabled) {
      return { mfaRequired: true, userId: user.id }
    }

    const tokens = await this.authService.login(
      user.id,
      user.tenantId,
      req.headers['x-device-id'] as string ?? 'unknown',
      req.ip ?? '0.0.0.0',
      req.headers['user-agent'] ?? '',
    )

    // Tokens em httpOnly cookies — nunca expostos ao JavaScript
    res.cookie('zord_access_token', tokens.accessToken, {
      ...COOKIE_OPTS,
      maxAge: 15 * 60 * 1000, // 15 min
    })
    res.cookie('zord_refresh_token', tokens.refreshToken, {
      ...COOKIE_OPTS,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
      path: '/api/v1/auth/refresh',
    })

    return { mfaRequired: false, expiresIn: tokens.expiresIn }
  }

  // Rate limit: 3 tentativas por minuto (MFA é mais sensível)
  @Post('mfa/verify')
  @Throttle({ default: { limit: 3, ttl: 60_000 } })
  @HttpCode(HttpStatus.OK)
  async verifyMfa(@Body() dto: MfaVerifyDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const valid = await this.authService.verifyMfa(dto.userId, dto.code)
    if (!valid) throw new UnauthorizedException('Invalid MFA code')

    const user = await this.authService['prisma'].user.findUniqueOrThrow({ where: { id: dto.userId } })
    const tokens = await this.authService.login(
      user.id,
      user.tenantId,
      req.headers['x-device-id'] as string ?? 'unknown',
      req.ip ?? '0.0.0.0',
      req.headers['user-agent'] ?? '',
    )

    res.cookie('zord_access_token', tokens.accessToken, {
      ...COOKIE_OPTS,
      maxAge: 15 * 60 * 1000,
    })
    res.cookie('zord_refresh_token', tokens.refreshToken, {
      ...COOKIE_OPTS,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/api/v1/auth/refresh',
    })

    return { expiresIn: tokens.expiresIn }
  }

  // Refresh via cookie httpOnly (não aceita body)
  @Post('refresh')
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies?.zord_refresh_token
    if (!refreshToken) throw new UnauthorizedException('No refresh token')

    const tokens = await this.authService.refresh(refreshToken)

    res.cookie('zord_access_token', tokens.accessToken, {
      ...COOKIE_OPTS,
      maxAge: 15 * 60 * 1000,
    })
    res.cookie('zord_refresh_token', tokens.refreshToken, {
      ...COOKIE_OPTS,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/api/v1/auth/refresh',
    })

    return { expiresIn: tokens.expiresIn }
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @SkipThrottle()
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@CurrentUser() user: { sessionId: string }, @Res({ passthrough: true }) res: Response) {
    await this.authService.logout(user.sessionId)
    res.clearCookie('zord_access_token', { ...COOKIE_OPTS })
    res.clearCookie('zord_refresh_token', { ...COOKIE_OPTS, path: '/api/v1/auth/refresh' })
  }

  @Get('mfa/setup')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @SkipThrottle()
  async setupMfa(@CurrentUser() user: { id: string; email: string }) {
    const secret = this.mfaService.generateSecret()
    const qrCode = await this.mfaService.generateQrCode(user.email, secret)
    return { secret, qrCode }
  }
}
