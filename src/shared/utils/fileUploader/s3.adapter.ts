import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express'
import aws from 'aws-sdk'
import multerS3 from 'multer-s3'

export class S3Adapter implements MulterOptionsFactory {
  private s3
  private readonly bucket: string

  constructor(region: string, bucket: string, accessKeyId: string, secretAccessKey: string) {
    this.s3 = new aws.S3()
    this.bucket = bucket
    aws.config.update({
      region,
      credentials: { accessKeyId, secretAccessKey },
    })
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: multerS3({
        s3: this.s3,
        acl: 'public-read',
        bucket: this.bucket,
        key: function (req, file, cb) {
          cb(null, Date.now().toString())
        },
      }),
    }
  }

  async upload(file) {
    return await this.s3.upload({
      Body: file,
    })
  }
}
