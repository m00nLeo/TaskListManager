// Create a database configuration file to set up TypeORM with MySQL.

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { Task } from 'src/tasks/entities/task.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD_KEY,
  database: process.env.DB_DATABASE,
  entities: [Task],
  // synchronize: true, // Use only in development
  // logging: true, // Enable SQL query logging
};
