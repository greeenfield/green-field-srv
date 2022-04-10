export const RequiredEnv = [
  'PORT',
  'DB_NAME',
  'DB_HOST',
  'DB_PORT',
  'DB_USERNAME',
  'DB_PASSWORD',
  'REDIS_URL',
  'SESSION_SECRET',
  'JWT_SECRET_KEY',
  'BASE_URL',
  'AWS_S3_REGION',
  'AWS_S3_IMAGE_BUCKET',
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
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
  jwtConfig: {
    jwt_secret_key: string
  }
  baseUrl: string
  awsS3Config: {
    region: string
    image_bucket: string
    aws_access_key_id: string
    aws_secret_access_key: string
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
      user: process.env.NODE_MAILER_USER as string,
      pass: process.env.NODE_MAILER_PASS as string,
      service: process.env.NODE_MAILER_SERVICE as string,
      from: process.env.NODE_MAILER_FROM as string,
    },
    jwtConfig: {
      jwt_secret_key: process.env.JWT_SECRET_KEY as string,
    },
    baseUrl: process.env.BASE_URL as string,
    awsS3Config: {
      region: process.env.AWS_S3_REGION as string,
      image_bucket: process.env.AWS_S3_IMAGE_BUCKET as string,
      aws_access_key_id: process.env.AWS_ACCESS_KEY_ID as string,
      aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY as string,
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
