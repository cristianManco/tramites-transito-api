import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import dbConfig from './config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_TYPE: Joi.string()
          .valid('postgres', 'mssql', 'mysql')
          .default('postgres'),
        DATABASE_HOST: Joi.string().default('localhost'),
        DATABASE_PORT: Joi.number().default(5432),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_DB: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: dbConfig().database.type as 'postgres',
      host: dbConfig().database.host,
      port: dbConfig().database.port,
      username: dbConfig().database.username,
      password: dbConfig().database.password,
      database: dbConfig().database.db,
      autoLoadEntities: true,
      synchronize: false, //! ¡Importante!: Nunca sincronisar con bases de datos existentes en ambientes productivos
      logging: process.env.NODE_ENV !== 'production' ? true : ['error', 'warn'],
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
