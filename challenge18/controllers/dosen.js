import ModelDosen from "../models/dosen.js";
import ViewDosen from "../views/dosen.js"
import Utama, { rl } from "../challenge18.js";
import Table from "cli-table";

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
            rows.forEach((item) => {
                dosen.push(
                    [item.NIP, item['Nama Dosen']])
            })
            console.log(dosen.toString());
            console.log(`==============================================================================================`)
            Dosen.menuDosen()
        })
    }

    static cariDosen() {
        rl.question('Masukan NIP Dosen : ', (nip) => {
            ModelDosen.cariDosen(nip, (err, rows) => {
                if (err) return console.log('gagal ambil data', err);
                if (rows) {
                    console.log(`==============================================================================================`);
                    console.log(`
                        Detail Dosen dengan NIP ${nip} :
                        NIP         : ${rows.NIP}
                        Nama Dosen  : ${rows['Nama Dosen']}
                        `);
                    console.log(`==============================================================================================`);
                    Dosen.menuDosen()
                }
                else {
                    console.log(`Dosen dengan NIP ${nip} tidak terdaftar`);
                    console.log(`==============================================================================================`);
                    Dosen.menuDosen()
                }
            })
        })
    }

    static tambahDosen() {
        console.log(`Lengkapi data di bawah ini :`);
        var dosen = new Table({
            head: ['NIP', 'Nama Dosen']
            , colWidths: [10, 20]
        });
        ModelDosen.daftarDosen((err, rows) => {
            if (err) return console.log('gagal ambil data', err);
            rows.forEach((item) => {
                dosen.push(
                    [item.NIP, item['Nama Dosen']])
            })
            console.log(dosen.toString());
            rl.question(`Masukan NIP : `, (nip) => {
                rl.question(`Nama Dosen : `, (namaDosen) => {
                    ModelDosen.tambahDosen(nip, namaDosen, (err) => {
                        if (err) return console.log('gagal ambil data', err);
                        console.log(`Dosen telah ditambahkan`);
                        console.log(`==============================================================================================`)
                        Dosen.menuDosen()
                    })
                })
            })
        })
    }

    static hapusDosen() {
        var dosen = new Table({
            head: ['NIP', 'Nama Dosen']
            , colWidths: [10, 20]
        });
        ModelDosen.daftarDosen((err, rows) => {
            if (err) return console.log('gagal ambil data', err);
            rows.forEach((item) => {
                dosen.push(
                    [item.NIP, item['Nama Dosen']])
            })
            console.log(dosen.toString());
            rl.question('Masukan Kode NIP Dosen : ', (nip) => {
                ModelDosen.hapusDosen(nip, (err) => {
                    if (err) return console.log('gagal ambil data', err);
                    console.log(`Detail Dosen ${nip}, telah dihapus`);
                    console.log(`==============================================================================================`);
                    Dosen.menuDosen()
                })
            })
        })
    }
}