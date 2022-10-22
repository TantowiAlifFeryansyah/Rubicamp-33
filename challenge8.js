/*
Buatlah sebuah function yang menerima string. Sting tersebut merupakan suatu pola perhitungan dari beberapa bilangan namun bilangan nya itu sendiri tidak lengkap, dan tugasmu adalah menebak 1 angka yang seharusnya. Sehingga apabila bilangan tersebut telah lengkap, maka akan membentuk suatu pola perhitungan yang benar.
*/

function pola(str) {
    // write your code here
    let sisi = str.split("=");
    let angka = sisi[0].split("*");
    for (let i = 0; i <= 9; i++) {
        for (let j = 0; j <= 9; j++) {
            let input = angka[0].replace("#", i)
            let output = sisi[1].replace("#", j)
            if (+input * +angka[1] === +output) {
                return [i, j];
            }
        }
    }
}

console.log(pola("42#3 * 188 = 80#204"));
//result: [8, 5]

console.log(pola("8#61 * 895 = 78410#5"));
// result: [7, 9]

/*
OUTPUT
[8, 5]
[7, 9]
*/

/*
KEYWORD
-
*/
