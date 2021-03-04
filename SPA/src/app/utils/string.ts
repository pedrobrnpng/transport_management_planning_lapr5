export function isLetter(str: string){
    return str.length === 1 && str.match(/[a-z]/i);
}

export function isNumber(str: string){
    return str.length === 1 && str.match(/[0-9]/i);
}