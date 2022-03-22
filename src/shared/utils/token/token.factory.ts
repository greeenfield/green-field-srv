import { configuration } from '#config/configuration'
import { JwtAdapter } from './jwt.adapter'
import { ITokenService } from './token.interface'
import { TokenService } from './token.service'

export class TokenFactory {
  create(): ITokenService {
    const { jwt_secret_key } = configuration().jwtConfig

    return new TokenService(new JwtAdapter(jwt_secret_key))
  }
}
