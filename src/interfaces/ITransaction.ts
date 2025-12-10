import { TransactionType } from "./TransactionType";

export interface ITransaction {
    id: string;
    amount: number;
    type: TransactionType;
    date: string;
    description: NullableDescription;
}

export type TransactionUpdate = Partial<ITransaction>;

export type CompleteTransaction = Required<ITransaction>;

export type TransactionWithoutDescription = Omit<ITransaction, 'description'>;

export type TransactionPreview = Pick<ITransaction, 'id' | 'amount' | 'type' | 'date'>;

export type CategoryLimits = Record<TransactionType, number>;

export type NullableDescription = string | null;
