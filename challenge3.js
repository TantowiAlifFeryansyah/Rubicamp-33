/*
buatlah sebuah fungsi yang dapat mengkonversi number menjadi huruf romawi
*/

function romawi(n) {
    // write your code here
    let angkaRomawi = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };

    var hasil = "";

    for (var key in angkaRomawi){
        // console.log(key); //output = M, CM, D, CD, C, XC...
        let romawi = angkaRomawi[key]
        // console.log(romawi); //1000, 900, 500, 400, 100...
        while (n >= romawi) {
            hasil += key; //hasil = hasil + key
            n -= romawi; //n = n - romawi
            // console.log(n)
        }
    }
    return hasil;
    }

console.log("Script Testing untuk Konversi Romawi/n");
console.log("input | expected | result");
console.log("------|----------|-------");
console.log("4     |IV        |", romawi(4));
console.log("9     |IX        |", romawi(9));
console.log("13    |XIII      |", romawi(13));
console.log("1453  |MCDLIII   |", romawi(1453));
console.log("1646  |MDCXLVI   |", romawi(1646));


/*
OUTPUT
input | expected | result");
------|----------|-------");
4     |IV        |  IV
9     |IX        |  IX
13    |XIII      |  XIII
1453  |MCDLIII   |  MCDLIII
1646  |MDCXLVI   |  MDCXLVI
*/

/*
KEYWORD
Assignment, function
*/