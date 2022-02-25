export const RequiredEnv = ['PORT', 'DB_NAME', 'DB_HOST', 'DB_PORT', 'DB_USERNAME', 'DB_PASSWORD']

interface Configuration {
  databaseConfig: {
    name: string
    host: string
    port: string
    username: string
    password: string
  }
}

export const configuration = (): Configuration => {
  return {
    databaseConfig: {
      name: process.env.DB_NAME as string,
      host: process.env.DB_HOST as string,
      port: process.env.DB_PORT as string,
      username: process.env.DB_USERNAME as string,
      password: process.env.DB_PASSWORD as string,
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
