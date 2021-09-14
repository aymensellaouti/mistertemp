import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirstModule } from './first/first.module';
import { SecondModule } from './second/second.module';
import { TodoModule } from './todo/todo.module';
import { FirstMiddleware } from './middleware/first.middleware';

@Module({
  imports: [FirstModule, SecondModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(FirstMiddleware)
      .forRoutes({ path: 'todo', method: RequestMethod.GET });
  }
}
