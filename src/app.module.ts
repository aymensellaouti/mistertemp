import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirstModule } from './first/first.module';
import { SecondModule } from './second/second.module';
import { TodoModule } from './todo/todo.module';
import { FirstMiddleware } from './middleware/first.middleware';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { JobModule } from './job/job.module';
import { CvModule } from './cv/cv.module';
import { SkillModule } from './skill/skill.module';
import { UserModule } from './user/user.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    FirstModule,
    SecondModule,
    TodoModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'mistertemp',
      autoLoadEntities: true,
      synchronize: true,
      logging: 'all',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JobModule,
    CvModule,
    SkillModule,
    UserModule,
    MulterModule.register(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
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
