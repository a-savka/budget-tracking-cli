import { ITransaction } from "./ITransaction";

export interface IAccount {
    id: string;
    name: string;
    addTransaction: (transaction: ITransaction) => void;
    removeTransactionById: (tracsactionId: string) => void;
    getTransactions: () => ITransaction[];
}

export type AccountUpdate = Partial<IAccount>;

export type AccountInfo = Pick<IAccount, 'id' | 'name'>;
