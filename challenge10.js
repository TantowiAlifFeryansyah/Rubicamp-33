/*
implementasikan penggunaan readline pada fungsi yang telah dibuat di chalenge #6
*/

const readline = require('node:readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'tulis kalimatmu disini > '
});

rl.prompt();

rl.on('line', (line) => {
    function sentencesManipulation(sentence){
        let kata = sentence.split(" ");
        let penampung = [];
    
        for (let i = 0; i < kata.length; i++){
            let word = kata[i]
            let j = 0;
            if (word[j] == "a" || word[j] == "i" || word[j] == "u" || word[j] == "e" || word[j] == "o"){
                penampung.push(word)
                
            }
            else {
                penampung.push(word.substr(1).concat(word[j], "nyo"))
            }
        }
        console.log(`hasil konversi: ${penampung.join(" ")}`)
    }
    
    sentencesManipulation(line);
    
  rl.prompt();
}).on('close', () => {
  console.log('Good bye!');
  process.exit(0);
});



/*
KEYWORD
readline
*/
