import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { UploadImageCommand } from '#modules/note/application/commands/implement/upload-image.command'

import { FileUploaderFactory } from '#shared/utils/fileUploader/fileUploader.factory'

@CommandHandler(UploadImageCommand)
export class UploadImageHandler implements ICommandHandler<UploadImageCommand, { location: string }> {
  constructor(private readonly fileUploaderFactory: FileUploaderFactory) {}

  async execute(command: UploadImageCommand): Promise<{ location: string }> {
    const uploadedFile = await this.fileUploaderFactory.create().upload(command.file)

    return { location: uploadedFile.body.location }
  }
}
