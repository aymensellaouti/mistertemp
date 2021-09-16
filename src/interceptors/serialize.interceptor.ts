import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { response } from 'express';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(public dto: any, public groups: string[]) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //La requête
    return next.handle().pipe(
      // La réponse
      map((response) =>
        plainToClass(this.dto, response, {
          groups: this.groups,
          excludeExtraneousValues: true,
        }),
      ),
    );
  }
}
