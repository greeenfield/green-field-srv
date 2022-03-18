export const RequiredEnv = [
  'PORT',
  'DB_NAME',
  'DB_HOST',
  'DB_PORT',
  'DB_USERNAME',
  'DB_PASSWORD',
  'REDIS_URL',
  'SESSION_SECRET',
]

interface Configuration {
  postgresConfig: {
    name: string
    host: string
    port: string
    username: string
    password: string
  }
  redisConfig: {
    url: string
  }
  sessionConfig: {
    session_secret: string
  }
  nodeMailerConfig: {
    user: string
    pass: string
    service: string
    from: string
  }
}

export const configuration = (): Configuration => {
  return {
    postgresConfig: {
      name: process.env.DB_NAME as string,
      host: process.env.DB_HOST as string,
      port: process.env.DB_PORT as string,
      username: process.env.DB_USERNAME as string,
      password: process.env.DB_PASSWORD as string,
    },
    redisConfig: {
      url: process.env.REDIS_URL as string,
    },
    sessionConfig: {
      session_secret: process.env.SESSION_SECRET as string,
    },
    nodeMailerConfig: {
      user: process.env.NODE_MAILER_USER,
      pass: process.env.NODE_MAILER_PASS,
      service: process.env.NODE_MAILER_SERVICE,
      from: process.env.NODE_MAILER_FROM,
    },
  }
}

export const validateEnvironmentVars = (): void => {
  if (process.env.NODE_ENV === undefined) {
    process.env.NODE_ENV = 'development'
  }

  RequiredEnv.forEach((variable) => {
    if (!process.env[variable]) throw Error(`Missing required env variable ${variable}`)
  })
}
