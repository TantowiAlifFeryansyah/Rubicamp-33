import ModelJurusan from "../models/jurusan.js";
import ViewJurusan from "../views/jurusan.js"
import Utama, { rl } from "../challenge18.js";
import Table from "cli-table";

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
        ModelJurusan.daftarJurusan((err, rows) => {
            if (err) return console.log('gagal ambil data', err);
            rows.forEach(item => {
                jurusan.push(
                    [item['Kode Jurusan'], item['Nama Jurusan']])
            })
            console.log(jurusan.toString());
            console.log(`==============================================================================================`);
            Jurusan.menuJurusan()
        })
    }

    static cariJurusan() {
        rl.question('Masukan Kode Jurusan : ', (kodeJurusan) => {
            ModelJurusan.cariJurusan(kodeJurusan, (err, rows) => {
                if (err) return console.log('gagal ambil data', err);
                if (rows) {
                    console.log(`==============================================================================================`);
                    console.log(`
                        Detail Jurusan dengan Kode ${kodeJurusan} :
                        Kode Jurusan  : ${rows['Kode Jurusan']}
                        Nama Jurusan  : ${rows['Nama Jurusan']}
                        `);
                    console.log(`==============================================================================================`);
                    Jurusan.menuJurusan()
                }
                else {
                    console.log(`Jurusan dengan Kode Jurusan ${kodeJurusan} tidak terdaftar`);
                    console.log(`==============================================================================================`);
                    Jurusan.menuJurusan()
                }
            })
        })
    }

    static tambahJurusan() {
        console.log(`Lengkapi data di bawah ini :`);
        var jurusan = new Table({
            head: ['Kode Jurusan', 'Nama Jurusan']
            , colWidths: [15, 20]
        });
        ModelJurusan.daftarJurusan((err, rows) => {
            if (err) return console.log('gagal ambil data', err);
            rows.forEach(item => {
                jurusan.push(
                    [item['Kode Jurusan'], item['Nama Jurusan']])
            })
            console.log(jurusan.toString());
            rl.question(`Kode Jurusan : `, (kodeJurusan) => {
                rl.question(`Nama Jurusan : `, (namaJurusan) => {
                    ModelJurusan.tambahJurusan(kodeJurusan, namaJurusan, (err) => {
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
        rl.question('Masukan Kode Jurusan : ', (kodeJurusan) => {
            ModelJurusan.hapusJurusan(kodeJurusan, (err) => {
                if (err) return console.log('gagal ambil data', err);
                console.log(`Data Jurusan ${kodeJurusan}, telah dihapus`);
                console.log(`==============================================================================================`);
                Jurusan.menuJurusan()
            })
        })
    }
}