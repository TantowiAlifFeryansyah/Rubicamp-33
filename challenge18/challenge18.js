const sqlite3 = require('sqlite3').verbose();
const path = require('path');
var Table = require('cli-table');

const pathDB = path.join(__dirname, 'db', 'university.db');

const db = new sqlite3.Database(path.join(pathDB));

db.all('SELECT * FROM Mahasiswa', (err, rows) => {
if(err) return console.log('gagal ambil data', err);
// instantiate
var mahasiswa = new Table({
    head: ['NIM', 'Nama', 'Tanggal Lahir', 'Alamat', 'Kode Jurusan', 'Nama Jurusan']
  , colWidths: [13, 10, 15, 15, 15,20]
});
// table is an Array, so you can `push`, `unshift`, `splice` and friends
rows.forEach((item, index) => {
    mahasiswa.push(
        [item.NIM, item.Nama, item['Tanggal Lahir'], item.Alamat, item['Kode Jurusan'], item['Nama Jurusan']])
})
console.log(mahasiswa.toString());
})