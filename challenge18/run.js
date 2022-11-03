// const sqlite3 = require('sqlite3').verbose();
import sqlite3 from 'sqlite3';
// const path = require('path');
import path from 'path';
// const Table = require('cli-table');
import Table from 'cli-table';

// const pathDB = path.join(__dirname, 'db', 'university.db')
const pathDB = path.join(path.resolve(), 'db', 'university.db');

const db = new sqlite3.Database(pathDB);


import fs from 'fs'
const data = fs.readFileSync('dataAdmin.json', 'utf8')
const convert = JSON.parse(data)

// const readline = require('readline');
import readline from 'readline';

const rl = readline.createInterface(process.stdin, process.stdout);
console.log(`==============================================================================================`)
console.log(`Welcome to Universitas Pendidikan Indonesia\nJl. Setiabudi No. 255`)
console.log(`==============================================================================================`)
rl.question('Username : ', (nama) => {
    if (nama.toLocaleLowerCase() != convert[0].term) {
        console.log(`tidak terdaftar`);
        rl.question('Username : ', (nama) => {
            rl.question('Password : ', (password) => {
                console.log(`==============================================================================================`)
                console.log(`Welcome, ${nama}. Yout access is level : ADMIN`);
                console.log(`==============================================================================================`)
                console.log('\n');
                console.log(menuUtama());
                console.log('\n');
                console.log(`==============================================================================================`)
                rl.question('Masukan salah satu nomor dari opsi diatas : ', (ketikan) => {
                    switch (ketikan) {
                        case '1':
                        break;
                    }
                })
            })
        })
    }
})

function menuUtama() {
    console.log('silahkan pilih opsi dibawah ini :');
    console.log('[1] Mahasiswa');
    console.log('[2] Jurusan');
    console.log('[3] Dosen');
    console.log('[4] Mata Kuliah');
    console.log('[5] Kontrak');
    console.log('[6] Keluar');
}

db.all('SELECT * FROM Mahasiswa', (err, rows) => {
    if (err) return console.log('gagal ambil data', err);
    var mahasiswa = new Table({
        head: ['NIM', 'Nama', 'Tanggal Lahir', 'Alamat', 'Kode Jurusan', 'Nama Jurusan']
      , colWidths: [13, 10, 15, 15, 15,20]
    });     
    rows.forEach((item, index) => {
        mahasiswa.push(
            [item.NIM, item.Nama, item['Tanggal Lahir'], item.Alamat, item['Kode Jurusan'], item['Nama Jurusan']])
    })
    console.log(mahasiswa.toString());
})