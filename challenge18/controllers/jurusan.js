import ViewJurusan from "../views/jurusan.js";
import ModelJurusan from "../models/jurusan.js";
import Table from "cli-table";
import Utama, { rl } from "../challenge18.js";


export default class Jurusan {
    static menuJurusan() {
        ViewJurusan.listJurusan()
        rl.question('Masukan salah satu nomor dari opsi diatas : ', (ketikan) => {
            switch (ketikan) {
                case '1':
                    Jurusan.daftarJurusan();
                    break;
                case '2':
                    Jurusan.cariJurusan()
                    break;
                case '3':
                    Jurusan.tambahJurusan()
                    break;
                case '4':
                    Jurusan.hapusJurusan()
                    break;
                case '5':
                    Utama.menuUtama()
                    break;
                default:
                    this.menuJurusan()
            }
        })
    }

    static daftarJurusan() {
        var jurusan = new Table({
            head: ['Kode Jurusan', 'Nama Jurusan']
            , colWidths: [15, 20]
        });
        ModelJurusan.daftarJurusan('SELECT * FROM Jurusan', (err, rows) => {
            if (err) return console.log('gagal ambil data', err);
            rows.forEach((item, index) => {
                jurusan.push(
                    [item['Kode Jurusan'], item['Nama Jurusan']])
            })
            console.log(jurusan.toString());
            console.log(`==============================================================================================`);
            Jurusan.menuJurusan()
        })
    }

    static cariJurusan() {
        rl.question('Masukan Kode Jurusan : ', (ketikan) => {
            const sql = (`SELECT * FROM Jurusan WHERE "Kode Jurusan" = ?`)
            ModelJurusan.cariJurusan(sql, [ketikan], (err, row) => {
                if (err) return console.log('gagal ambil data', err);
                if (row) {
                    console.log(`==============================================================================================`);
                    console.log(`
                        Detail Jurusan dengan Kode ${ketikan} :
                        Kode Jurusan  : ${row['Kode Jurusan']}
                        Nama Jurusan  : ${row['Nama Jurusan']}
                        `);
                    console.log(`==============================================================================================`);
                    Jurusan.menuJurusan()
                }
                else {
                    console.log(`Jurusan dengan Kode Jurusan ${ketikan} tidak terdaftar`);
                    console.log(`==============================================================================================`);
                    Jurusan.menuJurusan()
                }
            })
        })
    }

    static tambahJurusan() {
        console.log(`Lengkapi data di bawah ini :`);
        ModelJurusan.daftarJurusan('SELECT * FROM Jurusan', (err, rows) => {
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
            rl.question(`Kode Jurusan : `, (ketikan) => {
                rl.question(`Nama Jurusan : `, (ketikan2) => {
                    const sql = (`INSERT INTO Jurusan ("Kode Jurusan", "Nama Jurusan") VALUES (?,?)`)
                ModelJurusan.tambahJurusan(sql, [ketikan, ketikan2], (err) => {
                        if (err) return console.log('gagal ambil data', err);
                        console.log(`Jurusan telah ditambahkan ke database`);
                        console.log(`==============================================================================================`)
                        Jurusan.menuJurusan()
                    })
                })
            })
        })
    }

    static hapusJurusan() {
        rl.question('Masukan Kode Jurusan : ', (ketikan) => {
            const sql = (`DELETE FROM Jurusan WHERE "Kode Jurusan" = ?`);
            ModelJurusan.hapusJurusan(sql, [ketikan], (err) => {
                if (err) return console.log('gagal ambil data', err);
                console.log(`Data Jurusan ${ketikan}, telah dihapus`);
                console.log(`==============================================================================================`);
                Jurusan.menuJurusan()
            })
        })
    }
}