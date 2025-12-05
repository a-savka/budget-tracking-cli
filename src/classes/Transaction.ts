import { v4 as uuidv4 } from 'uuid';
import { ITransaction } from "../interfaces/ITransaction";
import { TransactionType } from "../interfaces/TransactionType";
import { formatDate } from 'utils';

export class Transaction implements ITransaction {

    public readonly id: string;
    public amount: number;
    public type: TransactionType;
    public date: string;
    public description: string;

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

}
