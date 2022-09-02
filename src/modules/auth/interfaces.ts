import { Request } from 'express';
import { Account } from '../account/entities/account.entity';

export interface RequestWithUser extends Request {
  user: Account;
}
