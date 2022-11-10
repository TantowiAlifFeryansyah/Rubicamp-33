import ModelMatkul from "../models/matkul.js";
import ViewMatkul from "../views/matkul.js"
import Utama, { rl } from "../challenge18.js";
import Table from "cli-table";

export default class Matkul {
    static menuMatkul() {
        ViewMatkul.listMatkul()
        rl.question('Masukan salah satu nomor dari opsi diatas : ', (ketikan) => {
            switch (ketikan) {
                case '1':
                    Matkul.daftarMatkul();
                    break;
                case '2':
                    Matkul.cariMataKuiah()
                    break;
                case '3':
                    Matkul.tambahMataKuliah()
                    break;
                case '4':
                    Matkul.hapusMataKuliah()
                    break;
                case '5':
                    Utama.menuUtama()
                    break;
                default:
                    this.menuMatkul()
            }
        })
    }

    static daftarMatkul() {
        var matkul = new Table({
            head: ['Kode Matkul', 'Nama Matkul', 'SKS']
            , colWidths: [15, 20, 5]
        });
        ModelMatkul.daftarMatkul((err, rows) => {
            if (err) return console.log('gagal ambil data', err);
            rows.forEach((item) => {
                matkul.push(
                    [item['Kode Matkul'], item['Nama Matkul'], item.SKS])
            })
            console.log(matkul.toString());
            console.log(`==============================================================================================`)
            Matkul.menuMatkul()
        })
    }

    static cariMataKuiah() {
        rl.question('Masukan Kode Mata Kuliah : ', (kodeMatkul) => {
            ModelMatkul.cariMataKuiah(kodeMatkul, (err, rows) => {
                if (err) return console.log('gagal ambil data', err);
                if (rows) {
                    console.log(`==============================================================================================`);
                    console.log(`
                        Detail Jurusan dengan Kode ${kodeMatkul} :
                        Kode Mata Kuliah  : ${rows['Kode Matkul']}
                        Nama Mata Kuliah  : ${rows['Nama Matkul']}
                        SKS               : ${rows.SKS}
                        `);
                    console.log(`==============================================================================================`);
                    Matkul.menuMatkul()
                }
                else {
                    console.log(`Mata Kuliah dengan Kode ${kodeMatkul} tidak terdaftar`);
                    console.log(`==============================================================================================`);
                    Matkul.menuMatkul()
                }
            })
        })
    }

    static tambahMataKuliah() {
        console.log(`Lengkapi data di bawah ini :`);
        var matkul = new Table({
            head: ['Kode Matkul', 'Nama Matkul', 'SKS']
            , colWidths: [15, 20, 5]
        });
        ModelMatkul.daftarMatkul((err, rows) => {
            if (err) return console.log('gagal ambil data', err);
            rows.forEach((item) => {
                matkul.push(
                    [item['Kode Matkul'], item['Nama Matkul'], item.SKS])
            })
            console.log(matkul.toString());
            rl.question(`Kode Mata Kuliah : `, (kodeMatkul) => {
                rl.question(`Nama Mata Kuliah : `, (namaMatkul) => {
                    rl.question(`SKS : `, (sks) => {
                        ModelMatkul.tambahMataKuliah(kodeMatkul, namaMatkul, sks, (err) => {
                            if (err) return console.log('gagal ambil data', err);
                            console.log(`Mata Kuliah telah ditambahkan`);
                            console.log(`==============================================================================================`)
                            Matkul.menuMatkul()
                        })
                    })
                })
            })
        })
    }

    static hapusMataKuliah() {
        rl.question('Masukan Kode Mata Kuliah : ', (kodeMatkul) => {
            ModelMatkul.hapusMataKuliah(kodeMatkul, (err) => {
                if (err) return console.log('gagal ambil data', err);
                console.log(`Data Mata Kuliah ${kodeMatkul}, telah dihapus`);
                console.log(`==============================================================================================`);
                Matkul.menuMatkul()
            })
        })
    }
}