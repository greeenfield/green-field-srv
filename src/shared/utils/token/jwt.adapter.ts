import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'

export class JwtAdapter {
  constructor(private readonly secretKey: string) {}

  async generate(payload: JwtPayload, options: SignOptions): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, this.secretKey, options, (error, token) => {
        if (error) reject(error)
        resolve(token)
      })
    })
  }

  async verify<Decoded>(token: string): Promise<Decoded> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.secretKey, (error, decoded: Decoded) => {
        if (error) reject(error)
        resolve(decoded)
      })
    })
  }
}
