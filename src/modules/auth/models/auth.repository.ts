export abstract class AuthRepository {
  abstract signIn(email: string, password: string): Promise<{ token: string }>;
  abstract createUser(): void;
}
