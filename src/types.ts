
export type TransactionType = 'income' | 'expense';

export interface ITransaction {
    id: number;
    amount: number;
    type: TransactionType;
    date: string;
    description: string;
}

export interface IAccount {
    id: number;
    name: string;
    addTransaction: (transaction: ITransaction) => void;
    removeTransactionById: (tracsactionId: number) => void;
    getTransactions: () => ITransaction[];
}

export interface ISummary {
    income: number;
    expenses: number;
    balance: number;
}

export interface IAccountManager {
    addAccount: (account: IAccount) => void;
    removeAccountById: (accountId: number) => void;
    getAccounts: () => IAccount[];
    getAccountById: (accountId: number) => IAccount | undefined;
    getSummary: (accountId: number) => ISummary;
}
