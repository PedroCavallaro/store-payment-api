import { Pool } from 'pg';

export class DbService extends Pool {
  constructor() {
    super();
  }
}
