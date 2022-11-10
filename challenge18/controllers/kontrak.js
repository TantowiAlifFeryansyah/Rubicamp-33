import ModelKontrak from "../models/kontrak.js";
import ViewKontrak from "../views/kontrak.js"
import Utama, { rl } from "../challenge18.js";
import Table from "cli-table";
import ModelMatkul from "../models/matkul.js";
import ModelDosen from "../models/dosen.js";


export default class Kontrak {
    static menuKontrak() {
        ViewKontrak.listKontrak()
        rl.question('Masukan salah satu nomor dari opsi diatas : ', (ketikan) => {
            switch (ketikan) {
                case '1':
                    Kontrak.daftarKontrak();
                    break;
                case '2':
                    Kontrak.cariKontrak()
                    break;
                case '3':
                    Kontrak.tambahKontrak()
                    break;
                case '4':
                    Kontrak.hapusKontrak()
                    break;
                case '5':
                    Kontrak.updateKontrak()
                    break;
                case '6':
                    Utama.menuUtama()
                    break;
                default:
                    this.menuKontrak()
            }
        })
    }

    static daftarKontrak() {
        var kontrak = new Table({
            head: ['ID', 'NIM', 'Nama', 'Mata Kuliah', 'Dosen', 'Nilai']
            , colWidths: [5, 15, 15, 20, 15, 7]
        });
        ModelKontrak.daftarKontrak((err, rows) => {
            if (err) return console.log('gagal ambil data', err);
            rows.forEach((item) => {
                kontrak.push(
                    [item.ID, item.NIM, item.Nama, item['Mata Kuliah'], item.Dosen, item.Nilai])
            })
            console.log(kontrak.toString());
            console.log(`==============================================================================================`)
            Kontrak.menuKontrak()
        })
    }

    static cariKontrak() {
        var kontrak = new Table({
            head: ['ID', 'NIM', 'Nama', 'Mata Kuliah', 'Dosen', 'Nilai']
            , colWidths: [5, 15, 15, 20, 15, 7]
        });
        ModelKontrak.daftarKontrak((err, rows) => {
            if (err) return console.log('gagal ambil data', err);
            rows.forEach((item) => {
                kontrak.push(
                    [item.ID, item.NIM, item.Nama, item['Mata Kuliah'], item.Dosen, item.Nilai])
            })
            console.log(kontrak.toString());
            rl.question('Masukan NIM Mahasiswa : ', (nim) => {
                ModelKontrak.cariKontrak(nim, (err, rows) => {
                    if (err) return console.log('gagal ambil data', err);
                    var kontrak = new Table({
                        head: ['ID', 'NIM', 'Kode Matkul', 'NIP', 'Nilai']
                        , colWidths: [5, 15, 15, 10, 7]
                    });
                    rows.forEach((item) => {
                        kontrak.push(
                            [item.ID, item.NIM, item['Kode Matkul'], item.NIP, item.Nilai])
                    })
                    console.log(kontrak.toString());
                    Kontrak.menuKontrak()
                })
            })
        })
    }

    static tambahKontrak() {
        console.log(`Lengkapi data di bawah ini :`);
        var kontrak = new Table({
            head: ['ID', 'NIM', 'Nama', 'Mata Kuliah', 'Dosen', 'Nilai']
            , colWidths: [5, 15, 15, 20, 15, 7]
        });
        ModelKontrak.daftarKontrak((err, rows) => {
            if (err) return console.log('gagal ambil data', err);
            rows.forEach((item) => {
                kontrak.push(
                    [item.ID, item.NIM, item.Nama, item['Mata Kuliah'], item.Dosen, item.Nilai])
            })
            console.log(kontrak.toString());
            rl.question(`Kode NIM : `, (nim) => {
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
                    rl.question(`Masukan Kode Mata Kuliah : `, (kodeMatkul) => {
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
                            rl.question(`Masukan NIP Dosen : `, (nip) => {
                                rl.question(`Masukan Nilai : `, (nilai) => {
                                    ModelKontrak.tambahKontrak(nim, kodeMatkul, nip, nilai, (err) => {
                                        if (err) return console.log('gagal ambil data', err);
                                        console.log(`Kontrak telah ditambahkan`);
                                        var kontrak = new Table({
                                            head: ['ID', 'NIM', 'Nama', 'Mata Kuliah', 'Dosen', 'Nilai']
                                            , colWidths: [5, 15, 15, 20, 15, 7]
                                        });
                                        ModelKontrak.daftarKontrak((err, rows) => {
                                            if (err) return console.log('gagal ambil data', err);
                                            rows.forEach((item) => {
                                                kontrak.push(
                                                    [item.ID, item.NIM, item.Nama, item['Mata Kuliah'], item.Dosen, item.Nilai])
                                            })
                                            console.log(kontrak.toString());
                                            console.log(`==============================================================================================`);
                                            Kontrak.menuKontrak()
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

    static hapusKontrak() {
        rl.question('Masukan ID Kontrak : ', (id) => {
            ModelKontrak.hapusKontrak(id, (err) => {
                if (err) return console.log('gagal ambil data', err);
                console.log(`Data Kontrak engan ID ${id}, telah dihapus`);
                console.log(`==============================================================================================`);
                Kontrak.menuKontrak()
            })
        })
    }

    static updateKontrak() {
        var kontrak = new Table({
            head: ['ID', 'NIM', 'Nama', 'Mata Kuliah', 'Dosen', 'Nilai']
            , colWidths: [5, 15, 15, 20, 15, 7]
        });
        ModelKontrak.daftarKontrak((err, rows) => {
            if (err) return console.log('gagal ambil data', err);
            rows.forEach((item) => {
                kontrak.push(
                    [item.ID, item.NIM, item.Nama, item['Mata Kuliah'], item.Dosen, item.Nilai])
            })
            console.log(kontrak.toString());

            rl.question('Masukan NIM Mahasiswa : ', (nim) => {
                ModelKontrak.cariKontrak(nim, (err, rows) => {
                    if (err) return console.log('gagal ambil data', err);
                    var kontrak = new Table({
                        head: ['ID', 'NIM', 'Kode Matkul', 'NIP', 'Nilai']
                        , colWidths: [5, 15, 15, 10, 7]
                    });
                    rows.forEach((item) => {
                        kontrak.push(
                            [item.ID, item.NIM, item['Kode Matkul'], item.NIP, item.Nilai])
                    })
                    console.log(`==============================================================================================`)
                    console.log(`Detail Mahasiswa dengan NIM '${nim}' :`);
                    console.log(kontrak.toString());


                    rl.question(`Masukan ID yang akan dirubah nilainya : `, (id) => {
                        console.log(`==============================================================================================`)
                        rl.question(`tulis nilai yang baru : `, (nilai) => {
                            console.log(`==============================================================================================`)
                            ModelKontrak.updateKontrak([nilai, id], (err) => {
                                if (err) return console.log('gagal ambil data', err);
                                console.log(`Nilai telah di update`);
                            })
                        })
                    })
                })
            })
        })
    }
}