import { ITokenService, GeneratePayload, GenerateOptions } from '#shared/utils/token/token.interface'
import { JwtAdapter } from '#shared/utils/token/jwt.adapter'

export class TokenService implements ITokenService {
  constructor(private readonly jwtAdapter: JwtAdapter) {}

  async generate(payload: GeneratePayload, options: GenerateOptions): Promise<string> {
    return await this.jwtAdapter.generate(payload, options)
  }

  async verify<T>(token: string): Promise<T> {
    return await this.jwtAdapter.verify(token)
  }
}
