import ModelDosen from "../models/dosen.js";
import ViewDosen from "../views/dosen.js";
import Table from 'cli-table';
import Utama, { rl } from "../challenge18.js";

export default class Dosen {
    static menuDosen() {
        ViewDosen.listDosen()
        rl.question('Masukan salah satu nomor dari opsi diatas : ', (ketikan) => {
            switch (ketikan) {
                case '1':
                    Dosen.daftarDosen();
                    break;
                case '2':
                    Dosen.cariDosen()
                    break;
                case '3':
                    Dosen.tambahDosen()
                    break;
                case '4':
                    Dosen.hapusDosen()
                    break;
                case '5':
                    Utama.menuUtama()
                    break;
                default:
                    this.menuDosen()
            }
        })
    }

    static daftarDosen() {
        var dosen = new Table({
            head: ['NIP', 'Nama Dosen']
            , colWidths: [10, 20]
        });
        ModelDosen.daftarDosen((err, rows) => {
            if (err) return console.log('gagal ambil data', err);
            rows.forEach((item, index) => {
                dosen.push(
                    [item.NIP, item['Nama Dosen']])
            })
            console.log(dosen.toString());
            console.log(`==============================================================================================`)
            Dosen.menuDosen()
        })
    }

    static cariDosen() {
        rl.question('Masukan NIP Dosen : ', (ketikan) => {
            const sql = (`SELECT * FROM Dosen WHERE NIP = ?`)
            ModelDosen.cariDosen(sql, [ketikan], (err, row) => {
                if (err) return console.log('gagal ambil data', err);
                if (row) {
                    console.log(`==============================================================================================`);
                    console.log(`
                        Detail Dosen dengan NIP ${ketikan} :
                        NIP         : ${row.NIP}
                        Nama Dosen  : ${row['Nama Dosen']}
                        `);
                    console.log(`==============================================================================================`);
                    Dosen.menuDosen()
                }
                else {
                    console.log(`Dosen dengan NIP ${ketikan} tidak terdaftar`);
                    console.log(`==============================================================================================`);
                    Dosen.menuDosen()
                }
            })
        })
    }

    static tambahDosen() {
        console.log(`Lengkapi data di bawah ini :`);
        rl.question(`Masukan NIP : `, (ketikan) => {
            rl.question(`Nama Dosen : `, (ketikan2) => {
                const sql = (`INSERT INTO Dosen (NIP, 'Nama Dosen') VALUES (?,?)`)
                ModelDosen.tambahDosen(sql, [ketikan, ketikan2], (err) => {
                    if (err) return console.log('gagal ambil data', err);
                    console.log(`Dosen telah ditambahkan`);
                    console.log(`==============================================================================================`)
                    Dosen.menuDosen()
                })
            })
        })
    }

    static hapusDosen() {
        rl.question('Masukan Kode NIP Dosen : ', (ketikan) => {
            const sql = (`DELETE FROM Dosen WHERE NIP = ?`);
            ModelDosen.hapusDosen(sql, [ketikan], (err) => {
                if (err) return console.log('gagal ambil data', err);
                console.log(`Detail Dosen ${ketikan}, telah dihapus`);
                console.log(`==============================================================================================`);
                Dosen.menuDosen()
            })
        })
    }
}