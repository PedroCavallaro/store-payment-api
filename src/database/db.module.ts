import { Global, Module, Provider } from '@nestjs/common';
import { DbService } from './db.service';
import { Pool } from 'pg';
import {
  DB_USER,
  DB_HOST,
  DB_DATABASE,
  DB_PASSWORD,
} from 'constants/constants';

const dbProvider: Provider = {
  provide: DbService,
  useValue: new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_DATABASE,
    password: DB_PASSWORD,
    port: 5432,
    max: 20,
  }),
};
@Global()
@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
