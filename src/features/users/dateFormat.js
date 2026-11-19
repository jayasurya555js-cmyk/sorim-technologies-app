export function dateForInput(value = '') {
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    const [day, month, year] = value.split('-');
    return day && month && year ? `${year}-${month}-${day}` : '';
}

export function dateForTable(value = '') {
    const [year, month, day] = value.split('-');
    return year && month && day ? `${day}-${month}-${year}` : '';
}