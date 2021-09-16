import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';

export function Serialize(dto: any, groups: string[] = []) {
  return UseInterceptors(new SerializeInterceptor(dto, groups));
}
