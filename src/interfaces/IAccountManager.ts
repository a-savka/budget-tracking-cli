import { IAccount } from "./IAccount";
import { ISummary } from "./ISummary";

export interface IAccountManager {
    addAccount: (account: IAccount) => void;
    removeAccountById: (accountId: number) => void;
    getAccounts: () => IAccount[];
    getAccountById: (accountId: number) => IAccount | undefined;
    getSummary: (accountId: number) => ISummary;
}
