import { v4 as uuidv4 } from 'uuid';
import { IAccount } from "../interfaces/IAccount";
import { ISummary } from "../interfaces/ISummary";
import { ITransaction } from "../interfaces/ITransaction";
import { TransactionType } from "../interfaces/TransactionType";
import { Transaction } from "./Transaction";

export class Account implements IAccount, ISummary {

    public readonly id: string;
    public name: string;
    public transactions: Transaction[];

    constructor(name: string) {
        this.id = uuidv4();
        this.name = name;
        this.transactions = [];
    }

    public get income(): number {
        return this.getInEx('income');
    }

    public get expenses(): number {
        return this.getInEx('expense');
    }

    public get balance(): number {
        return this.transactions.reduce((acc, transaction) => {
            if (transaction.type === 'income') {
                return acc + transaction.amount;
            }
            return acc - transaction.amount;
        }, 0);
    }

    public addTransaction(transaction: ITransaction) {
        this.transactions.push(transaction);
    };

    public removeTransactionById(tracsactionId: string) {
        this.transactions = this.transactions.filter(transaction => {
            return transaction.id !== tracsactionId;
        });
    };

    public getTransactions() {
        return this.transactions;
    };

    public getSummary(): ISummary {
        return {
            income: this.income,
            expenses: this.expenses,
            balance: this.balance
        };
    }

    public getSummaryString(): string {
        return `Имя Аккаунта: ${this.name}\n` +
            `Баланс: ${this.balance}\n` +
            `Транзакций: ${this.transactions.length}`;
    }

    public toString(): string {
        if (this.transactions.length === 0) {
            return `Аккаунт ${this.name} пустой`;
        } else {
            return `Аккаунт ${this.name} содержит ${this.transactions.length} транзакций, баланс ${this.balance}`;
        }
    }

    private getInEx(type: TransactionType): number {
        return this.transactions.reduce((acc, transaction) => {
            if (transaction.type === type) {
                return acc + transaction.amount;
            }
            return acc;
        }, 0);
    }

}
