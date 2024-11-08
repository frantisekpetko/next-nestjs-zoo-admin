/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

dotenv.config();

const config: TypeOrmModuleOptions = {
  type: "sqlite",
  database: process.cwd() + "/database/database.db",
  entities: ['dist/src/server/**/*.entity.{ts,js}'],
  migrations: ['dist/server/migration/*.{ts,js}'],
  synchronize: true,
  logging: true,
  extra: {
    ssl:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
  },
};

//const source: DataSource = new DataSource();

export default config;
//export default source;
