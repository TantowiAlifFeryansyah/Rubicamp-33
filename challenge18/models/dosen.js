import { db } from "../challenge18.js";

export default class ModelDosen {
    static daftarDosen(callback) {
        db.all('SELECT * FROM Dosen', (err, rows) => {
            if (err) return console.log('gagal ambil data', err);
            callback(err, rows)
        })
    }

    static cariDosen(ketikan, callback) {
        rl.question('Masukan NIP Dosen : ', (ketikan) => {
            const sql = (`SELECT * FROM Dosen WHERE NIP = ?`)
            db.get(sql, [ketikan], (err, row) => {
                callback(err, row)
            })
        })
    }

    static tambahDosen(ketikan1, ketikan2, callback) {
        console.log(`Lengkapi data di bawah ini :`);
        rl.question(`Masukan NIP : `, (ketikan) => {
            rl.question(`Nama Dosen : `, (ketikan2) => {
                const sql = (`INSERT INTO Dosen (NIP, 'Nama Dosen') VALUES (?,?)`)
                db.run(sql, [ketikan, ketikan2], (err) => {
                    callback(err)
                })
            })
        })
    }

    static hapusDosen(kerikan, callback) {
        rl.question('Masukan Kode NIP Dosen : ', (ketikan) => {
            const sql = (`DELETE FROM Dosen WHERE NIP = ?`);
            db.run(sql, [ketikan], (err) => {
                callback(err)
            })
        })
    }
}