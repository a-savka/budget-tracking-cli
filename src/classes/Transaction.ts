import { ITransaction } from "../interfaces/ITransaction";
import { TransactionType } from "../interfaces/TransactionType";

export class Transaction implements ITransaction {

    private static nextId: number = 1;

    public id: number;
    public amount: number;
    public type: TransactionType;
    public date: string;
    public description: string;

    constructor(amount: number, type: TransactionType, date: string, description: string) {
        this.id = Transaction.nextId++;
        this.amount = amount;
        this.type = type;
        this.date = date;
        this.description = description;
    }

    public toString(): string {
        if (this.type === 'income') {
            return `+${this.amount} ${this.date} ${this.description}`
        } else {
            return `-${this.amount} ${this.date} ${this.description}`
        }
    }

}
