import { Account } from './entities/account.entity';

export interface ResultOfVerification {
  account: Account;
  token: string;
  expiresAt: string;
}
