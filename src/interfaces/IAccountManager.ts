import { IAccount } from "./IAccount";
import { ISummary } from "./ISummary";

export interface IAccountManager {
    addAccount: (account: IAccount) => void;
    removeAccountById: (accountId: string) => void;
    getAccounts: () => IAccount[];
    getAccountById: (accountId: string) => IAccount | undefined;
    getSummary: (accountId: string) => ISummary;
}
