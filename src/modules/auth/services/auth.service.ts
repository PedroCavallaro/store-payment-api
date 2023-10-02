import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DbService } from 'src/database/db.service';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from 'src/modules/auth/models/auth.repository';

@Injectable()
export class AuthService implements AuthRepository {
  constructor(
    private readonly dbService: DbService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const { rows } = await this.dbService.query(
      `SELECT id, name, password FROM USERS WHERE email = '${email}'`,
    );
    const [user] = rows;
    if (!user) throw new UnauthorizedException();
    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new UnauthorizedException();
    const payload = { sub: user.id, name: user.name };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
  async createUser() {
    const promises: Array<any> = [];
    const saltRounds = await bcrypt.genSalt();
    for (let i = 0; i < 20; i++) {
      const hashedPass = await bcrypt.hash('1234', saltRounds);
      const sql = `INSERT INTO USERS(NAME, EMAIL, PASSWORD) VALUES ('fake${faker.person.firstName()}', '${faker.internet.email()}', '${hashedPass}');`;
      promises.push(this.dbService.query(sql));
    }

    await Promise.all(promises);
  }
}
