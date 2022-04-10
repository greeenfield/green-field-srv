import { IsString } from 'class-validator'

export class UploadImageResponseDTO {
  @IsString()
  location: string
}
