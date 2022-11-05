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
        rl.question('Username : ', (nama) => {
            rl.question('Password : ', (password) => {
                console.log(`==============================================================================================`)
                console.log(`Welcome, ${nama}. Yout access is level : ADMIN`);
                console.log(`==============================================================================================`)
                console.log('\n');
                menuUtama();
            })
        })
    }
})
rl.on('close', () => {
    console.log('Anda telah keluar');
    console.log(`==============================================================================================`);
    process.exit(0);
});

function menuUtama() {
    console.log('silahkan pilih opsi dibawah ini :');
    console.log('[1] Mahasiswa');
    console.log('[2] Jurusan');
    console.log('[3] Dosen');
    console.log('[4] Mata Kuliah');
    console.log('[5] Kontrak');
    console.log('[6] Keluar');
    console.log(`==============================================================================================`)
    rl.question('Masukan salah satu nomor dari opsi diatas : ', (ketikan) => {
        console.log(`==============================================================================================`)
        switch (ketikan) {
            case '1':
                menuMahasiswa();
                break;
            case '2':
                menuJurusan()
                break;
            case '3':
                menuDosen()
                break;
            case '4':
                menuMatkul()
                break;
            case '5':
                menuKontrak()
                break;
            case '6':
                rl.close()
        }
    })

}

function menuMahasiswa() {
    console.log('silahkan pilih opsi dibawah ini :');
    console.log('[1] Daftar Mahasiswa');
    console.log('[2] Cari Mahasiswa');
    console.log('[3] Tambah Mahasiswa');
    console.log('[4] Hapus Mahasiswa');
    console.log('[5] Kembali');
    console.log(`==============================================================================================`)
    rl.question('Masukan salah satu nomor dari opsi diatas : ', (ketikan) => {
        switch (ketikan) {
            case '1':
                daftarMahasiswa();
                break;
            case '2':
                cariMahasiswa();
                break;
            case '3':
                tambahMahasiswa();
                break;
            case '4':
                hapusMahasiswa();
                break;
            case '5':
                menuUtama();
                break;
        }
    })
}

function daftarMahasiswa() {
    db.all('SELECT * FROM Mahasiswa', (err, rows) => {
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
        menuMahasiswa()
    })
}

function cariMahasiswa() {
    rl.question('Masukan NIM Mahasiswa : ', (ketikan) => {
        const sql = (`SELECT * FROM Mahasiswa WHERE NIM = ?`)
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
                menuMahasiswa()
            }
            else {
                console.log(`Mahasiswa dengan NIM ${ketikan} tidak terdaftar`);
                console.log(`==============================================================================================`);
                menuMahasiswa()
            }
        })
    })
}

function tambahMahasiswa() {
    console.log(`Lengkapi data di bawah ini :`);
    rl.question(`NIM : `, (ketikan) => {
        rl.question(`Nama : `, (ketikan2) => {
            rl.question(`Tanggal Lahir : `, (ketikan3) => {
                rl.question(`Alamat : `, (ketikan4) => {
                    rl.question(`Kode Jurusan : `, (ketikan5) => {
                        rl.question(`Nama Jurusan : `, (ketikan6) => {
                            const sql = (`INSERT INTO Mahasiswa (NIM, Nama, 'Tanggal Lahir', Alamat, 'Kode Jurusan', 'Nama Jurusan') VALUES (?,?,?,?,?,?)`)
                            db.run(sql, [ketikan, ketikan2, ketikan3, ketikan4, ketikan5, ketikan6], (err) => {
                                if (err) return console.log('gagal ambil data', err);
                                console.log(`Dosen telah ditambahkan`);
                                console.log(`==============================================================================================`)
                                menuMahasiswa()
                            })
                        })
                    })
                })
            })
        })
    })
}

function hapusMahasiswa() {
    rl.question('Masukan NIM Mahasiswa : ', (ketikan) => {
        const sql = (`DELETE FROM Mahasiswa WHERE NIM = ?`);
        db.run(sql, [ketikan], (err) => {
            if (err) return console.log('gagal ambil data', err);
            console.log(`Detail Mahasiswa ${ketikan}, telah dihapus`);
            console.log(`==============================================================================================`);
            menuMahasiswa()
        })
    })
}

function menuJurusan() {
    console.log('silahkan pilih opsi dibawah ini :');
    console.log('[1] Daftar Jurusan');
    console.log('[2] Cari Jurusan');
    console.log('[3] Tambah Jurusan');
    console.log('[4] Hapus Jurusan');
    console.log('[5] Kembali');
    console.log(`==============================================================================================`)
    rl.question('Masukan salah satu nomor dari opsi diatas : ', (ketikan) => {
        switch (ketikan) {
            case '1':
                daftarJurusan();
                break;
            case '2':
                cariJurusan()
                break;
            case '3':
                tambahJurusan()
                break;
            case '4':
                hapusJurusan()
                break;
            case '5':
                menuUtama()
                break;
        }
    })
}

function daftarJurusan() {
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
        menuJurusan()
    })
}

function cariJurusan() {
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
                menuJurusan()
            }
            else {
                console.log(`Jurusan dengan Kode Jurusan ${ketikan} tidak terdaftar`);
                console.log(`==============================================================================================`);
                menuJurusan()
            }
        })
    })
}

function tambahJurusan() {
    console.log(`Lengkapi data di bawah ini :`);
    rl.question(`Kode Jurusan : `, (ketikan) => {
        rl.question(`Nama Jurusan : `, (ketikan2) => {
            const sql = (`INSERT INTO Jurusan ("Kode Jurusan", "Nama Jurusan") VALUES (?,?)`)
            db.run(sql, [ketikan, ketikan2], (err) => {
                if (err) return console.log('gagal ambil data', err);
                console.log(`Jurusan telah ditambahkan ke database`);
                console.log(`==============================================================================================`)
                menuJurusan()
            })
        })
    })
}

function hapusJurusan() {
    rl.question('Masukan Kode Jurusan : ', (ketikan) => {
        const sql = (`DELETE FROM Jurusan WHERE "Kode Jurusan" = ?`);
        db.run(sql, [ketikan], (err) => {
            if (err) return console.log('gagal ambil data', err);
            console.log(`Data Jurusan ${ketikan}, telah dihapus`);
            console.log(`==============================================================================================`);
            menuJurusan()
        })
    })
}

function menuDosen() {
    console.log('silahkan pilih opsi dibawah ini :');
    console.log('[1] Daftar Dosen');
    console.log('[2] Cari Dosen');
    console.log('[3] Tambah Dosen');
    console.log('[4] Hapus Dosen');
    console.log('[5] Kembali');
    console.log(`==============================================================================================`)
    rl.question('Masukan salah satu nomor dari opsi diatas : ', (ketikan) => {
        switch (ketikan) {
            case '1':
                daftarDosen();
                break;
            case '2':
                cariDosen()
                break;
            case '3':
                tambahDosen()
                break;
            case '4':
                hapusDosen()
                break;
            case '5':
                menuUtama()
                break;
        }
    })
}

function daftarDosen() {
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
        menuDosen()
    })
}

function cariDosen() {
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
                menuDosen()
            }
            else {
                console.log(`Dosen dengan NIP ${ketikan} tidak terdaftar`);
                console.log(`==============================================================================================`);
                menuDosen()
            }
        })
    })
}

function tambahDosen() {
    console.log(`Lengkapi data di bawah ini :`);
    rl.question(`Masukan NIP : `, (ketikan) => {
        rl.question(`Nama Dosen : `, (ketikan2) => {
            const sql = (`INSERT INTO Dosen (NIP, 'Nama Dosen') VALUES (?,?)`)
            db.run(sql, [ketikan, ketikan2], (err) => {
                if (err) return console.log('gagal ambil data', err);
                console.log(`Dosen telah ditambahkan`);
                console.log(`==============================================================================================`)
                menuDosen()
            })
        })
    })
}

function hapusDosen() {
    rl.question('Masukan Kode NIP Dosen : ', (ketikan) => {
        const sql = (`DELETE FROM Dosen WHERE NIP = ?`);
        db.run(sql, [ketikan], (err) => {
            if (err) return console.log('gagal ambil data', err);
            console.log(`Detail Dosen ${ketikan}, telah dihapus`);
            console.log(`==============================================================================================`);
            menuDosen()
        })
    })
}

function menuMatkul() {
    console.log('silahkan pilih opsi dibawah ini :');
    console.log('[1] Daftar Mata Kuliah');
    console.log('[2] Cari Mata Kuliah');
    console.log('[3] Tambah Mata Kuliah');
    console.log('[4] Hapus Mata Kuliah');
    console.log('[5] Kembali');
    console.log(`==============================================================================================`)
    rl.question('Masukan salah satu nomor dari opsi diatas : ', (ketikan) => {
        switch (ketikan) {
            case '1':
                daftarMatkul();
                break;
            case '2':
                cariMataKuiah()
                break;
            case '3':
                tambahMataKuliah()
                break;
            case '4':
                hapusMataKuliah()
                break;
            case '5':
                menuUtama()
                break;
        }
    })
}

function daftarMatkul() {
    db.all('SELECT * FROM Matkul', (err, rows) => {
        if (err) return console.log('gagal ambil data', err);
        var matkul = new Table({
            head: ['Kode Matkul', 'Nama Matkul', 'SKS']
            , colWidths: [15, 20, 5]
        });
        // table is an Array, so you can `push`, `unshift`, `splice` and friends
        rows.forEach((item, index) => {
            matkul.push(
                [item['Kode Matkul'], item['Nama Matkul'], item.SKS])
        })
        console.log(matkul.toString());
        console.log(`==============================================================================================`)
        menuMatkul()
    })
}

function cariMataKuiah() {
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
                menuMatkul()
            }
            else {
                console.log(`Mata Kuliah dengan Kode ${ketikan} tidak terdaftar`);
                console.log(`==============================================================================================`);
                menuMatkul()
            }
        })
    })
}

function tambahMataKuliah() {
    console.log(`Lengkapi data di bawah ini :`);
    rl.question(`Kode Mata Kuliah : `, (ketikan) => {
        rl.question(`Nama Mata Kuliah : `, (ketikan2) => {
            rl.question(`SKS : `, (ketikan3) => {
                const sql = (`INSERT INTO Matkul ('Kode Matkul', 'Nama Matkul', SKS) VALUES (?,?,?)`)
                db.run(sql, [ketikan, ketikan2, ketikan3], (err) => {
                    if (err) return console.log('gagal ambil data', err);
                    console.log(`Dosen telah ditambahkan`);
                    console.log(`==============================================================================================`)
                    menuMatkul()
                })
            })
        })
    })
}

function hapusMataKuliah() {
    rl.question('Masukan Kode Mata Kuliah : ', (ketikan) => {
        const sql = (`DELETE FROM Matkul WHERE "Kode Matkul" = ?`);
        db.run(sql, [ketikan], (err) => {
            if (err) return console.log('gagal ambil data', err);
            console.log(`Data Mata Kuliah ${ketikan}, telah dihapus`);
            console.log(`==============================================================================================`);
            menuMatkul()
        })
    })
}

function menuKontrak() {
    console.log('silahkan pilih opsi dibawah ini :');
    console.log('[1] Daftar Kontrak');
    console.log('[2] Cari Kontrak');
    console.log('[3] Tambah Kontrak');
    console.log('[4] Hapus Kontrak');
    console.log('[5] Update Nilai');
    console.log('[6] Kembali');
    console.log(`==============================================================================================`)
    rl.question('Masukan salah satu nomor dari opsi diatas : ', (ketikan) => {
        switch (ketikan) {
            case '1':
                daftarKontrak();
                break;
            case '2':
                // daftarKontrak2()
                cariKontrak()
                break;
            case '3':
                tambahKontrak()
                break;
            case '4':
                hapusKontrak()
                break;
            case '5':
                updateKontrak()
                break;
            case '6':
                menuUtama()
                break;
        }
    })
}

function daftarKontrak() {
    db.all('SELECT * FROM Kontrak', (err, rows) => {
        if (err) return console.log('gagal ambil data', err);
        var kontrak = new Table({
            head: ['ID', 'NIM', 'Nama', 'Mata Kuliah', 'Dosen', 'Nilai']
            , colWidths: [5, 15, 15, 15, 15, 7]
        });
        rows.forEach((item, index) => {
            kontrak.push(
                [item.ID, item.NIM, item.Nama, item['Mata Kuliah'], item.Dosen, item.Nilai])
        })
        console.log(kontrak.toString());
        console.log(`==============================================================================================`)
        menuKontrak()
    })
}

function cariKontrak() {
    rl.question('Masukan NIM Mahasiswa : ', (ketikan) => {
        console.log(`==============================================================================================`);
        const sql = (`SELECT * FROM Kontrak WHERE NIM = ?`)
        db.get(sql, [ketikan], (err, row) => {
            if (err) return console.log('gagal ambil data', err);
            if (row) {
                console.log(`==============================================================================================`);
                console.log(`
                    Daftar Kontrak Mahasiswa dengan NIM ${ketikan} adalah:
                    Kode Jurusan  : ${row['Kode Jurusan']}
                    Nama Jurusan  : ${row['Nama Jurusan']}
                    `);
                console.log(`==============================================================================================`);
                menuKontrak()
            }
            else {
                console.log(`Mahasiswa dengan NIM ${ketikan} tidak terdaftar`);
                console.log(`==============================================================================================`);
                menuKontrak()
            }
        })
    })
}

function tambahKontrak() {
    console.log(`Lengkapi data di bawah ini :`);
    rl.question(`Masukan NIM : `, (ketikan) => {
        rl.question(`Masukan Kode Mata Kuliah : `, (ketikan2) => {
            rl.question(`Masukan NIP Dosen : `, (ketikan3) => {
                const sql = (`INSERT INTO Kontrak (NIM, Nama, 'Mata Kuliah', Dosen) VALUES (?,?,?,?)`)
                db.run(sql, [ketikan, ketikan2, ketikan3], (err) => {
                    if (err) return console.log('gagal ambil data', err);
                    console.log(`Kontrak telah ditambahkan`);
                    console.log(`==============================================================================================`)
                    menuMatkul()
                })
            })
        })
    })
}

function hapusKontrak() {
    rl.question('Masukan ID Kontrak : ', (ketikan) => {
        const sql = (`DELETE FROM Kontrak WHERE ID = ?`);
        db.run(sql, [ketikan], (err) => {
            if (err) return console.log('gagal ambil data', err);
            console.log(`Data Kontrak dengan ID ${ketikan}, telah dihapus`);
            console.log(`==============================================================================================`);
            menuKontrak()
        })
    })
}