/*
buatlah sebuah permainan tebak kata. Gunakan data.json untuk menyimpan daftar pertanyaan dan jawaban. file data.json sudah disertakan di github.
*/

const fs = require('fs')
let data = fs.readFileSync('data.json', 'utf8')
let convert = JSON.parse(data)
// console.log(convert)
console.log("Selamat datang di permainan Tebak Kata, silahkan isi dengan jawaban yang benar ya! \n")

const readline = require('node:readline');
const rl = readline.createInterface({


  input: process.stdin,
  output: process.stdout,
  prompt: `Tebakan: `
});

let penambah = 0;
console.log(`Pertanyaan: ${convert[penambah].definition}`)

rl.prompt();

rl.on('line', (ketikan) => {
  if (ketikan.toLowerCase() == convert[penambah].term) {
    console.log(`Selamat Anda Benar! \n`);
    penambah++

    if (penambah == convert.length) {
        console.log('Hore Anda Menang!')
        rl.close() // untuk memanggil close (menutup running)
    }
    else {
        console.log(`Pertanyaan: ${convert[penambah].definition}`)
        
    }
}
else {
    console.log(`Wkwkwkwk, Anda kurang beruntung!\n`);
}
rl.prompt();
}).on('close', () => {
    process.exit(0);
});

/*
KEYWORD
readline, dan file system di node.js
*/