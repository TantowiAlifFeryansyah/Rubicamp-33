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
                menuUtama()
                rl.question('Masukan salah satu nomor dari opsi diatas : ', (ketikan) => {
                    switch (ketikan) {
                        case '1':
                            menuMahasiswa();
                            break;
                        case '2':
                            menuJurusan()
                            break;
                        case '3':
                            tabelDosen()
                            break;
                        case '4':
                            tabelMataKuliah()
                            menuMat
                            break;
                        case '5':
                            tabelKontrak()
                            break;
                        case '6':
                            rl.close()
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
    console.log(`==============================================================================================`)

}

function menuMahasiswa() {
    console.log('silahkan pilih opsi dibawah ini :');
    console.log('[1] Daftar Mahasiswa');
    console.log('[2] Cari Mahasiswa');
    console.log('[3] Tambah Mahasiswa');
    console.log('[4] Hapus Mahasiswa');
    console.log('[5] Kembali');
    console.log(`==============================================================================================`)

}

function menuJurusan() {
    console.log('silahkan pilih opsi dibawah ini :');
    console.log('[1] Daftar Jurusan');
    console.log('[2] Cari Jurusan');
    console.log('[3] Tambah Jurusan');
    console.log('[4] Hapus Jurusan');
    console.log('[5] Kembali');
    console.log(`==============================================================================================`)

}

function menuKontrak() {
    console.log('silahkan pilih opsi dibawah ini :');
    console.log('[1] Daftar Kontrak');
    console.log('[2] Cari Kontrak');
    console.log('[3] Tambah Kontrak');
    console.log('[4] Hapus Kontrak');
    console.log('[5] Update Nilai');
    console.log('[6] Kembali');
    console.log(`==============================================================================================`)

}

function tabelMahasiswa() {
    db.all('SELECT * FROM Mahasiswa', (err, rows) => {
        if (err) return console.log('gagal ambil data', err);
        var mahasiswa = new Table({
            head: ['NIM', 'Nama', 'Tanggal Lahir', 'Alamat', 'Kode Jurusan', 'Nama Jurusan']
            , colWidths: [13, 10, 15, 15, 15, 20]
        });
        rows.forEach((item, index) => {
            mahasiswa.push(
                [item.NIM, item.Nama, item['Tanggal Lahir'], item.Alamat, item['Kode Jurusan'], item['Nama Jurusan']])
        })
        console.log(mahasiswa.toString());
        console.log(`==============================================================================================`)
    })
}

function tabelJurusan() {
    db.all('SELECT * FROM Jurusan', (err, rows) => {
        if (err) return console.log('gagal ambil data', err);
        var jurusan = new Table({
            head: ['Kode Jurusan', 'Nama Jurusan']
            , colWidths: [15, 20]
        });
        rows.forEach((item, index) => {
            jurusan.push(
                [item['Kode Jurusan'], item['Nama Jurusan']])
        })
        console.log(jurusan.toString());
        console.log(`==============================================================================================`)
    })
}

function tabelDosen() {
    db.all('SELECT * FROM Dosen', (err, rows) => {
        if (err) return console.log('gagal ambil data', err);
        var dosen = new Table({
            head: ['NIP', 'Nama Dosen']
            , colWidths: [10, 20]
        });
        rows.forEach((item, index) => {
            dosen.push(
                [item.NIP, item['Nama Dosen']])
        })
        console.log(dosen.toString());
    })
}

function tabelMataKuliah() {
    db.all('SELECT * FROM Matkul', (err, rows) => {
        if (err) return console.log('gagal ambil data', err);
        var matkul = new Table({
            head: ['Kode Matkul', 'Nama Matkul', 'SKS']
            , colWidths: [15, 20, 5]
        });
        // table is an Array, so you can `push`, `unshift`, `splice` and friends
        rows.forEach((item, index) => {
            matkul.push(
                [item['Kode Matkul'], item['Nama Matkul'], item.SKS])
        })
        console.log(matkul.toString());
    })
}

function tabelKontrak() {
    db.all('SELECT * FROM Kontrak', (err, rows) => {
        if (err) return console.log('gagal ambil data', err);
        var kontrak = new Table({
            head: ['ID', 'NIM', 'Nama', 'Mata Kuliah', 'Dosen', 'Nilai']
            , colWidths: [5, 15, 15, 15, 15, 7]
        });
        // table is an Array, so you can `push`, `unshift`, `splice` and friends
        rows.forEach((item, index) => {
            kontrak.push(
                [item.ID, item.NIM, item.Nama, item['Mata Kuliah'], item.Dosen, item.Nilai])
        })
        console.log(kontrak.toString());
    })
}