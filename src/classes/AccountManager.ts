import { IAccount } from "../interfaces/IAccount";
import { IAccountManager } from "../interfaces/IAccountManager";
import { ISummary } from "../interfaces/ISummary";
import { Account } from "./Account";

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

    public removeAccountById(accountId: string) {
        this.accounts = this.accounts.filter(account => {
            return account.id !== accountId;
        });
    }

    public getAccountById(accountId: string): Account | undefined {
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
