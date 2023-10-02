import { Global, Module, Provider } from '@nestjs/common';
import { DbService } from './db.service';
import { Pool } from 'pg';

const dbProvider: Provider = {
  provide: DbService,
  useValue: new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '1234',
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
