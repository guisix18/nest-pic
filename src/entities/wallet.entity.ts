import { User } from './user.entity';

const allWallets: Wallet[] = [];

class Wallet {
  id?: string;
  balance: number;
  user?: User;
  userId?: string;

  private constructor({ balance }: Wallet) {
    return Object.assign(this, { balance });
  }

  static create({ balance }: Wallet) {
    const wallet = new Wallet({ balance });
    allWallets.push(wallet);
    return wallet;
  }
}

export { Wallet };
