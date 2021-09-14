import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { log } from 'util';

@Injectable()
export class FirstInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dateIn = Date.now();
    console.log('in interceptor', dateIn);
    return next.handle().pipe(
      tap(() => {
        const dateOut = Date.now();
        console.log('après la fin de la réponse', dateOut);
        console.log(`la durée de la requete est : ${dateOut - dateIn} ms`);
      }),
    );
  }
}
