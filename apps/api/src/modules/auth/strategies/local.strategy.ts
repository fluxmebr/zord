import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email', passReqToCallback: true })
  }

  async validate(req: Express.Request & { body: { tenantId?: string } }, email: string, password: string) {
    const tenantId = req.body.tenantId ?? 'default'
    return this.authService.validateUser(tenantId, email, password)
  }
}
