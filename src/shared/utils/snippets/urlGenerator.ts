import { URL } from 'url'

export class Url {
  private readonly url: URL

  constructor(baseUrl: string) {
    this.url = new URL(baseUrl)
  }

  append(parameters: { [key: string]: string }): this {
    Object.entries(parameters).forEach(([key, val]) => {
      this.url.searchParams.append(key, val)
    })

    return this
  }

  generate(): string {
    if (!this.url) throw new Error('url not found.')

    return this.url.href
  }
}
