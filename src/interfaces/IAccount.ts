import { ITransaction } from "./ITransaction";

export interface IAccount {
    id: number;
    name: string;
    addTransaction: (transaction: ITransaction) => void;
    removeTransactionById: (tracsactionId: number) => void;
    getTransactions: () => ITransaction[];
}
