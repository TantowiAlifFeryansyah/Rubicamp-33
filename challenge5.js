/*
buatlah sebuah fungsi untuk memanipulasi string dengan mengikuti aturan sebagai berikut:

    1. apabila kata diawali huruf vokal, fungsi langsung mengembalikan kata tersebut.
    2. apabila kata diawali huruf konsonan, huruf konsonan tersebut dipindahkan ke akhir kata dan menambahkan akhiran 'nyo' di katanya.
*/

function stringManipulation(word) {
    //write your code here
    // console.log(arguments[0][0])
    let hurufVocal = ["a", "i", "u", "e", "o"];

    for (let i = 0; i < hurufVocal.length; i++){
        let hasil = hurufVocal[i]
        if(arguments[0][0] === hasil){
            return console.log(arguments[i]);
        }
        else{
            return console.log(word.slice(1).concat(arguments[0][0], "nyo"));
        }
    }
}

stringManipulation('ayam'); //ayam
stringManipulation('bebek'); //ebekbnyo

/*
OUTPUT
'ayam'
'ebekbnyo'
*/

/*
KEYWORD
string reference
*/