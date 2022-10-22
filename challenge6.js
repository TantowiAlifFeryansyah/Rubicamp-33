/*
buatlah sebuah fungsi untuk memanipulasi kalimat dengan mengikuti aturan pada tantangan sebelumnya (tantangan ke-5)
*/

function sentencesManipulation(sentence){
    //whire your code here
    let kata = sentence.split(" ");
    // console.log(kata)

    let penampung = [];

    for (let i = 0; i < kata.length; i++){
        let word = kata[i]
        // console.log(word)
        let j = 0;
        // console.log(word[j])
        if (word[j] == "a" || word[j] == "i" || word[j] == "u" || word[j] == "e" || word[j] == "o"){
            penampung.push(word)
        }
        else {
            penampung.push(word.substr(1).concat(word[j], "nyo"))
        }
    }
    console.log(penampung.toString().replace(/,/g , " "));
}

sentencesManipulation('ibu pergi ke pasar bersama aku');

/*
OUTPUT
'ibu ergipnyo eknyo asarpnyo ersamabnyo aku'
*/

/*
Keyword
string reference
*/