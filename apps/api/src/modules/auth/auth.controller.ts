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
} from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { MfaService } from './mfa.service'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator'

class LoginDto {
  @IsString() tenantId!: string
  @IsEmail() email!: string
  @IsString() @MinLength(8) password!: string
}

class MfaVerifyDto {
  @IsString() code!: string
}

class RefreshDto {
  @IsString() refreshToken!: string
}

@ApiTags('auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mfaService: MfaService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto, @Req() req: Request) {
    const user = await this.authService.validateUser(dto.tenantId, dto.email, dto.password)

    if (user.mfaEnabled) {
      return { mfaRequired: true, userId: user.id }
    }

    const ipAddress = req.ip ?? '0.0.0.0'
    const userAgent = req.headers['user-agent'] ?? ''
    const deviceId = req.headers['x-device-id'] as string ?? 'unknown'

    const tokens = await this.authService.login(
      user.id,
      user.tenantId,
      deviceId,
      ipAddress,
      userAgent,
    )

    return { ...tokens, mfaRequired: false }
  }

  @Post('mfa/verify')
  @HttpCode(HttpStatus.OK)
  async verifyMfa(
    @Body() dto: MfaVerifyDto,
    @Body('userId') userId: string,
    @Req() req: Request,
  ) {
    const valid = await this.authService.verifyMfa(userId, dto.code)
    if (!valid) throw new Error('Invalid MFA code')

    const user = await this.authService['prisma'].user.findUniqueOrThrow({ where: { id: userId } })
    const ipAddress = req.ip ?? '0.0.0.0'
    const userAgent = req.headers['user-agent'] ?? ''
    const deviceId = req.headers['x-device-id'] as string ?? 'unknown'

    const tokens = await this.authService.login(
      user.id,
      user.tenantId,
      deviceId,
      ipAddress,
      userAgent,
    )

    return tokens
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() dto: RefreshDto) {
    return this.authService.refresh(dto.refreshToken)
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@CurrentUser() user: { sessionId: string }) {
    await this.authService.logout(user.sessionId)
  }

  @Get('mfa/setup')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async setupMfa(@CurrentUser() user: { id: string; email: string }) {
    const secret = this.mfaService.generateSecret()
    const qrCode = await this.mfaService.generateQrCode(user.email, secret)
    return { secret, qrCode }
  }
}
