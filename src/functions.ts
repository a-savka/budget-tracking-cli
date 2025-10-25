
function calculateTotal(values: number[]): number {
    return values.reduce((sum, value) => sum + value, 0);
}

function calculateAverage(values: number[]): number {
    if (values.length === 0) {
        return 0;
    }
    return calculateTotal(values) / values.length;
}

function formatCurrency(value: number, symbol: string): string {
    return `${value.toFixed(0)} ${symbol}`;
}

function getTopValues(values: number[], count: number): number[] {
    values = values.sort((a, b) => b - a);
    if (count >= values.length) {
        return values;
    }
    return values.slice(0, count);

}

function printSummary(values: number[]): void {
    console.log(
        `Всего записей: ${values.length}\n` +
        `Сумма: ${calculateTotal(values)}\n` +
        `Среднее: ${calculateAverage(values)}`
    );
}

const numbers = [400, 700, 200, 500, 900];
console.log(`Исходные данные: numbers = ${numbers}`);
console.log(`calculateTotal(numbers) = ${calculateTotal(numbers)}`);
console.log(`calculateAverage(numbers) = ${calculateAverage(numbers)}`);
console.log(`formatCurrency(800, 'Руб') = ${formatCurrency(800, 'Руб')}`);
console.log(`getTopValues(numbers, 3) = ${getTopValues(numbers, 3)}`);
console.log(`SUMMARY`);
printSummary(numbers);
