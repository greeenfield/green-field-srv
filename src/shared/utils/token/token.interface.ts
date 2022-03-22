export type GeneratePayload = {
  [key: string]: string | number
  userId?: string | undefined
  tokenId?: string | undefined
}

type ExpiresIn = '1h' | '1d'

export type GenerateOptions = {
  expiresIn: ExpiresIn
  subject?: string
  issuer?: string
}

export interface ITokenService {
  generate: (payload: GeneratePayload, options: GenerateOptions) => Promise<string>
  verify: <T>(token: string) => Promise<T>
}
