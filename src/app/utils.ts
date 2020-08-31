export function groupBy(list, keyGetter) {
    const result = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = result.get(key);
        if (!collection) {
            result.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return result;
}

export function formatDate(inputDate) {
    const date = new Date(inputDate);
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    const year = date.getFullYear();

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    return [year, month, day].join('-');
}
