import { IAccount, IAccountManager, ISummary, ITransaction, TransactionType } from "./types";

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


export class Account implements IAccount, ISummary {

    private static nextId: number = 1;

    public id: number;
    public name: string;
    public transactions: Transaction[];

    constructor(name: string) {
        this.id = Account.nextId++;
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

    public removeTransactionById(tracsactionId: number) {
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


export class AccountManager implements IAccountManager, ISummary {

    public accounts: Account[] = [];

    public get income(): number {
        return this.accounts.reduce((acc, account) => {
            return acc + account.income;
        }, 0);
    }

    public get expenses(): number {
        return this.accounts.reduce((acc, account) => {
            return acc + account.expenses;
        }, 0);
    }

    public get balance(): number {
        return this.accounts.reduce((acc, account) => {
            return acc + account.balance;
        }, 0);
    }

    public addAccount(account: IAccount) {
        this.accounts.push(account as Account);
    }

    public removeAccountById(accountId: number) {
        this.accounts = this.accounts.filter(account => {
            return account.id !== accountId;
        });
    }

    public getAccountById(accountId: number): Account | undefined {
        return this.accounts.find(account => {
            return account.id === accountId;
        });
    }

    public getAllAccounts(): Account[] {
        return this.accounts;
    }

    public getAccounts(): Account[] {
        return this.accounts;
    }

    public getSummary(): ISummary {
        return {
            income: this.income,
            expenses: this.expenses,
            balance: this.balance
        };
    }

    public getSummaryString(): string {
        if (this.accounts.length === 0) {
            return 'Нет аккаунтов';
        } else {
            return `Всего аккаунтов: ${this.accounts.length}\n` +
                `Всего доходов: ${this.income}\n` +
                `Всего расходов: ${this.expenses}\n` +
                `Общий баланс: ${this.balance}\n`;
        }
    }

    public toString(): string {
        return `Всего аккаунтов: ${this.accounts.length}, общий баланс: ${this.balance}`;
    }


}