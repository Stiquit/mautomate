import { SetMetadata, applyDecorators } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '../constants/is-public-key';

export function Public() {
  return applyDecorators(SetMetadata(IS_PUBLIC_KEY, true));
}
