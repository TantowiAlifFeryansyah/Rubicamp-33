/*
buatlah sebuah permainan tebak tebakan, gunakan file data.json untuk menyimpan daftar pertanyaan dan jawaban. file data.json sudah disertakan di github. ikuti aturan di bawah ini.
*/

if(process.argv.length<=2){
  console.log(`belum lengkap cuy coba lagi`)
}
else if (process.argv.length > 2){



const fs = require('fs')
const data = fs.readFileSync('data.json', 'utf8')
const convert = JSON.parse(data)
console.log("Selamat datang di permainan Tebak-tebakan. kamu akan diberikan pertanyaan dari file ini 'data.json'.\nUntuk bermain, jawablah dengan jawaban yang sesuai.\nGunakan 'skip' untuk menangguhkan pertanyaanya, dan di akhir pertanyaan akan ditanyakan lagi. \n")

const readline = require('node:readline');
const rl = readline.createInterface({


  input: process.stdin,
  output: process.stdout,
  prompt: `Jawaban: `
});

let wrong = 1;
let penambah = 0;
console.log(`Pertanyaan: ${convert[penambah].definition}`)

rl.prompt();

rl.on('line', (ketikan) => {

  if (ketikan.toLowerCase() == convert[penambah].term) {
    console.log(`\nAnda Beruntung! \n`);
    penambah++;
    wrong = 1;

    if (penambah == convert.length) {
      console.log('Anda Berhasil!');
      rl.close() // untuk memanggil close (menutup running)
    }
    else {
      console.log(`Pertanyaan: ${convert[penambah].definition}`);
    }
  }
  else if (ketikan.toLowerCase() == 'skip') {
    convert.push(convert[penambah])
    penambah++
    console.log(`\nPertanyaan: ${convert[penambah].definition}`);
  }
  else {
    console.log(`\nAnda Kurang Beruntung! anda telah salah ${wrong} kali, silahkan coba lagi.`);
    wrong++;
  }
  rl.prompt();
}).on('close', () => {
  process.exit(0);
});

}

/*
KEYWORD
process.argv, readline, array
*/
