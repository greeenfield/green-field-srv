export type UploadParameter = {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  buffer: Buffer
  size: number
}

export type UploadedFile = {
  ETag: string
  Location: string
  key: string
  Key: string
  Bucket: string
}

export interface IFileUploader {
  upload: (params: UploadParameter) => Promise<UploadedFile>
}
