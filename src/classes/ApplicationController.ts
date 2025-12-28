import inquirer from 'inquirer';
import { AccountManager } from './AccountManager';
import { Account } from './Account';
import { Transaction } from './Transaction';

export class ApplicationController {
    private accountManager = new AccountManager();

    public async run() {
        console.clear();
        while (true) {
            const { action } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'action',
                    message: 'Главное меню',
                    choices: [
                        { name: 'Выбрать счет', value: 'selectAccount' },
                        { name: 'Добавить счет', value: 'addAccount' },
                        { name: 'Выход', value: 'exit' },
                    ],
                },
            ]);

            switch (action) {
                case 'selectAccount':
                    await this.selectAccount();
                    break;
                case 'addAccount':
                    await this.addAccount();
                    break;
                case 'exit':
                    console.log('До свидания!');
                    return;
            }
        }
    }

    private async selectAccount() {
        const accounts = this.accountManager.getAccounts();
        if (accounts.length === 0) {
            console.log('Счетов пока нет.');
            await this.pressEnterToContinue();
            return;
        }

        const { accountId } = await inquirer.prompt([
            {
                type: 'list',
                name: 'accountId',
                message: 'Выберите счет',
                choices: [
                    ...accounts.map(account => ({
                        name: account.name,
                        value: account.id,
                    })),
                    new inquirer.Separator(),
                    { name: 'Назад', value: 'back' },
                ],
            },
        ]);

        if (accountId === 'back') {
            console.clear();
            return;
        }

        const selectedAccount = this.accountManager.getAccountById(accountId);
        if (selectedAccount) {
            await this.accountMenu(selectedAccount);
        }
    }

    private async accountMenu(account: Account) {
        console.clear();
        while (true) {
            console.log(account.getSummaryString());
            const { action } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'action',
                    message: `Меню счета "${account.name}"`,
                    choices: [
                        { name: 'Просмотр транзакций', value: 'viewTransactions' },
                        { name: 'Добавить транзакцию', value: 'addTransaction' },
                        { name: 'Удалить транзакцию', value: 'deleteTransaction' },
                        { name: 'Экспорт в CSV', value: 'exportToCsv' },
                        { name: 'Удалить счет', value: 'deleteAccount' },
                        new inquirer.Separator(),
                        { name: 'Назад', value: 'back' },
                    ],
                },
            ]);

            switch (action) {
                case 'viewTransactions':
                    await this.viewTransactions(account);
                    break;
                case 'addTransaction':
                    await this.addTransaction(account);
                    break;
                case 'deleteTransaction':
                    await this.deleteTransaction(account);
                    break;
                case 'exportToCsv':
                    await this.exportToCsv(account);
                    break;
                case 'deleteAccount':
                    const deleted = await this.deleteAccount(account.id);
                    if (deleted) return;
                    break;
                case 'back':
                    console.clear();
                    return;
            }
        }
    }

    private async addAccount() {
        const { accountName } = await inquirer.prompt([
            {
                type: 'input',
                name: 'accountName',
                message: 'Введите имя нового счета:',
                validate: (input: string) => (input.trim() === '' ? 'Имя счета не может быть пустым.' : true),
            },
        ]);

        const newAccount = new Account(accountName);
        this.accountManager.addAccount(newAccount);
        console.log(`Счет "${accountName}" успешно создан.`);
        await this.pressEnterToContinue();
    }

    private async viewTransactions(account: Account) {
        console.clear();
        const transactions = account.getTransactions();
        if (transactions.length === 0) {
            console.log('Транзакций пока нет.');
        } else {
            transactions.forEach(t => console.log(t.toString()));
        }
        await this.pressEnterToContinue();
    }


    private async addTransaction(account: Account) {
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'type',
                message: 'Выберите тип транзакции:',
                choices: ['income', 'expense'],
            },
            {
                type: 'input',
                name: 'amount',
                message: 'Введите сумму:',
                validate: (input: string) => {
                    const value = Number(input);
    
                    if (!Number.isFinite(value)) {
                        return 'Сумма должна быть числом.';
                    }
    
                    if (value <= 0) {
                        return 'Сумма должна быть положительным числом.';
                    }
    
                    return true;
                },
            },
            {
                type: 'input',
                name: 'description',
                message: 'Введите описание:',
            },
        ]);
    
        const amount = Number(answers.amount);
    
        const transaction = new Transaction(
            amount,
            answers.type,
            new Date().toISOString(),
            answers.description
        );
    
        account.addTransaction(transaction);
        console.log('Транзакция успешно добавлена.');
        await this.pressEnterToContinue();
    }

    // private async addTransaction(account: Account) {
    //     const answers = await inquirer.prompt([
    //         {
    //             type: 'list',
    //             name: 'type',
    //             message: 'Выберите тип транзакции:',
    //             choices: ['income', 'expense'],
    //         },
    //         {
    //             type: 'number',
    //             name: 'amount',
    //             message: 'Введите сумму:',
    //             validate: (input: number) => (isNaN(input) || input <= 0 ? 'Сумма должна быть положительным числом.' : true),
    //         },
    //         {
    //             type: 'input',
    //             name: 'description',
    //             message: 'Введите описание:',
    //         },
    //     ]);

    //     const transaction = new Transaction(answers.amount, answers.type, new Date().toISOString(), answers.description);
    //     account.addTransaction(transaction);
    //     console.log('Транзакция успешно добавлена.');
    //     await this.pressEnterToContinue();
    // }

    private async deleteTransaction(account: Account) {
        const transactions = account.getTransactions();
        if (transactions.length === 0) {
            console.log('Нет транзакций для удаления.');
            await this.pressEnterToContinue();
            return;
        }

        const { transactionId } = await inquirer.prompt([
            {
                type: 'list',
                name: 'transactionId',
                message: 'Выберите транзакцию для удаления:',
                choices: [
                    ...transactions.map(t => ({ name: t.toString(), value: t.id })),
                    new inquirer.Separator(),
                    { name: 'Назад', value: 'back' },
                ],
            },
        ]);

        if (transactionId === 'back') return;

        const { confirm } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'confirm',
                message: 'Вы уверены, что хотите удалить эту транзакцию?',
                default: false,
            },
        ]);

        if (confirm) {
            account.removeTransactionById(transactionId);
            console.log('Транзакция удалена.');
        }
        await this.pressEnterToContinue();
    }

    private async exportToCsv(account: Account) {
        const { filename } = await inquirer.prompt([
            {
                type: 'input',
                name: 'filename',
                message: 'Введите имя файла для экспорта (включая .csv):',
                default: `${account.name.replace(/\s/g, '_')}_transactions.csv`,
            },
        ]);

        try {
            await account.exportTransactionsToCSV(filename);
            console.log(`Транзакции успешно экспортированы в ${filename}`);
        } catch (_) {
            console.error('обшибка экспорта транзакций');
        }
        await this.pressEnterToContinue();
    }

    private async deleteAccount(accountId: string): Promise<boolean> {
        const { confirm } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'confirm',
                message: 'Вы уверены, что хотите удалить этот счет? Все транзакции будут удалены.',
                default: false,
            },
        ]);

        if (confirm) {
            this.accountManager.removeAccountById(accountId);
            console.log('Счет удален.');
            await this.pressEnterToContinue();
            return true;
        }
        return false;
    }

    private async pressEnterToContinue(clear: boolean = true) {
        await inquirer.prompt([
            {
                type: 'input',
                name: 'continue',
                message: 'Нажмите Enter для продолжения...',
            },
        ]);
        if (clear) console.clear();
    }
}