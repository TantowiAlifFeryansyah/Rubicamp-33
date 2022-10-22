/*
buatlah sebuah fungsi yang mengalikan anggota dalam angka tersebut, hingga nilai terakhir hanya terdiri dari 1 digit
*/

function weirdMultiply(sentence) {
    //write your code here
    let param = sentence.toString();
    let angka = 1;

    for (let i = 0; i < param.length; i++){
        angka *= param[i]
    }
    let string = angka.toString()

    if ( string.length == 1){
        return angka
    }
    else {
        return weirdMultiply(angka);
    }
}

console.log(weirdMultiply(39)); // 3 * 9 = 27 -> 2 * 7 = 14 -> 1 * 4 = 4
console.log(weirdMultiply(999)); // 9 * 9 * 9 = 729 -> 7 * 2 * 9 = 126 -> 1 * 2 * 6 = 12 -> 1 * 2 = 2
console.log(weirdMultiply(3)); // -> 3 karena hanya 1 digit

/*
OUTPUT
4
2
3
*/

/*
KEYWORD
recursive
*/
