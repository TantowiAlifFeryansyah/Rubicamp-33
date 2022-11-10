import sqlite3 from 'sqlite3';
import path from 'path';

const pathDB = path.join(path.resolve(), 'db', 'university.db');
export const db = new sqlite3.Database(pathDB);

import ViewMasuk from './views/masuk.js';
import Dosen from "./controllers/dosen.js";
import Jurusan from "./controllers/jurusan.js";
import Matkul from "./controllers/matkul.js";
import Mahasiswa from "./controllers/mahasiswa.js";
import Kontrak from "./controllers/kontrak.js";


import fs from 'fs'
const data = fs.readFileSync('dataAdmin.json', 'utf8')
export const convert = JSON.parse(data)

import readline from 'readline';
export const rl = readline.createInterface(process.stdin, process.stdout);

export default class Utama {
    static listUtama() {
        ViewMasuk.welcome()
    }

    static menuUtama() {
        this.listUtama()
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
                    this.menuUtama()
            }
        })
    }
}