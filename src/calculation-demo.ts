
let income: number = 200000;
let expenses: number = 80000;
let savings: number = 50000;

let netIncome: number;
let remaining: number;

netIncome = income - expenses;
remaining = netIncome - savings;

console.log(`
    Текущее состояние бюджета:
-------------------------------------------------
    Доход (income) ............ ${income}
    Расходы (expenses) ........ ${expenses}
    Сбережения (savings) ...... ${savings}
    Чистый доход (netIncome) .. ${netIncome}
    Остаток (remaining) ....... ${remaining}
-------------------------------------------------
`);
