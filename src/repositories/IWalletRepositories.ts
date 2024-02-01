import { Wallet } from '../../src/entities/wallet.entity';

interface IWalletRepository {
  create(Wallet: Wallet): Promise<Wallet>;
}

export { IWalletRepository };
