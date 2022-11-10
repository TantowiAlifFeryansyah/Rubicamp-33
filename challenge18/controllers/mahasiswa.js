import ModelMahasiswa from "../models/mahasiswa.js";
import ViewMahasiswa from "../views/mahasiswa.js";
import Table from "cli-table";
import Utama, { rl } from "../challenge18.js";

export default class Mahasiswa {
    static menuMahasiswa() {
        ViewMahasiswa.listMahasiswa();
        rl.question('Masukan salah satu nomor dari opsi diatas : ', (ketikan) => {
            switch (ketikan) {
                case '1':
                    Mahasiswa.daftarMahasiswa();
                    break;
                case '2':
                    Mahasiswa.cariMahasiswa();
                    break;
                case '3':
                    Mahasiswa.tambahMahasiswa();
                    break;
                case '4':
                    Mahasiswa.hapusMahasiswa();
                    break;
                case '5':
                    Utama.menuUtama();
                    break;
                default:
                    this.menuMahasiswa();
            }
        })
    }

    static daftarMahasiswa() {
        var mahasiswa = new Table({
            head: ['NIM', 'Nama', 'Tanggal Lahir', 'Alamat', 'Kode Jurusan', 'Nama Jurusan']
            , colWidths: [13, 10, 15, 15, 15, 20]
        });
        ModelMahasiswa.daftarMahasiswa((err, rows) => {
            if (err) return console.log('gagal ambil data', err);
            rows.forEach((item, index) => {
                mahasiswa.push(
                    [item.NIM, item.Nama, item['Tanggal Lahir'], item.Alamat, item['Kode Jurusan'], item['Nama Jurusan']])
            })
            console.log(mahasiswa.toString());
            console.log(`==============================================================================================`)
            Mahasiswa.menuMahasiswa()
        })
    }

    static cariMahasiswa() {
        rl.question('Masukan NIM Mahasiswa : ', (ketikan) => {
            ModelMahasiswa.cariMahasiswa(ketikan, (err, row) => {
                if (err) return console.log('gagal ambil data', err);
                if (row) {
                    console.log(`==============================================================================================`);
                    console.log(`
                        Detail Mahasiswa dengan NIM ${ketikan} :
                        NIM     : ${row.NIM}
                        Nama    : ${row.Nama}
                        Alamat  : ${row.Alamat}
                        Jurusan : ${row['Nama Jurusan']}
                        `);
                    console.log(`==============================================================================================`);
                    Mahasiswa.menuMahasiswa()
                }
                else {
                    console.log(`Mahasiswa dengan NIM ${ketikan} tidak terdaftar`);
                    console.log(`==============================================================================================`);
                    Mahasiswa.menuMahasiswa()
                }
            })
        })
    }

    static tambahMahasiswa() {
        console.log(`Lengkapi data di bawah ini :`);
        ModelMahasiswa.daftarMahasiswa((err, rows) => {
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
            rl.question(`NIM : `, (ketikan) => {
                rl.question(`Nama : `, (ketikan2) => {
                    rl.question(`Tanggal Lahir : `, (ketikan3) => {
                        rl.question(`Alamat : `, (ketikan4) => {
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
                                rl.question(`Kode Jurusan : `, (ketikan5) => {
                                    ModelMahasiswa.tambahMahasiswa(ketikan, ketikan2, ketikan3, ketikan4, ketikan5, (err) => {
                                        if (err) return console.log('gagal ambil data', err);
                                        console.log((err, rows) => {
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
                                            Mahasiswa.menuMahasiswa()
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    }

    static hapusMahasiswa() {
        rl.question('Masukan NIM Mahasiswa : ', (ketikan) => {
            ModelMahasiswa.hapusMahasiswa(ketikan, (err) => {
                if (err) return console.log('gagal ambil data', err);
                console.log(`Detail Mahasiswa ${ketikan}, telah dihapus`);
                console.log(`==============================================================================================`);
                Mahasiswa.menuMahasiswa()
            })
        })
    }
}