import aws from 'aws-sdk'

import { IFileUploader, UploadParameter, UploadedFile } from '#shared/utils/fileUploader/fileUploader.interface'
export class S3Adapter implements IFileUploader {
  private s3
  private bucket: string

  constructor(region: string, bucket: string, accessKeyId: string, secretAccessKey: string) {
    this.s3 = new aws.S3()
    this.bucket = bucket
    aws.config.update({
      region,
      credentials: { accessKeyId, secretAccessKey },
    })
  }

  async upload(file: UploadParameter): Promise<UploadedFile> {
    return await this.s3
      .upload({
        Body: file.buffer,
        Bucket: this.bucket,
        Key: `image/${Date.now().toString() + file.originalname}`,
        ACL: 'public-read',
        ContentType: file.mimetype,
      })
      .promise()
  }
}
