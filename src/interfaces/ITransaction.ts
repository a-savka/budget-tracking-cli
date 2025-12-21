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

export type TransactionFieldType<TField> =
    TField extends keyof ITransaction
        ? ITransaction[TField]
        : never;

export type OptionalTransaction<TFields extends keyof ITransaction> =
    {
        [K in Exclude<keyof ITransaction, TFields>]: ITransaction[K];
    } &
    {
        [K in TFields]?: ITransaction[K];
    };

export type ReadonlyTransactionFields<TFields extends keyof ITransaction> =
    {
        readonly [K in TFields]: ITransaction[K];
    } &
    {
        [K in Exclude<keyof ITransaction, TFields>]: ITransaction[K];
    };

export type IsIncome<T> = T extends { type: 'income' } ? true : false;
