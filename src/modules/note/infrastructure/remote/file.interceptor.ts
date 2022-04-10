import { FileInterceptor } from '@nestjs/platform-express'

import { FileUploaderFactory } from '#shared/utils/fileUploader/fileUploader.factory'

export const ImageFileInterceptor = () => {
  const multerOptions = new FileUploaderFactory().create().createMulterOptions()
  return FileInterceptor('file', multerOptions)
}
