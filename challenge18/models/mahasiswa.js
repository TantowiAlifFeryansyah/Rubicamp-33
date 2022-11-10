import { db } from "../challenge18.js";

export default class ModelMahasiswa {
    static daftarMahasiswa(callback) {
        db.all(`SELECT Mahasiswa.*, Jurusan.'Nama Jurusan' FROM Mahasiswa JOIN Jurusan ON Mahasiswa.'Kode Jurusan' = Jurusan.'Kode Jurusan'`, (err, rows) => {
            if (err) return console.log('gagal ambil data', err);
            callback(err)
        })
    }

    static cariMahasiswa(ketikan, callback) {
        rl.question('Masukan NIM Mahasiswa : ', (ketikan) => {
            const sql = (`SELECT Mahasiswa.*, Jurusan.'Nama Jurusan' FROM Mahasiswa JOIN Jurusan ON Mahasiswa.'Kode Jurusan' = Jurusan.'Kode Jurusan' WHERE NIM = ?`)
            db.get(sql, [ketikan], (err, row) => {
                callback(err, row)
            })
        })
    }

    static tambahMahasiswa(ketikan, ketikan2, ketikan3, ketikan4, ketikan5, callback) {
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
                                            callback(err, rows)
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

    static hapusMahasiswa(ketikan, callback) {
        rl.question('Masukan NIM Mahasiswa : ', (ketikan) => {
            const sql = (`DELETE FROM Mahasiswa WHERE NIM = ?`);
            db.run(sql, [ketikan], (err) => {
                callback(err)
            })
        })
    }
}