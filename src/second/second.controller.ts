import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { catchError, count, filter, Observable, retry } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';

@Controller('second')
export class SecondController {
  constructor(private httpService: HttpService) {}
  @Get()
  secondObservableTest() {
    // const interval = new Observable<number>((observer) => {
    //   let i = 5;
    //   setInterval(() => {
    //     if (!i) {
    //       observer.complete();
    //     } else {
    //       observer.next(i--);
    //     }
    //   }, 1000);
    // });
    // interval.subscribe((data) => {
    //   console.log(data);
    // });
    // interval.pipe(map((data) => data * 3)).subscribe(
    //   (valeur) => {
    //     console.log('je viens de recevoir la valeur', valeur);
    //   },
    //   (erreur) => {
    //     console.log('j ai une erreur', erreur);
    //   },
    //   () => {
    //     console.log('end');
    //   },
    // );
    // return interval.pipe(
    //   map((data) => data * 3),
    //   filter((data) => data % 2 === 0),
    //   catchError((erreur) => {
    //     throw new InternalServerErrorException('erreur');
    //   }),
    // );
    return this.httpService
      .get('https://jsonplaceholder.typicode.com/users1')
      .pipe(
        map((response) => response.data),
        map((data) => data.length),
        catchError((erreur) => {
          throw new InternalServerErrorException('erreur');
        }),
        retry(3),
      );
  }
}
