import { ITransaction } from "./ITransaction";

export interface IAccount {
    id: string;
    name: string;
    addTransaction: (transaction: ITransaction) => void;
    removeTransactionById: (tracsactionId: string) => void;
    getTransactions: () => ITransaction[];
}
