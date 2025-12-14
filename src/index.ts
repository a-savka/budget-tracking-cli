import { Account } from "./classes/Account";
import { AccountManager } from "./classes/AccountManager";
import { Transaction } from "./classes/Transaction";
import { readFile } from "fs/promises";


function main() {
    const accountManager = new AccountManager();

    const account1 = new Account("Account 1");
    account1.addTransaction(new Transaction(
         100000,
        "income",
        new Date().toISOString(),
        "Salary"
    ));
    account1.addTransaction(new Transaction(
        200,
        "expense",
        new Date().toISOString(),
        "Coffee"
    ));
    account1.addTransaction(new Transaction(
        200,
        "expense",
        new Date().toISOString(),
        "Will be removed"
    ));
    account1.addTransaction(new Transaction(
        2000,
        "expense",
        new Date().toISOString(),
        "Fuel"
    ));

    accountManager.addAccount(account1);
    const accId = accountManager.getAccounts()[0].id;
    const acc = accountManager.getAccountById(accId)!;

    console.log('Транзакции до удаления:');
    console.log(accountManager.getAccountById(accId)!.getTransactions(), '\n');

    const trId = acc.getTransactions()[1].id;
    acc.removeTransactionById(trId);

    console.log('Транзакции после удаления:');
    console.log(accountManager.getAccountById(accId)!.getTransactions(), '\n');

    console.log('Текущее состояние счета:');
    console.log(accountManager.getSummaryString());


    console.log('Транзакции:');
    acc.getTransactions().forEach(tr => {
        console.log(tr.toString());
    });

    acc.getTransactions().forEach(tr => {
        tr.update({
            amount: 99999,
            description: 'Updated'
        });
    });

    console.log('\nТранзакции после изменения:');
    acc.getTransactions().forEach(tr => {
        console.log(tr.toString());
    });
}


async function testExport() {
    const account = new Account("Test Account");

    account.addTransaction(new Transaction(
        1000,
        "income",
        new Date().toISOString(),
        "Initial deposit"
    ));
    account.addTransaction(new Transaction(
        50,
        "expense",
        new Date().toISOString(),
        "Coffee"
    ));
    account.addTransaction(new Transaction(
        120,
        "expense",
        new Date().toISOString(),
        "Groceries, milk"
    ));

    const filename = 'transactions.csv';

    try {
        console.log('Экспорт транзакций в CSV');
        await account.exportTransactionsToCSV(filename);
        console.log(`Файл ${filename} успешно создан.`);

        console.log('\nСодержимое файла:');
        const fileContent = await readFile(filename, 'utf-8');
        console.log(fileContent);

    } catch (error) {
        console.error('Произошла ошибка:', error);
    }
}

main();
console.log();
testExport();
