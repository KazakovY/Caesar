let str = 'Im having a great time here in Sydney.';
let key = 3;
let otherSymbols = {
    ' ': 0,
    ',': 0,
    ';': 0,
    '!': 0,
    '\n': 0,
    '\r': 0,
    '?': 0,
    '.': 0,
    '>': 0,
    '<': 0,
    '>>': 0,
    '>>': 0,
    ':': 0,
    '-': 0,
    '…': 0,
    '—': 0
}
function E(str, key) {
    let out = '';
    let pos;

    for (let i = 0; i < str.length; i++) {

        for (let i = 0; i < str.length; i++) {
            if (str[i] in otherSymbols) {
                out += str[i];
                continue;
            }else {
                pos = str.charCodeAt(i);
                pos = pos + key;
                out += String.fromCharCode(pos);
            }
        }
        return out;
    }
}
function DE(out, key){
    let answer = '';
    let pos1;
    for (let i = 0; i < out.length; i++) {
        if (out[i] in otherSymbols) {
            answer += out[i];
            continue;
        }else {
            pos1 = out.charCodeAt(i);
            pos1 = pos1 - key;
            answer += String.fromCharCode(pos1);
        }
    }
    return answer;
}
function actualFreq(out) {
    let freq = new  Array();
    for (let i=0; i < out.length;i++) {
        let character = out.charAt(i);
        if (freq[character]) {
            freq[character]++;
        } else {
            freq[character] = 1;
        }
    }
    return freq;
}
let fs = require('fs');
let canonFreq = fs.readFileSync('canonicalFreq.txt').toString();
let powerAlph = new Array(canonFreq);
let encrypt = E(str, key);
let decrypt = DE(encrypt, key);
let actFreq = actualFreq(encrypt);

function findKeys(powerAlph, actFreq){
    let sum = 0;
    let min = Number.POSITIVE_INFINITY;
    let findK = 0;
    for (let i = 0; i < powerAlph; i++){
        if (powerAlph[i] === actFreq[i]){
            sum += Math.abs(powerAlph[i] - actFreq[i]);
        }
    }
    if (sum < min){
        min = sum;
        findK = key;
    }
    return findK;
}
let newAnswer = DE(encrypt,findKeys(powerAlph,actFreq));
let foundKey = findKeys(powerAlph,actFreq)
console.log(encrypt);
console.log(decrypt);
console.log(`найденый ключ: ${foundKey} декодированая строка: ${newAnswer}`);