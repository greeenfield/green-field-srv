import { configuration } from '#config/configuration'
import { S3Adapter } from '#shared/utils/fileUploader/s3.adapter'

export class FileUploaderFactory {
  create(): S3Adapter {
    const { region, aws_access_key_id, aws_secret_access_key, image_bucket } = configuration().awsS3Config

    return new S3Adapter(region, image_bucket, aws_access_key_id, aws_secret_access_key)
  }
}
