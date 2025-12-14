
export function escapeCsvValue(value: string | number): string {
    const str = String(value);
    
    if (/[,\"\n]/.test(str)) {
        const escaped = str.replace(/"/g, '""');
        return `"${escaped}"`;
    }
    
    return str;
}
