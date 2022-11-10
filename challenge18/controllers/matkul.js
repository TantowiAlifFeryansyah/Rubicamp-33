import ModelMatkul from "../models/matkul.js";
import ViewMatkul from "../views/matkul.js";
import Table from "cli-table";
import Utama, { rl } from "../challenge18.js";


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
        ModelMatkul.daftarMatkul('SELECT * FROM Matkul', (err, rows) => {
            if (err) return console.log('gagal ambil data', err);
            rows.forEach((item, index) => {
                matkul.push(
                    [item['Kode Matkul'], item['Nama Matkul'], item.SKS])
            })
            console.log(matkul.toString());
            console.log(`==============================================================================================`)
            Matkul.menuMatkul()
        })
    }

    static cariMataKuiah() {
        rl.question('Masukan Kode Mata Kuliah : ', (ketikan) => {
            const sql = (`SELECT * FROM Matkul WHERE "Kode Matkul" = ?`)
            ModelMatkul.cariMataKuiah(sql, [ketikan], (err, row) => {
                if (err) return console.log('gagal ambil data', err);
                if (row) {
                    console.log(`==============================================================================================`);
                    console.log(`
                        Detail Jurusan dengan Kode ${ketikan} :
                        Kode Mata Kuliah  : ${row['Kode Matkul']}
                        Nama Mata Kuliah  : ${row['Nama Matkul']}
                        SKS               : ${row.SKS}
                        `);
                    console.log(`==============================================================================================`);
                    Matkul.menuMatkul()
                }
                else {
                    console.log(`Mata Kuliah dengan Kode ${ketikan} tidak terdaftar`);
                    console.log(`==============================================================================================`);
                    Matkul.menuMatkul()
                }
            })
        })
    }

    static tambahMataKuliah() {
        console.log(`Lengkapi data di bawah ini :`);
        rl.question(`Kode Mata Kuliah : `, (ketikan) => {
            rl.question(`Nama Mata Kuliah : `, (ketikan2) => {
                rl.question(`SKS : `, (ketikan3) => {
                    const sql = (`INSERT INTO Matkul ('Kode Matkul', 'Nama Matkul', 'SKS') VALUES (?,?,?)`)
                    ModelMatkul.tambahMataKuliah(sql, [ketikan, ketikan2, ketikan3], (err) => {
                        if (err) return console.log('gagal ambil data', err);
                        console.log(`Mata Kuliah telah ditambahkan`);
                        console.log(`==============================================================================================`)
                        Matkul.menuMatkul()
                    })
                })
            })
        })
    }

    static hapusMataKuliah() {
        rl.question('Masukan Kode Mata Kuliah : ', (ketikan) => {
            const sql = (`DELETE FROM Matkul WHERE "Kode Matkul" = ?`);
            ModelMatkul.hapusMataKuliah(sql, [ketikan], (err) => {
                if (err) return console.log('gagal ambil data', err);
                console.log(`Data Mata Kuliah ${ketikan}, telah dihapus`);
                console.log(`==============================================================================================`);
                Matkul.menuMatkul()
            })
        })
    }
}