import { Injectable } from '@nestjs/common'
import { authenticator } from 'otplib'
import * as QRCode from 'qrcode'

@Injectable()
export class MfaService {
  generateSecret(): string {
    return authenticator.generateSecret()
  }

  verifyToken(secret: string, token: string): boolean {
    return authenticator.verify({ token, secret })
  }

  async generateQrCode(email: string, secret: string, issuer = 'ZORD Intelligence'): Promise<string> {
    const otpauthUrl = authenticator.keyuri(email, issuer, secret)
    return QRCode.toDataURL(otpauthUrl)
  }
}
