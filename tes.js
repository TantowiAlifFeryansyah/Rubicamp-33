// const sqlite3 = require('sqlite3').verbose();
import sqlite3 from 'sqlite3';
// const path = require('path');
import path from 'path';
// const Table = require('cli-table');
import Table from 'cli-table';

// const pathDB = path.join(__dirname, 'db', 'university.db')
const pathDB = path.join(path.resolve(), 'db', 'university.db');

const db = new sqlite3.Database(pathDB);


import fs from 'fs'
const data = fs.readFileSync('dataAdmin.json', 'utf8')
const convert = JSON.parse(data)

// const readline = require('readline');
import readline from 'readline';

const rl = readline.createInterface(process.stdin, process.stdout);
console.log(`==============================================================================================`)
console.log(`Welcome to Universitas Pendidikan Indonesia\nJl. Setiabudi No. 255`)
console.log(`==============================================================================================`)

rl.question('Username : ', (nama) => {
    if (nama.toLocaleLowerCase() != convert[0].term) {
        console.log(`tidak terdaftar`);
        rl.close()
    }
    else {
        rl.question('Password : ', (password) => {
            console.log(`==============================================================================================`)
            console.log(`Welcome, ${nama}. Yout access is level : ADMIN`);
            console.log(`==============================================================================================`)
            console.log('\n');
            Utama.menuUtama();
        })
    }
})
rl.on('close', () => {
    console.log('Anda telah keluar');
    console.log(`==============================================================================================`);
    process.exit(0);
});

// Menu utama (switch case), daftar, cari, hapus => controller
// Menu utama (switch case), daftar, cari, hapus include db.all => model Query SQL (SELECT, INSERT, DELETE)
// Menu utama (switch case), daftar, cari, hapus console.log list => view

class Utama {
    static listUtama() {
        console.log('silahkan pilih opsi dibawah ini :');
        console.log('[1] Mahasiswa');
        console.log('[2] Jurusan');
        console.log('[3] Dosen');
        console.log('[4] Mata Kuliah');
        console.log('[5] Kontrak');
        console.log('[6] Keluar');
        console.log(`==============================================================================================`)
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

class Mahasiswa {
    static listMahasiswa() {
        console.log('silahkan pilih opsi dibawah ini :');
        console.log('[1] Daftar Mahasiswa');
        console.log('[2] Cari Mahasiswa');
        console.log('[3] Tambah Mahasiswa');
        console.log('[4] Hapus Mahasiswa');
        console.log('[5] Kembali');
        console.log(`==============================================================================================`)
    }

    static menuMahasiswa() {
        this.listMahasiswa();
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
        db.all(`SELECT Mahasiswa.*, Jurusan.'Nama Jurusan' FROM Mahasiswa JOIN Jurusan ON Mahasiswa.'Kode Jurusan' = Jurusan.'Kode Jurusan'`, (err, rows) => {
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
    }

    static cariMahasiswa() {
        rl.question('Masukan NIM Mahasiswa : ', (ketikan) => {
            const sql = (`SELECT Mahasiswa.*, Jurusan.'Nama Jurusan' FROM Mahasiswa JOIN Jurusan ON Mahasiswa.'Kode Jurusan' = Jurusan.'Kode Jurusan' WHERE NIM = ?`)
            db.get(sql, [ketikan], (err, row) => {
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
        db.all(`SELECT Mahasiswa.*, Jurusan.'Nama Jurusan' FROM Mahasiswa JOIN Jurusan ON Mahasiswa.'Kode Jurusan' = Jurusan.'Kode Jurusan'`, (err, rows) => {
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
                                    const sql = (`INSERT INTO Mahasiswa (NIM, Nama, 'Tanggal Lahir', Alamat, 'Kode Jurusan') VALUES (?,?,?,?,?)`)
                                    db.run(sql, [ketikan, ketikan2, ketikan3, ketikan4, ketikan5], (err) => {
                                        if (err) return console.log('gagal ambil data', err);
                                        console.log(`Mahasiswa telah ditambahkan`);
                                        db.all(`SELECT Mahasiswa.*, Jurusan.'Nama Jurusan' FROM Mahasiswa JOIN Jurusan ON Mahasiswa.'Kode Jurusan' = Jurusan.'Kode Jurusan'`, (err, rows) => {
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
            const sql = (`DELETE FROM Mahasiswa WHERE NIM = ?`);
            db.run(sql, [ketikan], (err) => {
                if (err) return console.log('gagal ambil data', err);
                console.log(`Detail Mahasiswa ${ketikan}, telah dihapus`);
                console.log(`==============================================================================================`);
                Mahasiswa.menuMahasiswa()
            })
        })
    }
}

class Jurusan {
    static listJurusan() {
        console.log('silahkan pilih opsi dibawah ini :');
        console.log('[1] Daftar Jurusan');
        console.log('[2] Cari Jurusan');
        console.log('[3] Tambah Jurusan');
        console.log('[4] Hapus Jurusan');
        console.log('[5] Kembali');
        console.log(`==============================================================================================`)
    }

    static menuJurusan() {
        this.listJurusan()
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
            console.log(`==============================================================================================`);
            Jurusan.menuJurusan()
        })
    }

    static cariJurusan() {
        rl.question('Masukan Kode Jurusan : ', (ketikan) => {
            const sql = (`SELECT * FROM Jurusan WHERE "Kode Jurusan" = ?`)
            db.get(sql, [ketikan], (err, row) => {
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
            rl.question(`Kode Jurusan : `, (ketikan) => {
                rl.question(`Nama Jurusan : `, (ketikan2) => {
                    const sql = (`INSERT INTO Jurusan ("Kode Jurusan", "Nama Jurusan") VALUES (?,?)`)
                    db.run(sql, [ketikan, ketikan2], (err) => {
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
            db.run(sql, [ketikan], (err) => {
                if (err) return console.log('gagal ambil data', err);
                console.log(`Data Jurusan ${ketikan}, telah dihapus`);
                console.log(`==============================================================================================`);
                Jurusan.menuJurusan()
            })
        })
    }
}

class Dosen {
    static listDosen() {
        console.log('silahkan pilih opsi dibawah ini :');
        console.log('[1] Daftar Dosen');
        console.log('[2] Cari Dosen');
        console.log('[3] Tambah Dosen');
        console.log('[4] Hapus Dosen');
        console.log('[5] Kembali');
        console.log(`==============================================================================================`)
    }

    static menuDosen() {
        this.listDosen()
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
        db.all('SELECT * FROM Dosen', (err, rows) => {
            if (err) return console.log('gagal ambil data', err);
            var dosen = new Table({
                head: ['NIP', 'Nama Dosen']
                , colWidths: [10, 20]
            });
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
            db.get(sql, [ketikan], (err, row) => {
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
                db.run(sql, [ketikan, ketikan2], (err) => {
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
            db.run(sql, [ketikan], (err) => {
                if (err) return console.log('gagal ambil data', err);
                console.log(`Detail Dosen ${ketikan}, telah dihapus`);
                console.log(`==============================================================================================`);
                Dosen.menuDosen()
            })
        })
    }
}

class Matkul {
    static listMatkul() {
        console.log('silahkan pilih opsi dibawah ini :');
        console.log('[1] Daftar Mata Kuliah');
        console.log('[2] Cari Mata Kuliah');
        console.log('[3] Tambah Mata Kuliah');
        console.log('[4] Hapus Mata Kuliah');
        console.log('[5] Kembali');
        console.log(`==============================================================================================`)
    }

    static menuMatkul() {
        this.listMatkul()
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
        db.all('SELECT * FROM Matkul', (err, rows) => {
            if (err) return console.log('gagal ambil data', err);
            var matkul = new Table({
                head: ['Kode Matkul', 'Nama Matkul', 'SKS']
                , colWidths: [15, 20, 5]
            });
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
            db.get(sql, [ketikan], (err, row) => {
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
                    db.run(sql, [ketikan, ketikan2, ketikan3], (err) => {
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
            db.run(sql, [ketikan], (err) => {
                if (err) return console.log('gagal ambil data', err);
                console.log(`Data Mata Kuliah ${ketikan}, telah dihapus`);
                console.log(`==============================================================================================`);
                Matkul.menuMatkul()
            })
        })
    }
}

class Kontrak {
    static listKontrak() {
        console.log('silahkan pilih opsi dibawah ini :');
        console.log('[1] Daftar Kontrak');
        console.log('[2] Cari Kontrak');
        console.log('[3] Tambah Kontrak');
        console.log('[4] Hapus Kontrak');
        console.log('[5] Update Nilai');
        console.log('[6] Kembali');
        console.log(`==============================================================================================`)
    }

    static menuKontrak() {
        this.listKontrak()
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
        db.all(`SELECT Kontrak.ID, Kontrak.NIM, Mahasiswa.Nama, Matkul.'Nama Matkul' as 'Mata Kuliah', Dosen.'Nama Dosen' as Dosen, Kontrak.Nilai FROM Kontrak INNER JOIN Mahasiswa ON Kontrak.NIM = Mahasiswa.NIM INNER JOIN Matkul ON Kontrak.'Kode Matkul' = Matkul.'Kode Matkul' INNER JOIN Dosen ON Kontrak.NIP = Dosen.NIP`, (err, rows) => {
            if (err) return console.log('gagal ambil data', err);
            var kontrak = new Table({
                head: ['ID', 'NIM', 'Nama', 'Mata Kuliah', 'Dosen', 'Nilai']
                , colWidths: [5, 15, 15, 20, 15, 7]
            });
            rows.forEach((item, index) => {
                kontrak.push(
                    [item.ID, item.NIM, item.Nama, item['Mata Kuliah'], item.Dosen, item.Nilai])
            })
            console.log(kontrak.toString());
            console.log(`==============================================================================================`)
            Kontrak.menuKontrak()
        })
    }

    static cariKontrak() {
        rl.question('Masukan NIM Mahasiswa : ', (ketikan) => {
            const sql = (`SELECT * FROM Kontrak WHERE NIM = ?`)
            db.all(sql, [ketikan], (err, row) => {
                if (err) return console.log('gagal ambil data', err);
                var kontrak = new Table({
                    head: ['ID', 'NIM', 'Kode Matkul', 'NIP', 'Nilai']
                    , colWidths: [5, 15, 15, 10, 7]
                });
                row.forEach((item, index) => {
                    kontrak.push(
                        [item.ID, item.NIM, item['Kode Matkul'], item.NIP, item.Nilai])
                })
                console.log(kontrak.toString());
                Kontrak.menuKontrak()
            })
        })
    }

    static tambahKontrak() {
        console.log(`Lengkapi data di bawah ini :`);
        db.all(`SELECT Kontrak.ID, Kontrak.NIM, Mahasiswa.Nama, Matkul.'Nama Matkul' as 'Mata Kuliah', Dosen.'Nama Dosen' as Dosen, Kontrak.Nilai FROM Kontrak INNER JOIN Mahasiswa ON Kontrak.NIM = Mahasiswa.NIM INNER JOIN Matkul ON Kontrak.'Kode Matkul' = Matkul.'Kode Matkul' INNER JOIN Dosen ON Kontrak.NIP = Dosen.NIP`, (err, rows) => {
            if (err) return console.log('gagal ambil data', err);
            var kontrak = new Table({
                head: ['ID', 'NIM', 'Nama', 'Mata Kuliah', 'Dosen', 'Nilai']
                , colWidths: [5, 15, 15, 20, 15, 7]
            });
            rows.forEach((item, index) => {
                kontrak.push(
                    [item.ID, item.NIM, item.Nama, item['Mata Kuliah'], item.Dosen, item.Nilai])
            })
            console.log(kontrak.toString());
            rl.question(`Kode NIM : `, (ketikan) => {
                db.all('SELECT * FROM Matkul', (err, rows) => {
                    if (err) return console.log('gagal ambil data', err);
                    var matkul = new Table({
                        head: ['Kode Matkul', 'Nama Matkul', 'SKS']
                        , colWidths: [15, 20, 5]
                    });
                    rows.forEach((item, index) => {
                        matkul.push(
                            [item['Kode Matkul'], item['Nama Matkul'], item.SKS])
                    })
                    console.log(matkul.toString());
                    rl.question(`Masukan Kode Mata Kuliah : `, (ketikan2) => {
                        db.all('SELECT * FROM Dosen', (err, rows) => {
                            if (err) return console.log('gagal ambil data', err);
                            var dosen = new Table({
                                head: ['NIP', 'Nama Dosen']
                                , colWidths: [10, 20]
                            });
                            rows.forEach((item, index) => {
                                dosen.push(
                                    [item.NIP, item['Nama Dosen']])
                            })
                            console.log(dosen.toString());
                            rl.question(`Masukan NIP Dosen : `, (ketikan3) => {
                                rl.question(`Masukan Nilai : `, (ketikan4) => {
                                    const sql = (`INSERT INTO Kontrak ('NIM', 'Kode Matkul', 'NIP','NILAI') VALUES (?,?,?,?)`)
                                    db.run(sql, [ketikan, ketikan2, ketikan3, ketikan4], (err) => {
                                        if (err) return console.log('gagal ambil data', err);
                                        console.log(`Kontrak telah ditambahkan`);
                                        db.all(`SELECT Kontrak.ID, Kontrak.NIM, Mahasiswa.Nama, Matkul.'Nama Matkul' as 'Mata Kuliah', Dosen.'Nama Dosen' as Dosen, Kontrak.Nilai FROM Kontrak INNER JOIN Mahasiswa ON Kontrak.NIM = Mahasiswa.NIM INNER JOIN Matkul ON Kontrak.'Kode Matkul' = Matkul.'Kode Matkul' INNER JOIN Dosen ON Kontrak.NIP = Dosen.NIP`, (err, rows) => {
                                            if (err) return console.log('gagal ambil data', err);
                                            var kontrak = new Table({
                                                head: ['ID', 'NIM', 'Nama', 'Mata Kuliah', 'Dosen', 'Nilai']
                                                , colWidths: [5, 15, 15, 20, 15, 7]
                                            });
                                            rows.forEach((item, index) => {
                                                kontrak.push(
                                                    [item.ID, item.NIM, item.Nama, item['Mata Kuliah'], item.Dosen, item.Nilai])
                                            })
                                            console.log(kontrak.toString());
                                            console.log(`==============================================================================================`)
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
        rl.question('Masukan ID Kontrak : ', (ketikan) => {
            const sql = (`DELETE FROM Kontrak WHERE ID = ?`);
            db.run(sql, [ketikan], (err) => {
                if (err) return console.log('gagal ambil data', err);
                console.log(`Data Kontrak engan ID ${ketikan}, telah dihapus`);
                console.log(`==============================================================================================`);
                Kontrak.menuKontrak()
            })
        })
    }

    static updateKontrak() {
        db.all(`SELECT Kontrak.ID, Kontrak.NIM, Mahasiswa.Nama, Matkul.'Nama Matkul' as 'Mata Kuliah', Dosen.'Nama Dosen' as Dosen, Kontrak.Nilai FROM Kontrak INNER JOIN Mahasiswa ON Kontrak.NIM = Mahasiswa.NIM INNER JOIN Matkul ON Kontrak.'Kode Matkul' = Matkul.'Kode Matkul' INNER JOIN Dosen ON Kontrak.NIP = Dosen.NIP`, (err, rows) => {
            if (err) return console.log('gagal ambil data', err);
            var kontrak = new Table({
                head: ['ID', 'NIM', 'Nama', 'Mata Kuliah', 'Dosen', 'Nilai']
                , colWidths: [5, 15, 15, 20, 15, 7]
            });
            rows.forEach((item, index) => {
                kontrak.push(
                    [item.ID, item.NIM, item.Nama, item['Mata Kuliah'], item.Dosen, item.Nilai])
            })
            console.log(kontrak.toString());
            rl.question(`Masukan nim Mahasiswa : `, (ketikan) => {
                const sql = (`SELECT * FROM Kontrak WHERE NIM = ?`)
                db.all(sql, [ketikan], (err, row) => {
                    if (err) return console.log('gagal ambil data', err);
                    var kontrak = new Table({
                        head: ['ID', 'NIM', 'Kode Matkul', 'NIP', 'Nilai']
                        , colWidths: [5, 15, 15, 10, 7]
                    });
                    row.forEach((item, index) => {
                        kontrak.push(
                            [item.ID, item.NIM, item['Kode Matkul'], item.NIP, item.Nilai])
                    })
                    console.log(`==============================================================================================`)
                    console.log(`Detail Mahasiswa dengan NIM '${ketikan}' :`);
                    console.log(kontrak.toString());

                    rl.question(`Masukan ID yang akan dirubah nilainya : `, (ketikan2) => {
                        console.log(`==============================================================================================`)

                        rl.question(`tulis nilai yang baru : `, (ketikan3) => {
                            console.log(`==============================================================================================`)

                            const sql = (`UPDATE Kontrak SET Nilai = ? WHERE ID = ?`)
                            db.run(sql, [ketikan3, ketikan2], (err) => {
                                if (err) return console.log('gagal ambil data', err);
                                console.log(`Nilai telah di update`);
                                db.all(`SELECT Kontrak.ID, Kontrak.NIM, Mahasiswa.Nama, Matkul.'Nama Matkul' as 'Mata Kuliah', Dosen.'Nama Dosen' as Dosen, Kontrak.Nilai FROM Kontrak INNER JOIN Mahasiswa ON Kontrak.NIM = Mahasiswa.NIM INNER JOIN Matkul ON Kontrak.'Kode Matkul' = Matkul.'Kode Matkul' INNER JOIN Dosen ON Kontrak.NIP = Dosen.NIP`, (err, rows) => {
                                    if (err) return console.log('gagal ambil data', err);
                                    var kontrak = new Table({
                                        head: ['ID', 'NIM', 'Nama', 'Mata Kuliah', 'Dosen', 'Nilai']
                                        , colWidths: [5, 15, 15, 20, 15, 7]
                                    });
                                    rows.forEach((item, index) => {
                                        kontrak.push(
                                            [item.ID, item.NIM, item.Nama, item['Mata Kuliah'], item.Dosen, item.Nilai])
                                    })
                                    console.log(kontrak.toString());
                                    console.log(`==============================================================================================`)
                                    Kontrak.menuKontrak()
                                })
                            })
                        })
                    })
                })
            })
        })
    }
}