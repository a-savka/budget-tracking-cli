import { v4 as uuidv4 } from 'uuid';
import { CategoryLimits, ITransaction, NullableDescription, TransactionUpdate } from "../interfaces/ITransaction";
import { TransactionType } from "../interfaces/TransactionType";
import { formatDate } from 'utils';

const limits: CategoryLimits = {
    income: 10000,
    expense: 5000
};

export class Transaction implements ITransaction {

    public readonly id: string;
    public amount: number;
    public type: TransactionType;
    public date: string;
    public description: NullableDescription;

    constructor(amount: number, type: TransactionType, date: string, description: string) {
        this.id = uuidv4();
        this.amount = amount;
        this.type = type;
        this.date = date;
        this.description = description;
    }

    public toString(): string {
        if (this.type === 'income') {
            return `+${this.amount} -- ${formatDate(new Date(this.date))} -- ${this.description}`
        } else {
            return `-${this.amount} -- ${formatDate(new Date(this.date))} -- ${this.description}`
        }
    }

    public update(update: TransactionUpdate) {
        if (update.amount) {
            this.amount = update.amount;
        }
        if (update.type) {
            this.type = update.type;
        }
        if (update.date) {
            this.date = update.date;
        }
        if (update.description) {
            this.description = update.description;
        }
    }

}

export type TransactionConstructorParams = ConstructorParameters<typeof Transaction>;

export type TransactionInstance = InstanceType<typeof Transaction>;
