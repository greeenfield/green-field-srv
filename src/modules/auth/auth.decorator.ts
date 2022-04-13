import { applyDecorators, UseGuards } from '@nestjs/common'
import { AuthGuard } from '#modules/auth/auth.guard'

export function Auth() {
  return applyDecorators(UseGuards(AuthGuard))
}
