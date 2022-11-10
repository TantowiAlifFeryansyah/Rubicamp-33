import readline from 'readline';
import sqlite3 from 'sqlite3';
import path from 'path';

import Kontrak from "./controllers/kontrak.js";
import Mahasiswa from "./controllers/mahasiswa.js";
import Matkul from "./controllers/matkul.js";
import Jurusan from "./controllers/jurusan.js";
import Dosen from "./controllers/dosen.js";

import Table from 'cli-table';

const pathDB = path.join(path.resolve(), 'db', 'university.db');
export const db = new sqlite3.Database(pathDB);


import fs from 'fs'
const convert = JSON.parse(fs.readFileSync('dataAdmin.json', 'utf8'))


export const rl = readline.createInterface(process.stdin, process.stdout);

class login {
    static welcome() {
        console.log(`==============================================================================================`)
        console.log(`Welcome to Universitas Pendidikan Indonesia`)
        console.log(`Jl. Setiabudi No. 255`)
        console.log(`==============================================================================================`)
        login.user()
    }

    static user() {
        rl.question('Username : ', (nama) => {
            if (nama.toLocaleLowerCase() != convert[0].term) {
                console.log(`tidak terdaftar`);
                rl.close()
            }
            else {
                rl.question('Password : ', (password) => {
                    console.log(`==============================================================================================`)
                    console.log(`Welcome, ${nama}. Yout access is level : ADMIN`);
                    console.log(`==============================================================================================`)
                    console.log('\n');
                    Utama.menuUtama();
                })
            }
        })
        rl.on('close', () => {
            console.log('Anda telah keluar');
            console.log(`==============================================================================================`);
            process.exit(0);
        });
    }
}

login.welcome()

export default class Utama {
    static listUtama() {
        console.log('silahkan pilih opsi dibawah ini :');
        console.log('[1] Mahasiswa');
        console.log('[2] Jurusan');
        console.log('[3] Dosen');
        console.log('[4] Mata Kuliah');
        console.log('[5] Kontrak');
        console.log('[6] Keluar');
        console.log(`==============================================================================================`)
    }

    static menuUtama() {
        Utama.listUtama()
        rl.question('Masukan salah satu nomor dari opsi diatas : ', (ketikan) => {
            console.log(`==============================================================================================`)
            switch (ketikan) {
                case '1':
                    Mahasiswa.menuMahasiswa();;
                    break;
                case '2':
                    Jurusan.menuJurusan()
                    break;
                case '3':
                    Dosen.menuDosen()
                    break;
                case '4':
                    Matkul.menuMatkul()
                    break;
                case '5':
                    Kontrak.menuKontrak()
                    break;
                case '6':
                    rl.close()
                default:
                    Utama.menuUtama()
            }
        })
    }
}
