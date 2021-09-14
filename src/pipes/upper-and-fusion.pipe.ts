import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UpperAndFusionPipe implements PipeTransform {
  transform(
    value: { skills: string[] },
    metadata: ArgumentMetadata,
  ): string | { skills: string[] } {
    if (metadata.type == 'body') {
      return value.skills.map((e) => e.toUpperCase()).join('-');
    }
    return value;
  }
}
