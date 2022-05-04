function addClass(str: string, arr: string[]): void {
    let index = arr.indexOf(str);
    if (index < 0 && arr.length <= 0) {
        arr.push(str);
    } else if (index < 0 && arr.length > 0) {
        arr.splice(index, 1);
        arr.push(str);
    } else {
        arr.splice(index, 1);
    }
}

export default addClass