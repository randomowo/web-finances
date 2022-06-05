export function zip<T>(...arrays: T[][]): (T | null)[][] {
    const maxLength = Math.max(...arrays.map((arr) => arr.length));
    const result = [];
    for (let i = 0; i < maxLength; i++) {
        result.push(arrays.map((arr) => arr[i] || null));
    }
    return result;
}

export function mappingZip<T>(...maps: {[k: string]: T}[]): {[k: string]: (T | null)[]} {
    const result: {[k: string]: (T | null)[]} = {};
    Object.keys(maps[0]).forEach((k) => {
        result[k] = maps.map((m) => m[k] || null);
    });

    return result;
}
