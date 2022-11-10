import ModelMahasiswa from "../models/mahasiswa.js";
import ViewMahasiswa from "../views/mahasiswa.js"
import Utama, { rl } from "../challenge18.js";
import Table from "cli-table";
import ModelJurusan from "../models/jurusan.js";

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
            rows.forEach((item) => {
                mahasiswa.push(
                    [item.NIM, item.Nama, item['Tanggal Lahir'], item.Alamat, item['Kode Jurusan'], item['Nama Jurusan']])
            })
            console.log(mahasiswa.toString());
            console.log(`==============================================================================================`)
            Mahasiswa.menuMahasiswa()
        })
    }

    static cariMahasiswa() {
        rl.question('Masukan NIM Mahasiswa : ', (nim) => {
            ModelMahasiswa.cariMahasiswa(nim, (err, rows) => {
                if (err) return console.log('gagal ambil data', err);
                if (rows) {
                    console.log(`==============================================================================================`);
                    console.log(`
                        Detail Mahasiswa dengan NIM ${nim} :
                        NIM     : ${rows.NIM}
                        Nama    : ${rows.Nama}
                        Alamat  : ${rows.Alamat}
                        Jurusan : ${rows['Nama Jurusan']}
                        `);
                    console.log(`==============================================================================================`);
                    Mahasiswa.menuMahasiswa()
                }
                else {
                    console.log(`Mahasiswa dengan NIM ${nim} tidak terdaftar`);
                    console.log(`==============================================================================================`);
                    Mahasiswa.menuMahasiswa()
                }
            })
        })
    }

    static tambahMahasiswa() {
        console.log(`Lengkapi data di bawah ini :`);
        var mahasiswa = new Table({
            head: ['NIM', 'Nama', 'Tanggal Lahir', 'Alamat', 'Kode Jurusan', 'Nama Jurusan']
            , colWidths: [13, 10, 15, 15, 15, 20]
        });
        ModelMahasiswa.daftarMahasiswa((err, rows) => {
            if (err) return console.log('gagal ambil data', err);
            rows.forEach((item) => {
                mahasiswa.push(
                    [item.NIM, item.Nama, item['Tanggal Lahir'], item.Alamat, item['Kode Jurusan'], item['Nama Jurusan']])
            })
            console.log(mahasiswa.toString());
            rl.question(`NIM : `, (nim) => {
                rl.question(`Nama : `, (nama) => {
                    rl.question(`Alamat : `, (alamat) => {
                        rl.question(`Tanggal Lahir : `, (ttl) => {
                            var jurusan = new Table({
                                head: ['Kode Jurusan', 'Nama Jurusan']
                                , colWidths: [15, 20]
                            });
                            ModelJurusan.daftarJurusan((err, rows) => {
                                if (err) return console.log('gagal ambil data', err);
                                rows.forEach((item) => {
                                    jurusan.push(
                                        [item['Kode Jurusan'], item['Nama Jurusan']])
                                })
                                console.log(jurusan.toString());
                                rl.question(`Kode Jurusan : `, (kodeJurusan) => {
                                    ModelMahasiswa.tambahMahasiswa(nim, nama, ttl, alamat, kodeJurusan, (err) => {
                                        if (err) return console.log('gagal ambil data', err);
                                        console.log(`Mahasiswa telah ditambahkan`);
                                        var mahasiswa = new Table({
                                            head: ['NIM', 'Nama', 'Tanggal Lahir', 'Alamat', 'Kode Jurusan', 'Nama Jurusan']
                                            , colWidths: [13, 10, 15, 15, 15, 20]
                                        });
                                        ModelMahasiswa.daftarMahasiswa((err, rows) => {
                                            if (err) return console.log('gagal ambil data', err);
                                            rows.forEach(item => {
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
        rl.question('Masukan NIM Mahasiswa : ', (nim) => {
            ModelMahasiswa.hapusMahasiswa(nim, (err) => {
                if (err) return console.log('gagal ambil data', err);
                console.log(`Detail Mahasiswa ${nim}, telah dihapus`);
                console.log(`==============================================================================================`);
                Mahasiswa.menuMahasiswa()
            })
        })
    }
}