/*
buatlah sebuah function deret bilangan kelipatan 3 yang mengembalikan sebuah arrat dengan panjang array yang dinamis sehingga fungsi tersebut akan menerima parameter number yang akan menjadi nilai dari panjang array yang akan dikeluarkan.

Deret bilangan ini mengikuti aturan sebagai berikut:
1. yang apabila habis dibagi dengan 5 cetak "KAS"
2. dan apabila dibagi dengan 6 cetak "KUS"
3. dan apabila dibagi oleh angka 5 dan 6 cetak "KASKUS"
*/


function deretKaskus(n){
    // write code here
    let result = ""
    let arr = []; 
    let number = [];

    for ( let i = 1; i <= n; i++){
        let kelipatanTiga = i*3
        number.push(kelipatanTiga)
        // console.log(number)
    }
    
    for (let i = 0; i < n; i++){
        let hasil = number[i]
        if (hasil % 5 === 0 && hasil % 6 === 0){
            result = "KASKUS";
        }
        else if (hasil % 6 === 0){
            result = "KUS";
        }
        else if (hasil % 5 === 0) {
            result = "KAS"
        }
        else {
            result = hasil
        }
        arr.push(result)
    }
    return arr
}

console.log(deretKaskus(10));



/*
OUTPUT
[3, "KUS", 9, "KUS", "KAS", "KUS", 21, "KUS", 27 "KASKUS"]
*/

3, 6, 9, 12, 15, 18, 21, 24, 27, 30;

/* 
KEYWORD
Modulus, Array
*/